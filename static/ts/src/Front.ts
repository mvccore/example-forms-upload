class Front extends Module {
	protected form: HTMLFormElement;
	protected uploadedFilesCont: HTMLDivElement;
	protected filesInput: HTMLInputElement;
	protected encodedFiles: IEncodedFile[] = [];
	protected encodedFilesCount: number = 0;
	public constructor () {
		super();
		this.initTestSubmit();
	}
	protected initTestSubmit (): this {
		this.form = document.getElementById('ajax_upload') as HTMLFormElement;
		this.form.addEventListener('submit', this.handleFormSubmit.bind(this), true);
		this.filesInput = this.form['files[]'] as HTMLInputElement;
		this.uploadedFilesCont = document.getElementById('uploaded_files') as HTMLDivElement;
		return this;
	}
	protected handleFormSubmit (e: SubmitEvent): void {
		//this.execRequest();
		var file: File,
			reader: FileReader;
		this.encodedFiles = [];
		this.encodedFilesCount = 0;
		for (var i = 0, l = this.filesInput.files.length; i < l; i++) {
			file = this.filesInput.files.item(i);
			this.encodedFiles[i] = <IEncodedFile>{
				filename: file.name,
				type: file.type
			};
			reader = new FileReader();
			reader.addEventListener('load', this.handleFileReaderLoaded.bind(this, i, reader), false);
			reader.readAsDataURL(file);
		}
		e.preventDefault();
	}
	protected handleFileReaderLoaded (index: number, reader: FileReader): void {
		this.encodedFiles[index].content = reader.result.toString();
		this.encodedFilesCount++;
		if (this.encodedFilesCount === this.filesInput.files.length) {
			this.execRequest();
		}
	}
	protected execRequest (): void {
		Ajax.load(<Ajax.LoadConfig>{
			url: this.form.action,
			method: this.form.method,
			headers: {
				'Content-Type': 'application/json'
			},
			//data: JSON.stringify({files: window.testImages}),
			data: JSON.stringify({files: this.encodedFiles}),
			type: 'json',
			success: this.handleSuccessResponse.bind(this)
		});
	}
	protected handleSuccessResponse (response: IResponse): void {
		if (response.result) {
			var code: string[] = [],
				date: Date,
				formatedDate: string;
			for (var file of response.values) {
				date = new Date();
				date.setTime(file.time * 1000);
				formatedDate = date.toJSON().replace(/^([^T]+)T([^\.]+)\.000Z/g,'$1 $2')
				code.push.apply(code, [
					`<div>`,
						`<b>${file.name}</b><br />`,
						`<i>Modified: ${formatedDate})</i><br />`,
						`<img src="${file.url}" />`,
					`</div>`,
				]);
			}
			this.uploadedFilesCont.innerHTML = code.join('');
		} else {
			console.log(response.errors);
		}
	}
}

// run all declared javascripts after <body>, after all elements are declared
Front.GetInstance();
