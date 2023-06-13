import { QuillEditorToolBarItemModel } from './quill-editor-tool-bar-item.model';
import { ToolBarItemType } from './quill-editor-tool-bar.type';

describe('QuillEditorToolBarItemModel', () => {
	it('should be able to parse to button item', () => {
		let buttonItem = new QuillEditorToolBarItemModel('bold');
		expect(buttonItem.name).toEqual('bold');
		expect(buttonItem.type).toEqual(ToolBarItemType.button);
		expect(buttonItem.value).toEqual(undefined);

		buttonItem = new QuillEditorToolBarItemModel({ 'list': 'bullet' });
		expect(buttonItem.name).toEqual('list');
		expect(buttonItem.type).toEqual(ToolBarItemType.button);
		expect(buttonItem.value).toEqual('bullet');
	});

	it('should be able to parse to select item', () => {
		let selectItem = new QuillEditorToolBarItemModel({ header: [1, 2, 3] });
		expect(selectItem.name).toEqual('header');
		expect(selectItem.type).toEqual(ToolBarItemType.select);
		expect(selectItem.value).toEqual([false, 1, 2, 3]);
	});

	it('should be able to parse to color picker item', () => {
		let selectItem = new QuillEditorToolBarItemModel({ color: ['red', 'blue'] });
		expect(selectItem.name).toEqual('color');
		expect(selectItem.type).toEqual(ToolBarItemType.color);
		expect(selectItem.value).toEqual(['red', 'blue']);
	});

	it('should be able to parse to picke item', () => {
		let pickerItem = new QuillEditorToolBarItemModel({ 'align': [] });
		expect(pickerItem.name).toEqual('align');
		expect(pickerItem.type).toEqual(ToolBarItemType.picker);
		expect(pickerItem.value).toEqual([false, 'center', 'right', 'justify']);
	});
});