import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { QuillEditorToolBarService } from '../../quill-editor-tool-bar.service';
import { ToolbarItemSelect } from '../toolbar-item-base';

@Component({
	selector: 'lpc-quill-tool-bar-item-select',
	templateUrl: './tool-bar-item-select.component.html',
	styleUrls: ['./tool-bar-item-select.component.scss', '../tool-bar-item-share.style.scss']
})
export class ToolBarItemSelectComponent extends ToolbarItemSelect {
	formControl: FormControl<string | false>;

	constructor(private cb: FormBuilder, private toolbarService: QuillEditorToolBarService) {
		super(toolbarService);
		this.formControl = this.cb.control<string | false>(false);
	}

	protected onEditorSelectionChange(formats: { [keys: string]: any }) {
		super.onEditorSelectionChange(formats);
		const val = formats[this.item.name];
		this.setValue(val ?? false);
	}

	private setValue(val: any): void {
		this.formControl.setValue(val, { emitEvent: false });
	}
}