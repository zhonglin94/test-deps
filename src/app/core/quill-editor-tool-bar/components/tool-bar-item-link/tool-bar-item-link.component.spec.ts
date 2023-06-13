import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';
import { QuillEditorToolBarService } from '../../quill-editor-tool-bar.service';

import { ToolBarItemLinkComponent } from './tool-bar-item-link.component';

describe('QuillToolBarItemLinkComponent', () => {
	let component: ToolBarItemLinkComponent;
	let fixture: ComponentFixture<ToolBarItemLinkComponent>;
	const formatSpy = jasmine.createSpy();
	const formatTextSpy = jasmine.createSpy();


	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MockModule(MatButtonModule),
				MockModule(MatIconModule),
				MockModule(MatDialogModule)
			],
			declarations: [ToolBarItemLinkComponent],
			providers: [
				{
					provide: QuillEditorToolBarService,
					useValue: {
						quillSelectionChange$: of({}),
						focus() {
						},
						format: formatSpy,
						formatText: formatTextSpy,
						setSelection() {
						}
					}
				}
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ToolBarItemLinkComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should apply dialog form result', () => {
		const mockResult = { link: '', isSaving: true };
		const mockSelection = { index: 100, length: 10 };
		component['applyLink'](mockResult, mockSelection);
		expect(formatSpy).toHaveBeenCalled();
		component.linkRange = mockSelection;
		component['applyLink'](mockResult, mockSelection);
		expect(formatTextSpy).toHaveBeenCalled();
	});
});
