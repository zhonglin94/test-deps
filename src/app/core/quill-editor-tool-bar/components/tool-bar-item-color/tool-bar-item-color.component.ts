import { AfterViewInit, Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { RGBA } from '@sdo/web-components/color-picker';
import { ColorPickerPopupComponent } from '@sdo/web-components/color-picker/color-picker-popup/color-picker-popup.component';
import { ColorUtils } from '../../../../utils/color.utils';
import { QuillEditorToolBarService } from '../../quill-editor-tool-bar.service';
import { ToolbarItemSelect } from '../toolbar-item-base';

@Component({
	selector: 'lpc-quill-tool-bar-item-color',
	templateUrl: './tool-bar-item-color.component.html',
	styleUrls: ['./tool-bar-item-color.component.scss', '../tool-bar-item-share.style.scss']
})
export class ToolBarItemColorComponent extends ToolbarItemSelect implements OnChanges, AfterViewInit {
	private colorPickerBlocking: boolean = false; //cutting down the event chain circle of color picker
	@ViewChild('colorPicker') picker: ColorPickerPopupComponent;
	colors: RGBA[];

	constructor(private toolbarService: QuillEditorToolBarService, private elRef: ElementRef) {
		super(toolbarService);
	}

	ngOnChanges(changes: SimpleChanges) {
		this.colors = this.options.map<RGBA>(option => {
			return typeof (option) === 'string' ? ColorUtils.hexToRGBA(option) : undefined;
		});
	}

	ngAfterViewInit() {
		this.picker.colorPickerDialogComponent.showAlpha = false;
	}

	onColorPickerChange(value: RGBA | undefined) {
		if (this.colorPickerBlocking) {
			return;
		}
		if (value !== undefined) {
			const colorStr = ColorUtils.RGBAToHex(value);
			this.toolbarService.format(this.item.name, colorStr);
			this.setPathColor(colorStr);
		} else {
			this.toolbarService.format(this.item.name, false);
			this.setPathColor(undefined);
		}
	}

	protected onEditorSelectionChange(formats: { [keys: string]: any }) {
		super.onEditorSelectionChange(formats);
		const currentColor = formats[this.item.name];
		this.setPathColor(currentColor);
		this.setPickerColor(currentColor && ColorUtils.hexToRGBA(currentColor));
	}

	private setPickerColor(color: RGBA | undefined): void {
		this.colorPickerBlocking = true;
		this.picker.color = color;
		this.colorPickerBlocking = false;
	}

	private setPathColor(color: string | undefined): void {
		color = color ? color : this.defaultPathColor();
		this.elRef.nativeElement.querySelector('#fill-path')?.setAttribute('fill', color);
	}

	private defaultPathColor(): string {
		return {
			color: 'var(--sdo-theme-foreground-text)'
		}[this.item.name];
	}
}