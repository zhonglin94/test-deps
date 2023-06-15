import { Component, OnInit } from '@angular/core';
import Quill from 'quill';

@Component({
	selector: 'app-feature2',
	templateUrl: './feature2.component.html',
	styleUrls: ['./feature2.component.css']
})
export class Feature2Component implements OnInit {
	constructor() {
	}

	ngOnInit(): void {
		const node = getSelection().focusNode.parentNode;
		const linkBlot = Quill.find(node);
	}

}
