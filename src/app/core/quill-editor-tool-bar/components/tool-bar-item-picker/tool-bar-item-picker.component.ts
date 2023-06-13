import { Component } from '@angular/core';
import { QuillEditorToolBarService } from '../../quill-editor-tool-bar.service';
import { ToolbarItemSelect } from '../toolbar-item-base';

@Component({
	selector: 'lpc-quill-tool-bar-item-picker',
	templateUrl: './tool-bar-item-picker.component.html',
	styleUrls: ['../tool-bar-item-share.style.scss', './tool-bar-item-picker.component.scss']
})
export class ToolBarItemPickerComponent extends ToolbarItemSelect {
	isActive: boolean = false;
	currentValue: string | boolean;

	constructor(private toolbarService: QuillEditorToolBarService) {
		super(toolbarService);
	}

	onSelectionChange(value: string | boolean) {
		super.onSelectionChange(value);
		this.setCurrent(value);
		this.setActive(value !== false);
	}

	private setActive(isActive: boolean): void {
		this.isActive = isActive;
	}

	private setCurrent(val: boolean | string): void {
		this.currentValue = val;
	}

	protected onEditorSelectionChange(formats: { [keys: string]: any }) {
		super.onEditorSelectionChange(formats);
		const current = formats[this.item.name];
		this.setActive(current !== undefined);
		this.setCurrent(current);
	}
}