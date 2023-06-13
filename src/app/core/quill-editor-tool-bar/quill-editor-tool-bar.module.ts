import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ColorPickerModule } from '@sdo/web-components/color-picker';
import { ToolBarItemButtonComponent } from './components/tool-bar-item-button/tool-bar-item-button.component';
import { ToolBarItemColorComponent } from './components/tool-bar-item-color/tool-bar-item-color.component';
import { ToolBarItemLinkComponent } from './components/tool-bar-item-link/tool-bar-item-link.component';
import { ToolBarItemLinkDialogComponent } from './components/tool-bar-item-link/tool-bar-item-link-dialog.component';
import { ToolBarItemPickerComponent } from './components/tool-bar-item-picker/tool-bar-item-picker.component';
import { ToolBarItemSelectComponent } from './components/tool-bar-item-select/tool-bar-item-select.component';
import { QuillEditorToolBarComponent } from './quill-editor-tool-bar.component';

@NgModule({
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatIconModule,
		MatSelectModule,
		MatButtonModule,
		MatInputModule,
		MatMenuModule,
		ColorPickerModule,
		ReactiveFormsModule,
		MatDialogModule
	],
	declarations: [
		QuillEditorToolBarComponent,
		ToolBarItemButtonComponent,
		ToolBarItemSelectComponent,
		ToolBarItemPickerComponent,
		ToolBarItemColorComponent,
		ToolBarItemLinkComponent,
		ToolBarItemLinkDialogComponent
	],
	exports: [
		QuillEditorToolBarComponent
	]
})
export class QuillEditorToolBarModule {}