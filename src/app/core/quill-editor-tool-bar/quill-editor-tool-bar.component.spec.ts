import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { QuillEditorComponent } from 'ngx-quill';

import { QuillEditorToolBarComponent } from './quill-editor-tool-bar.component';
import { QuillEditorToolBarService } from './quill-editor-tool-bar.service';

describe('QuillEditorToolBarComponent', () => {
	let component: QuillEditorToolBarComponent;
	let fixture: ComponentFixture<QuillEditorToolBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [QuillEditorToolBarComponent],
			providers: [
				MockProvider(QuillEditorToolBarService, {
					quillEditor: {
						off: () => {
						}
					}
				}, 'useValue'),
				{
					provide: QuillEditorComponent,
					useValue: {
						onEditorCreated: new EventEmitter()
					}
				}
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(QuillEditorToolBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
