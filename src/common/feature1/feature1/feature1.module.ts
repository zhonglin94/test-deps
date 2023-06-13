import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature1Component } from './feature1.component';


@NgModule({
	declarations: [
		Feature1Component
	],
	imports: [
		CommonModule
	],
	exports: [Feature1Component]
})
export class Feature1Module {
}
