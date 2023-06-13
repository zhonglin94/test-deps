import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Range } from 'quill/core/selection';
import { QuillEditorToolBarService } from '../../quill-editor-tool-bar.service';
import { ToolbarItemBase } from '../toolbar-item-base';
import { ToolBarItemLinkDialogComponent } from './tool-bar-item-link-dialog.component';
import { ToolbarItemLinkResult } from './tool-bar-item-link.type';

@Component({
	selector: 'lpc-quill-tool-bar-item-link',
	templateUrl: './tool-bar-item-link.component.html',
	styleUrls: ['../tool-bar-item-share.style.scss']
})
export class ToolBarItemLinkComponent extends ToolbarItemBase {
	isActive: boolean = false;

	linkRange: Range;

	constructor(private dialog: MatDialog, private toolbarService: QuillEditorToolBarService) {
		super();
		toolbarService.quillSelectionChange$.subscribe(({ formats, change }) => {
			const isActive = formats['link'] !== undefined;
			this.setActive(isActive);
			this.linkRange = isActive ? toolbarService.getLinkRange(change.range) : undefined;
		});
	}

	onBtnClick() {
		const selection: Range = this.toolbarService.getSelection();
		const link = this.toolbarService.getFormat()['link'];

		const dialogRef = this.dialog.open<ToolBarItemLinkDialogComponent, any, ToolbarItemLinkResult>(ToolBarItemLinkDialogComponent,
			{
				hasBackdrop: true,
				width: '400px',
				data: { link }
			}
		);

		dialogRef.afterClosed()
			.subscribe((result) => {
				this.applyLink(result, selection);
			});
	}

	private applyLink(result: ToolbarItemLinkResult, selection: Range): void {
		this.toolbarService.focus();
		this.toolbarService.setSelection(selection);
		if (result && result.isSaving) {
			if (this.linkRange) {
				this.toolbarService.formatText(this.linkRange.index, this.linkRange.length, { link: result.link });
			} else {
				this.toolbarService.format('link', result.link);
			}
			this.setActive(result.link !== undefined);
		}
	}

	private setActive(active: boolean): void {
		this.isActive = active;
	}
}