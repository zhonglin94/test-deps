import { Component, OnInit } from '@angular/core';
import { camelizeKeys, pascalizeKeys } from 'humps';
import { cloneDeep } from 'lodash';

@Component({
	selector: 'app-feature2',
	templateUrl: './feature2.component.html',
	styleUrls: ['./feature2.component.css']
})
export class Feature2Component implements OnInit {
	constructor() {
	}

	ngOnInit(): void {
		camelizeKeys();
		pascalizeKeys();
		cloneDeep();
	}

}
