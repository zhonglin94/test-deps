import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { QuillToolbarConfig } from 'ngx-quill/config/quill-editor.interfaces';
import { QuillEditorToolBarItemModel } from './quill-editor-tool-bar-item.model';
import { QuillEditorToolBarService } from './quill-editor-tool-bar.service';
import { ToolBarItemType } from './quill-editor-tool-bar.type';

@Component({
	selector: 'lpc-quill-editor-tool-bar',
	templateUrl: './quill-editor-tool-bar.component.html',
	styleUrls: ['./quill-editor-tool-bar.component.scss'],
	providers: [
		QuillEditorToolBarService
	]
})

export class QuillEditorToolBarComponent implements OnInit, OnDestroy {
	ToolBarItemType = ToolBarItemType;
	@Input() toolBarConfig: QuillToolbarConfig;

	groups: Array<Array<QuillEditorToolBarItemModel>> = [];

	constructor(@Inject(QuillEditorComponent) private quillEditorComponent: QuillEditorComponent, private toolbarService: QuillEditorToolBarService) {
	}

	ngOnInit() {
		if (this.quillEditorComponent === undefined || !(this.quillEditorComponent instanceof QuillEditorComponent)) {
			return;
		}
		this.quillEditorComponent.onEditorCreated.subscribe(editor => {
			this.toolbarService.init(editor);
		});
		this.parseConfigs();
	}

	parseConfigs(): void {
		this.groups = this.toolBarConfig.map(group => group.map(item => new QuillEditorToolBarItemModel(item)));
	}

	ngOnDestroy() {
		this.toolbarService.dispose();
	}
}