import { Directive, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuillEditorToolBarItemModel } from '../quill-editor-tool-bar-item.model';
import { QuillEditorToolBarService } from '../quill-editor-tool-bar.service';

@Directive()
export class ToolbarItemBase {
	@Input() item: QuillEditorToolBarItemModel;
}

@Directive()
export class ToolbarItemSelect implements OnDestroy {
	@Input() item: QuillEditorToolBarItemModel;
	@ViewChild('qlSelect') select: ElementRef<HTMLSelectElement>;
	private editorSelectionSub: Subscription;

	constructor(toolbarService: QuillEditorToolBarService) {
		this.editorSelectionSub = toolbarService.quillSelectionChange$.subscribe(change => {
			this.onEditorSelectionChange(change.formats);
		});
	}

	get options(): (string | boolean)[] {
		return this.item?.value as (string | boolean)[] ?? [];
	}

	onSelectionChange(value: any): void {
		this.select.nativeElement.selectedIndex = this.options.indexOf(value);
		this.select.nativeElement.dispatchEvent(new Event('change'));
	}

	protected onEditorSelectionChange(formats: { [keys: string]: any }): void {
	}

	ngOnDestroy() {
		this.editorSelectionSub.unsubscribe();
	}
}