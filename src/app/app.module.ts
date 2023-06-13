import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { Feature1Module } from '../common/public-api';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		MatButtonModule,
		Feature1Module
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
