export {};

declare global {
	interface HTMLElementPageSizes {
		PageXStart: number;
		PageYStart: number;
		PageXEnd: number;
		PageYEnd: number;
	}
	interface HTMLElementViewportSizes {
		ViewXStart: number;
		ViewYStart: number;
		ViewXEnd: number;
		ViewYEnd: number;
	}
	interface StringConstructor {
		readonly WHITESPACE_CHARS: string;
		readonly WHITESPACE_REGEXP: string;
		isString (value: any): value is string;
	}
	interface String {
		toHexStr (): string;
		trim (charlist?: string): string;
		trimLeft (charlist?: string): string;
		trimRight (charlist?: string): string;
		escapeHtml (): string;
		unescapeHtml (): string;
	}
	interface BooleanConstructor {
		isBoolean(rawVal: any): rawVal is boolean;
		/**
		 * Return boolean true only:  
		 * - if rawVal is fully equal to `true`, `1`, `"1"`, `"true"`, `"on"` 
		 * - if rawVal is array with length > 0, 
		 * - if rawVal is any object but not null or undefined.  
		 * 
		 * Else return boolean false.
		 */
		parse(rawVal: any): boolean;
	}
	interface ObjectConstructor {
		typeOf(o: any): string;
		isObject(o: any): o is object;
	}
	interface Object {
		toMap<K, V>(handleKey?: (rawKey?: string, rawValue?: any) => K, handleValue?: (rawValue?: any) => V): Map<K, V>;
	}
	interface ArrayConstructor {
		isArray(arg: any): arg is any[];
	}
	interface Array<T> {
		intersect(...arrays: Array<T>[]): Array<T>;
		map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
	}
	interface EventTarget {
		addEventsListeners(types: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
		removeEventsListeners(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
	}
	interface Map<K, V> {
		toObject (): object;
	}
	interface Map<K, V> {
		value (key: K): V;
	}
	interface HTMLElement {
		addClass (cssClass: string): HTMLElement;
		removeClass (cssClassOrRegExpPatternValue: string): HTMLElement;
		hasClass (cssClass: string): boolean;
		getViewportSizes (): HTMLElementViewportSizes;
		getPageSizes (): HTMLElementPageSizes;
		setAttributes (attrs: object): HTMLElement;
		setStyles (styles: CSSStyleDeclaration | object): HTMLElement;
		getStyle (cssPropName: keyof CSSStyleDeclaration): string;
		getStyle (cssPropName: keyof CSSStyleDeclaration, asNumber: true): number;
		getStyleAlt (cssPropName: string): string;
		getStyleAlt (cssPropName: string, asNumber: true): number;
	}
	interface NumberConstructor {
		readonly EPSILON: number;
		isInteger (value: any): value is number;
		isNumeric (value: any): value is number;
		isNumber (value: any): value is number;
		parseIntSafe (strVal: any, radix?: number): number | null;
		parseFloatSafe (strVal: any): number | null;
	}
	interface Number {
		round (precision: number, mode?: 'round' | 'floor' | 'ceil'): number;
	}
}