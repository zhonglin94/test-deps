import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MockModule } from 'ng-mocks';
import { ToolBarItemLinkDialogComponent } from './tool-bar-item-link-dialog.component';


describe('QuillToolBarItemLinkDialogComponent', () => {
	let component: ToolBarItemLinkDialogComponent;
	let fixture: ComponentFixture<ToolBarItemLinkDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MockModule(MatButtonModule),
				MockModule(MatIconModule),
				MockModule(MatDialogModule),
				MockModule(MatFormFieldModule),
				ReactiveFormsModule
			],
			declarations: [ToolBarItemLinkDialogComponent],
			providers: [
				{
					provide: MAT_DIALOG_DATA,
					useValue: {
						link: 'https://xxx.com'
					}
				},
				{
					provide: MatDialogRef,
					useValue: {
						close: jasmine.createSpy()
					}
				}
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ToolBarItemLinkDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
