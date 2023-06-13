import { TitleCasePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';
import { QuillEditorToolBarItemModel } from '../../quill-editor-tool-bar-item.model';
import { QuillEditorToolBarService } from '../../quill-editor-tool-bar.service';

import { ToolBarItemPickerComponent } from './tool-bar-item-picker.component';

describe('QuillToolBarItemPickerComponent', () => {
	let component: ToolBarItemPickerComponent;
	let fixture: ComponentFixture<ToolBarItemPickerComponent>;
	const mockService = {
		quillSelectionChange$: of()
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MockModule(MatButtonModule),
				MockModule(MatIconModule),
				MockModule(MatMenuModule)
			],
			declarations: [ToolBarItemPickerComponent],
			providers: [
				{
					provide: QuillEditorToolBarService,
					useValue: mockService
				}
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ToolBarItemPickerComponent);
		component = fixture.componentInstance;
		component.item = new QuillEditorToolBarItemModel({ align: [] });
		component['setCurrent'] = jasmine.createSpy();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be a picker item', () => {
		const pipe = new TitleCasePipe();
		expect(fixture.debugElement.query(By.css('button')).nativeElement.title).toBe(pipe.transform(component.item.name));
	});

	it('should be able to set current', () => {
		component.onSelectionChange(undefined);
		expect(component['setCurrent']).toHaveBeenCalledWith(undefined);
		component.onSelectionChange('center');
		expect(component['setCurrent']).toHaveBeenCalledWith('center');
	});

	it('should be able to react editor selection', () => {
		component['onEditorSelectionChange']({ align: 'center' });
		expect(component['setCurrent']).toHaveBeenCalledWith('center');
		component['onEditorSelectionChange']({});
		expect(component['setCurrent']).toHaveBeenCalledWith(undefined);
	});
});
