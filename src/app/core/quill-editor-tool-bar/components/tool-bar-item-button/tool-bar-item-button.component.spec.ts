import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MockModule, MockProvider } from 'ng-mocks';
import { QuillEditorToolBarItemModel } from '../../quill-editor-tool-bar-item.model';
import { QuillEditorToolBarService } from '../../quill-editor-tool-bar.service';

import { ToolBarItemButtonComponent } from './tool-bar-item-button.component';

describe('QuillToolBarItemButtonComponent', () => {
	let component: ToolBarItemButtonComponent;
	let fixture: ComponentFixture<ToolBarItemButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MockModule(MatButtonModule), MockModule(MatIconModule)],
			declarations: [ToolBarItemButtonComponent],
			providers: [
				MockProvider(QuillEditorToolBarService)
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ToolBarItemButtonComponent);
		component = fixture.componentInstance;
		component.item = new QuillEditorToolBarItemModel('bold');
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be a button item', () => {
		expect(fixture.debugElement.query(By.css('button')).nativeElement.classList).toContain('ql-' + component.item.name);
	});
});
