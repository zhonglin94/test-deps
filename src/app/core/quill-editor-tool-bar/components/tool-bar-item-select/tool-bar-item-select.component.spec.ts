import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';
import { QuillEditorToolBarItemModel } from '../../quill-editor-tool-bar-item.model';
import { QuillEditorToolBarService } from '../../quill-editor-tool-bar.service';

import { ToolBarItemSelectComponent } from './tool-bar-item-select.component';

describe('QuillToolBarItemSelectComponent', () => {
	let component: ToolBarItemSelectComponent;
	let fixture: ComponentFixture<ToolBarItemSelectComponent>;
	const mockService = {
		quillSelectionChange$: of()
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MockModule(MatFormFieldModule),
				MockModule(MatInputModule),
				MockModule(MatSelectModule),
				MockModule(ReactiveFormsModule)
			],
			declarations: [ToolBarItemSelectComponent],
			providers: [
				{
					provide: QuillEditorToolBarService,
					useValue: mockService
				},
				FormBuilder
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ToolBarItemSelectComponent);
		component = fixture.componentInstance;
		component.item = new QuillEditorToolBarItemModel({ header: [false, 1, 2, 3, 4] });
		component['setValue'] = jasmine.createSpy();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be a select item', () => {
		expect(fixture.debugElement.query(By.css('mat-select')).nativeElement.classList).toContain('ql-' + component.item.name);
	});

	it('should be able to select', () => {
		component.onSelectionChange(undefined);
		expect(component.select.nativeElement.selectedIndex).toBe(-1);
		component.onSelectionChange(2);
		expect(component.select.nativeElement.selectedIndex).toBe(2);
	});

	it('should be able to react editor selection', () => {
		component['onEditorSelectionChange']({ header: '2' });
		expect(component['setValue']).toHaveBeenCalledWith('2');
		component['onEditorSelectionChange']({});
		expect(component['setValue']).toHaveBeenCalledWith(false);
	});
});
