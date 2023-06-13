import { ToolBarItemType } from './quill-editor-tool-bar.type';

export class QuillEditorToolBarItemModel {

	type: ToolBarItemType;
	name: string;
	value: unknown;
	formatter: (val: any) => string = val => `${val}`;

	title(): string {
		if (typeof (this.value) === 'string') {
			return this.name + ' ' + this.value;
		} else {
			return this.name;
		}
	}

	constructor(config: string | object) {
		this.parseConfig(config);
	}

	setFormatter(fn: (val: any) => string): void {
		this.formatter = fn;
	}

	private parseConfig(config: string | object): void {
		if (typeof (config) === 'string') {
			this.setButtonItem(config);
		} else {
			this.parseObjectConfig(config);
		}
	}

	private parseObjectConfig(config: object): void {
		Object.entries(config).forEach(([key, val]) => {
			if (typeof (val) === 'object') {
				switch (key) {
					case 'color':
					case 'background':
						this.setColorItem(key, val);
						break;
					case 'align':
						this.setAlignItem(key, val);
						break;
					default:
						this.setSelectItem(key, val);
				}
			} else {
				this.setButtonItem(key, val);
			}
		});
	}

	private setButtonItem(name: string, val: any = undefined): void {
		this.name = name;
		this.value = val;
		this.type = ToolBarItemType.button;
	}

	private setAlignItem(name: string, val: string[] = []): void {
		this.name = name;
		if (val && val.length) {
			this.value = val;
		} else {
			this.value = [false, 'center', 'right', 'justify'];
		}
		this.type = ToolBarItemType.picker;
	}

	private setColorItem(name: string, val: string[] = []): void {
		this.name = name;
		this.value = val;
		this.type = ToolBarItemType.color;
	}

	private setSelectItem(name: string, val: (string | boolean)[] = []): void {
		this.name = name;
		if (!val.includes(false)) {
			this.value = [false, ...val];
		} else {
			this.value = val;
		}
		this.type = ToolBarItemType.select;
		this.setDefaultFormatter(name);
	}

	private setDefaultFormatter(name: string): void {
		switch (name) {
			case 'header':
				this.setFormatter(val => val === false ? 'Normal' : `Heading ${val}`);
				break;
			case 'size':
				this.setFormatter(val => val === false ? 'Normal' : `${parseInt(val)}`);
				break;
		}
	}
}