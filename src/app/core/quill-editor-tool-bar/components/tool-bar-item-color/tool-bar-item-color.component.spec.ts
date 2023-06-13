import { TitleCasePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { ColorPickerModule, ColorPickerPopupComponent } from '@sdo/web-components/color-picker';
import { MockModule } from 'ng-mocks';
import { of } from 'rxjs';
import { ColorUtils } from '../../../../utils/color.utils';
import { QuillEditorToolBarItemModel } from '../../quill-editor-tool-bar-item.model';
import { QuillEditorToolBarService } from '../../quill-editor-tool-bar.service';

import { ToolBarItemColorComponent } from './tool-bar-item-color.component';

describe('QuillToolBarItemColorComponent', () => {
	let component: ToolBarItemColorComponent;
	let fixture: ComponentFixture<ToolBarItemColorComponent>;
	const mockService = {
		quillSelectionChange$: of(),
		format: jasmine.createSpy()
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MockModule(MatButtonModule),
				MockModule(MatIconModule),
				ColorPickerModule
			],
			declarations: [ToolBarItemColorComponent, ColorPickerPopupComponent],
			providers: [
				{
					provide: QuillEditorToolBarService,
					useValue: mockService
				}
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ToolBarItemColorComponent);
		component = fixture.componentInstance;
		component.item = new QuillEditorToolBarItemModel({ color: [] });
		component['setPickerColor'] = jasmine.createSpy();
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be a color picker item', () => {
		const pipe = new TitleCasePipe();
		expect(fixture.debugElement.query(By.css('button')).nativeElement.title).toBe(pipe.transform(component.item.name));
	});

	it('should be able to set color', () => {
		component.onColorPickerChange(undefined);
		expect(mockService.format).toHaveBeenCalledWith(component.item.name, false);
		const color = '#FFFFFF';
		component.onColorPickerChange(ColorUtils.hexToRGBA(color));
		expect(mockService.format).toHaveBeenCalledWith(component.item.name, color);
	});

	it('should be able to react editor selection', () => {
		component['onEditorSelectionChange']({ color: '#FFFFFF' });
		expect(component['setPickerColor']).toHaveBeenCalledWith(ColorUtils.hexToRGBA('#FFFFFF'));
		component['onEditorSelectionChange']({});
		expect(component['setPickerColor']).toHaveBeenCalledWith(undefined);
	});
});
