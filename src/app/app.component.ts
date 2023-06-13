import { Component } from '@angular/core';
import { ApiEndpointsService } from '@sdo/liveproduct-view-common';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'test-deps';

	constructor(private ApiEnd: ApiEndpointsService) {
	}
}
