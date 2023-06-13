import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToolbarItemLinkResult } from './tool-bar-item-link.type';

@Component({
	selector: 'lpc-tool-bar-item-link-dialog',
	templateUrl: './tool-bar-item-link-dialog.component.html',
	styleUrls: ['./tool-bar-item-link-dialog.component.scss']
})
export class ToolBarItemLinkDialogComponent {
	formControl: FormControl<string>;

	constructor(private cb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: { link: string }, private dialogRef: MatDialogRef<ToolBarItemLinkDialogComponent, ToolbarItemLinkResult>) {
		this.formControl = this.cb.control<string>(data.link);
	}

	onCancelClick(): void {
		this.dialogRef.close();
	}

	onSaveClick(): void {
		this.dialogRef.close({ link: this.formControl.value, isSaving: true });
	}

	onClear(): void {
		this.formControl.setValue(undefined);
	}
}