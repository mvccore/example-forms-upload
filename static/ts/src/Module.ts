class Module {
	private static _instance: Module;
	public Static: typeof Module;
	private _errorFingerPrints: Map<string, string>;
	public static GetInstance (): Module {
		if (this._instance == null)
			this._instance = new this();
		return this._instance;
	}
	protected constructor () {
		this.Static = new.target;
		this.Static._instance = this;
		this._initErrorLogging();
	}
	private _initErrorLogging (): this {
		this._errorFingerPrints = new Map<string, string>();
		var envMeta = document.head.querySelector('meta[name=environment]') as HTMLMetaElement;
		if (envMeta.content === 'dev') 
			return this;
		window.onerror = (message: string | Event, file?: string, line?: number, col?: number, error?: Error) => {
			var errorFingerPrint = this.convertStringToHexadecimalValue(file) + '_' + String(line);
			if (this._errorFingerPrints.has(errorFingerPrint)) {
				return false;
			} else {
				this._errorFingerPrints.set(errorFingerPrint, String(message));
				var data = {
					message: this.convertStringToHexadecimalValue(String(message)),
					uri: this.convertStringToHexadecimalValue(location.href),
					file: this.convertStringToHexadecimalValue(file),
					line: line,
					column: col,
					callstack: error.stack ? this.convertStringToHexadecimalValue(error.stack) : '',
					browser: this.convertStringToHexadecimalValue(navigator.userAgent),
					platform: navigator.platform
				};
				Ajax.load({
					url: '?controller=system&action=js-errors-log',
					method: 'post',
					data: data
				});
				return true;
			}
		};
		return this;
	}
	protected convertStringToHexadecimalValue (input: string): string {
		var inputStr: string = String(input),
			chars: string = '0123456789ABCDEF', 
			output: string = '',
			x: number;
		for (var i = 0; i < inputStr.length; i++) {
			x = inputStr.charCodeAt(i);
			output += chars.charAt((x >>> 4) & 0x0F) + chars.charAt(x & 0x0F);
		}
		return output;
	}
}