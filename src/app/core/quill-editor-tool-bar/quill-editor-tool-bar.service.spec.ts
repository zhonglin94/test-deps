import { TestBed } from '@angular/core/testing';
import { QuillEditorToolBarService } from './quill-editor-tool-bar.service';

describe('QuillEditorToolBarService', () => {
	let service: QuillEditorToolBarService;
	let editor: any;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [QuillEditorToolBarService]
		});
		service = TestBed.inject(QuillEditorToolBarService);
		editor = {
			on() {
			}
		};
		service.init(editor);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return undefined when selection length is more than 0', () => {
		expect(service.getLinkRange({ index: 100, length: 20 })).toEqual(undefined);
	});
});