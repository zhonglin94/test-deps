import { SelectionChange } from 'ngx-quill/lib/quill-editor.component';
import QuillType from 'quill';
import { Range } from 'quill/core/selection';
import { Observable, Subject } from 'rxjs';

type EditorSelectionChange = {
	change: SelectionChange,
	formats: { [keys: string]: any }
}

export class QuillEditorToolBarService {
	private quillEditor: QuillType;

	private _quillSelectionChange$$ = new Subject<EditorSelectionChange>();

	get quillSelectionChange$(): Observable<EditorSelectionChange> {
		return this._quillSelectionChange$$.asObservable();
	}

	init(editor: any): void {
		this.quillEditor = editor;

		this.quillEditor.on('selection-change', (range: Range, oldRange: Range, source: string) => {
			if (source === 'user') {
				this._quillSelectionChange$$.next({ change: { range, oldRange, source, editor }, formats: this.getFormat() });
			}
		});
	}

	format(name: string, value: any): void {
		this.quillEditor.format(name, value, 'user');
	}

	formatText(index: number, length: number, formats: { [keys: string]: any }): void {
		this.quillEditor.formatText(index, length, formats, 'user');
	}

	getFormat(): { [keys: string]: any } {
		const hasFocus = this.quillEditor.hasFocus();
		const format = this.quillEditor.getFormat();
		if (hasFocus === false) {
			this.quillEditor.blur();
		}
		return format;
	}

	getSelection(): Range {
		return this.quillEditor.getSelection();
	}

	setSelection(selection: Range): void {
		this.quillEditor.setSelection(selection);
	}

	focus(): void {
		this.quillEditor.focus();
	}

	dispose(): void {
		this.quillEditor?.off('selection-change');
		this._quillSelectionChange$$.complete();
	}

	getLinkRange(range: Range): Range | undefined {
		if (range && range.length !== 0) {
			return;
		}
		const node = getSelection().focusNode.parentNode;
		const linkBlot = QuillType.find(node);
		if (linkBlot) {
			const index = this.quillEditor.getIndex(linkBlot);
			return new Range(index, linkBlot.length());
		}
	}
}