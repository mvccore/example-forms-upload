try {
	Object.defineProperty(
		String, 'WHITESPACE_CHARS', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000"
		}
	);
	Object.defineProperty(
		String, 'WHITESPACE_REGEXP', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: /([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g
		}
	);
	Object.defineProperty(
		String, 'HTML_ESCAPE_MAP', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#039;'
			}
		}
	);
	Object.defineProperty(
		String, 'HTML_UNESCAPE_MAP', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: {
				'&amp;': '&',
				'&lt;': '<',
				'&gt;': '>',
				'&quot;': '"',
				'&#039;': "'"
			}
		}
	);
	Object.defineProperty(
		String, 'isString', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (value) {
				return typeof value === 'string' || value instanceof String;
			}
		}
	);
	Object.defineProperty(
		String.prototype, 'trimLeft', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (charlist) {
				var whitespace = '',
					l = 0,
					i = 0,
					str = String(this);
				if (!charlist) {
					// default list
					whitespace = String.WHITESPACE_CHARS;
				} else {
					// preg_quote custom list
					charlist += '';
					whitespace = charlist.replace(String.WHITESPACE_REGEXP, '$1');
				}
				for (i = 0, l = str.length; i < l; i++)
					if (whitespace.indexOf(str.charAt(i)) === -1)
						break;
				if (i > 0)
					str = str.substring(i);
				return str;
			}
		}
	);
	Object.defineProperty(
		String.prototype, 'trimRight', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (charlist) {
				var whitespace = '',
					l = 0,
					i = 0,
					str = String(this);
				if (!charlist) {
					// default list
					whitespace = String.WHITESPACE_CHARS;
				} else {
					// preg_quote custom list
					charlist += '';
					whitespace = charlist.replace(String.WHITESPACE_REGEXP, '$1');
				}
				for (l = str.length, i = l - 1; i >= 0; i--)
					if (whitespace.indexOf(str.charAt(i)) === -1)
						break;
				if (i < l - 1)
					str = str.substring(0, i + 1);
				return str;
			}
		}
	);
	Object.defineProperty(
		String.prototype, 'trim', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (charlist) {
				var whitespace = '',
					l = 0,
					i = 0,
					str = String(this);
				if (!charlist) {
					// default list
					whitespace = String.WHITESPACE_CHARS;
				} else {
					// preg_quote custom list
					charlist += '';
					whitespace = charlist.replace(String.WHITESPACE_REGEXP, '$1');
				}
				// from left
				for (i = 0, l = str.length; i < l; i++)
					if (whitespace.indexOf(str.charAt(i)) === -1)
						break;
				if (i > 0)
					str = str.substring(i);
				// from right
				for (l = str.length, i = l - 1; i >= 0; i--)
					if (whitespace.indexOf(str.charAt(i)) === -1)
						break;
				if (i < l - 1)
					str = str.substring(0, i + 1);
				return str;
			}
		}
	);
} catch (e) {}
if (!String.prototype.toHexStr) 
	Object.defineProperty(
		String.prototype, 'toHexStr', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function () {
				var chars = '0123456789ABCDEF', 
					output = '',
					x = 0;
				for (var i = 0, l = this.length; i < l; i++) {
					x = this.charCodeAt(i);
					output += chars.charAt((x >>> 4) & 0x0F) + chars.charAt(x & 0x0F);
				}
				return output;
			}
		}
	);
if (!String.prototype.escapeHtml) 
	Object.defineProperty(
		String.prototype, 'escapeHtml', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function () {
				return this.replace(/[&<>"']/g, function(m) { return String.HTML_ESCAPE_MAP[m]; });
			}
		}
	);
if (!String.prototype.unescapeHtml) 
	Object.defineProperty(
		String.prototype, 'unescapeHtml', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function () {
				return this.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) { return String.HTML_UNESCAPE_MAP[m]; });
			}
		}
	);
	
if (!Boolean.isBoolean)
	Object.defineProperty(
		Boolean, 'isBoolean', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (rawVal) {
				return rawVal === true || rawVal === false;
			}
		}
	);
if (!Boolean.parse)
	Object.defineProperty(
		Boolean, 'parse', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (rawVal) {
				if (Boolean.isBoolean(rawVal)) return rawVal;
				if (rawVal == null) return false;
				var typeStr = typeof rawVal;
				if (typeStr === 'number') {
					if (rawVal === 1) return true;
					return false;
				} else if (typeStr === 'string') {
					var rawValLower = rawVal.toLowerCase();
					if (rawValLower === '1' || rawValLower === 'true' || rawValLower === 'on') return true;
					return false;
				} else if (typeStr === 'array') {
					return rawVal.length > 0;
				} else {
					return !!rawVal;
				}
			}
		}
	);

if (!Object.typeOf)
	Object.defineProperty(
		Object, 'typeOf', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (o) {
				var r = Object.prototype.toString.apply(o); // "[object Something]"
				return r.substr(8, r.length - 9); // Something
			}
		}
	);
if (!Object.isObject)
	Object.defineProperty(
		Object, 'isObject', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (o) {
				return o != null && (typeof o == 'object' || o instanceof Object);
			}
		}
	);
if (!Object.prototype.toMap) {
	(function () {
		var toMap = function (map, obj, keys) {
			for (var key = '', i = 0, l = keys.length; i < l; i += 1) {
				key = keys[i];
				map.set(key, obj[key]);
			}
			return map;
		};
		var toMapKey = function (map, obj, keys, handleKey) {
			for (var key = '', val = null, i = 0, l = keys.length; i < l; i += 1) {
				key = keys[i];
				val = obj[key];
				map.set(handleKey(key, val), val);
			}
			return map;
		};
		var toMapValue = function (map, obj, keys, handleValue) {
			for (var key = '', i = 0, l = keys.length; i < l; i += 1) {
				key = keys[i];
				map.set(key, handleValue(obj[key]));
			}
			return map;
		};
		var toMapKeyValue = function (map, obj, keys, handleKey, handleValue) {
			for (var key = '', val = null, i = 0, l = keys.length; i < l; i += 1) {
				key = keys[i];
				val = obj[key];
				map.set(handleKey(key, val), handleValue(val));
			}
			return map;
		};
		Object.defineProperty(
			Object.prototype, 'toMap', {
				enumerable: false,
				writable: false,
				configurable: true,
				value: function (handleKey, handleValue) {
					var result = new Map(),
						keys = Object.keys(this),
						convertKeys = handleKey != null,
						convertValues = handleValue != null;
					if (convertKeys && convertValues) {
						return toMapKeyValue(result, this, keys, handleKey, handleValue);
					} else if (convertKeys) {
						return toMapKey(result, this, keys, handleKey);
					} else if (convertValues) {
						return toMapValue(result, this, keys, handleValue);
					} else {
						return toMap(result, this, keys);
					}
				}
			}
		);
	})();
}
if (!Map.prototype.toObject) 
	Object.defineProperty(
		Map.prototype, 'toObject', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function () {
				var result = Object.create(null);
				this.forEach(function (val, key) {
					result[String(key)] = val;
				});
				return result;
			}
		}
	);
if (!Map.prototype.value) 
	Object.defineProperty(
		Map.prototype, 'value', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (key) {
				return this.get(key);
			}
		}
	);
if (!Map.prototype.values) 
	Object.defineProperty(
		Map.prototype, 'values', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function () {
				var result = [];
				this.forEach(function (val) {
					result.push(val);
				});
				return result;
			}
		}
	);
if (!Map.prototype.keys) 
	Object.defineProperty(
		Map.prototype, 'keys', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function () {
				var result = [];
				this.forEach(function (val, key) {
					result.push(key);
				});
				return result;
			}
		}
	);
if (!Array.isArray) 
	Object.defineProperty(
		Array, 'isArray', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (arg) {
				if (arg == null) return false;
				return arg.constructor === Array;
			}
		}
	);
if (!Array.prototype.map) 
	Object.defineProperty(
		Array.prototype, 'map', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (callbackFn, thisArg) {
				var result = [];
				if (typeof callbackFn !== 'function')
					throw Error("Callback '" + String(callbackFn) + "' is not a function.");
				thisArg = thisArg || window;
				for (var i = 0, l = this.length; i < l; i++) {
					result.push(
						callbackFn(this[i], i, this, thisArg)
					);
				}
				return result;
			}
		}
	);
if (!Array.prototype.intersect) 
	Object.defineProperty(
		Array.prototype, 'intersect', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function () {
				var retArr = [],
					argl = arguments.length,
					arglm1 = argl - 1,
					k1 = '',
					arr = [],
					i = 0,
					k = '';
				thisKeys: for (k1 in this) { // eslint-disable-line no-labels
					arrs: for (i = 0; i < argl; i++) { // eslint-disable-line no-labels
						arr = arguments[i];
						for (k in arr) {
							if (arr[k] === this[k1]) {
								if (i === arglm1) {
									retArr[k1] = this[k1]
								}
								// If the innermost loop always leads at least once to an equal value,
								// continue the loop until done
								continue arrs;// eslint-disable-line no-labels
							}
						}
						// If it reaches here, it wasn't found in at least one array, so try next value
						continue thisKeys;// eslint-disable-line no-labels
					}
				}
				return retArr;
			}
		}
	);
if (!EventTarget.prototype.addEventsListeners) 
	Object.defineProperty(
		EventTarget.prototype, 'addEventsListeners', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (types, callback, options) {
				if (types == null) return;
				var typesArr = Array.isArray(types)
					? types
					: types.replace(/\s/g, '').split(',');
				for (var i = 0, l = typesArr.length; i < l; i++)
					this.addEventListener(typesArr[i], callback, options);
			}
		}
	);
if (!EventTarget.prototype.removeEventsListeners) 
	Object.defineProperty(
		EventTarget.prototype, 'removeEventsListeners', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (types, callback, options) {
				if (types == null) return;
				var typesArr = Array.isArray(types)
					? types
					: types.replace(/\s/g, '').split(',');
				for (var i = 0, l = typesArr.length; i < l; i++)
					this.removeEventListener(typesArr[i], callback, options);
			}
		}
	);
if (!HTMLElement.prototype.addClass) 
	Object.defineProperty(
		HTMLElement.prototype, 'addClass', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (cssClass) {
				var className = this.className.replace(/\s{2,}/g, ' ').trim();
				var classes = className.split(' ');
				var classCatched = false;
				for (var c = 0, d = classes.length; c < d; c += 1) {
					if (classes[c] == cssClass) {
						classCatched = true;
						break;
					}
				};
				if (!classCatched) 
					this.className = className + ' ' + cssClass;
				return this;
			}
		}
	);
if (!HTMLElement.prototype.removeClass) 
	Object.defineProperty(
		HTMLElement.prototype, 'removeClass', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (cssClass) {
				var rg = new RegExp(' ' + cssClass + ' ', 'gi');
				this.className = String(
						' ' + 
						this.className.replace(/\s{2,}/g, ' ').trim() + 
						' '
					)
					.replace(rg, ' ')
					.replace(/\s{2,}/g, ' ')
					.trim();
				return this;
			}
		}
	);
if (!HTMLElement.prototype.hasClass) 
	Object.defineProperty(
		HTMLElement.prototype, 'hasClass', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (cssClass) {
				return String(
					' ' + this.className.replace(/\s{2,}/g, ' ').trim() + ' '
				).indexOf(' ' + cssClass + ' ') != -1;
			}
		}
	);
if (!HTMLElement.prototype.getViewportSizes) 
	Object.defineProperty(
		HTMLElement.prototype, 'getViewportSizes', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function () {
				var rect = this.getBoundingClientRect();
				return {
					ViewXStart: rect.left,
					ViewYStart: rect.top,
					ViewXEnd: rect.left + this.offsetWidth,
					ViewYEnd: rect.top + this.offsetHeight
				}
			}
		}
	);
if (!HTMLElement.prototype.getPageSizes) 
	Object.defineProperty(
		HTMLElement.prototype, 'getPageSizes', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function () {
				var currentElm = this,
					current = currentElm,
					left = 0,
					top = 0,
					lefts = [currentElm.offsetLeft],
					tops = [currentElm.offsetTop];
				while (true) {
					if (current.offsetParent == null) break;
					current = current.offsetParent;
					lefts.push(current.offsetLeft);
					tops.push(current.offsetTop);
				}
				lefts = lefts.reverse();
				tops = tops.reverse();
				lefts.map(n => {
					left += n;
				});
				tops.map(n => {
					top += n;
				});
				return {
					PageXStart: left,
					PageYStart: top,
					PageXEnd: left + currentElm.offsetWidth,
					PageYEnd: top + currentElm.offsetHeight
				}
			}
		}
	);
if (!HTMLElement.prototype.setAttributes) 
	Object.defineProperty(
		HTMLElement.prototype, 'setAttributes', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (attrs) {
				for (var name in attrs)
					this.setAttribute(name, attrs[name]);
				return this;
			}
		}
	);
if (!HTMLElement.prototype.setStyles) 
	Object.defineProperty(
		HTMLElement.prototype, 'setStyles', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (styles) {
				var style = this.style;
				for (var name in styles)
					style[name] = styles[name];
				return this;
			}
		}
	);
if (!window.HTMLElement.prototype.getStyle) 
	Object.defineProperty(
		HTMLElement.prototype, 'getStyle', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (cssPropName, asNumber) {
				var result = this.ownerDocument.defaultView.getComputedStyle(this, '').getPropertyValue(cssPropName);
				if (result != null && asNumber) 
					return parseInt(result, 10);
				return result;
			}
		}
	);
if (!window.HTMLElement.prototype.getStyleAlt) 
	Object.defineProperty(
		HTMLElement.prototype, 'getStyleAlt', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (cssPropName, asNumber) {
				return this.getStyle(cssPropName, asNumber);
			}
		}
	);
if (!Array.from) {
	Object.defineProperty(
		Array, 'from', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: (function () {
				var symbolIterator;
				try {
					symbolIterator = Symbol.iterator
						? Symbol.iterator
						: 'Symbol(Symbol.iterator)';
				} catch (e) {
					symbolIterator = 'Symbol(Symbol.iterator)';
				}

				var toStr = Object.prototype.toString;
				var isCallable = function (fn) {
					return (
						typeof fn === 'function' ||
						toStr.call(fn) === '[object Function]'
					);
				};
				var toInteger = function (value) {
					var number = Number(value);
					if (isNaN(number)) return 0;
					if (number === 0 || !isFinite(number)) return number;
					return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
				};
				var maxSafeInteger = Math.pow(2, 53) - 1;
				var toLength = function (value) {
					var len = toInteger(value);
					return Math.min(Math.max(len, 0), maxSafeInteger);
				};

				var setGetItemHandler = function setGetItemHandler(isIterator, items) {
					var iterator = isIterator && items[symbolIterator]();
					return function getItem(k) {
						return isIterator ? iterator.next() : items[k];
					};
				};

				var getArray = function getArray(
					T,
					A,
					len,
					getItem,
					isIterator,
					mapFn
				) {
					// 16. Let k be 0.
					var k = 0;

					// 17. Repeat, while k < len… or while iterator is done (also steps a - h)
					while (k < len || isIterator) {
						var item = getItem(k);
						var kValue = isIterator ? item.value : item;

						if (isIterator && item.done) {
							return A;
						} else {
							if (mapFn) {
								A[k] =
									typeof T === 'undefined'
										? mapFn(kValue, k)
										: mapFn.call(T, kValue, k);
							} else {
								A[k] = kValue;
							}
						}
						k += 1;
					}

					if (isIterator) {
						throw new TypeError(
							'Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1'
						);
					} else {
						A.length = len;
					}

					return A;
				};

				// The length property of the from method is 1.
				return function from(arrayLikeOrIterator /*, mapFn, thisArg */) {
					// 1. Let C be the this value.
					var C = this;

					// 2. Let items be ToObject(arrayLikeOrIterator).
					var items = Object(arrayLikeOrIterator);
					var isIterator = isCallable(items[symbolIterator]);

					// 3. ReturnIfAbrupt(items).
					if (arrayLikeOrIterator == null && !isIterator) {
						throw new TypeError(
							'Array.from requires an array-like object or iterator - not null or undefined'
						);
					}

					// 4. If mapfn is undefined, then let mapping be false.
					var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
					var T;
					if (typeof mapFn !== 'undefined') {
						// 5. else
						// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
						if (!isCallable(mapFn)) {
							throw new TypeError(
								'Array.from: when provided, the second argument must be a function'
							);
						}

						// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
						if (arguments.length > 2) {
							T = arguments[2];
						}
					}

					// 10. Let lenValue be Get(items, "length").
					// 11. Let len be ToLength(lenValue).
					var len = toLength(items.length);

					// 13. If IsConstructor(C) is true, then
					// 13. a. Let A be the result of calling the [[Construct]] internal method
					// of C with an argument list containing the single item len.
					// 14. a. Else, Let A be ArrayCreate(len).
					var A = isCallable(C) ? Object(new C(len)) : new Array(len);

					return getArray(
						T,
						A,
						len,
						setGetItemHandler(isIterator, items),
						isIterator,
						mapFn
					);
				};
			})()
		}
	);
}

if (!Number.isNaN)
	Object.defineProperty(
		Number, 'isNaN', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: window.isNaN
		}
	);
if (Number.EPSILON === undefined)
	Object.defineProperty(
		Number, 'EPSILON', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: Math.pow(2, -52)
		}
	);
if (!Number.isInteger)
	Object.defineProperty(
		Number, 'isInteger', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (value) {
				return (
					(typeof value == 'number' || value instanceof Number) && 
					Number.isFinite(value) && 
					Math.floor(value) === value
				);
			}
		}
	);
if (!Number.isNumber)
	Object.defineProperty(
		Number, 'isNumber', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (value) {
				return typeof value == 'number' || value instanceof Number;
			}
		}
	);
if (!Number.isNumeric)
	Object.defineProperty(
		Number, 'isNumeric', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (value) {
				var whitespace = [
					' ',
					'\n',
					'\r',
					'\t',
					'\f',
					'\x0b',
					'\xa0',
					'\u2000',
					'\u2001',
					'\u2002',
					'\u2003',
					'\u2004',
					'\u2005',
					'\u2006',
					'\u2007',
					'\u2008',
					'\u2009',
					'\u200a',
					'\u200b',
					'\u2028',
					'\u2029',
					'\u3000'
				].join('')
				// @todo: Break this up using many single conditions with early returns
				return (
					(
						typeof value === 'number' ||
						(
							typeof value === 'string' &&
							whitespace.indexOf(value.slice(-1)) === -1
						)
					) &&
					value !== '' &&
					!isNaN(value)
				)
			}
		}
	);
if (!Number.parseFloatSafe)
	Object.defineProperty(
		Number, 'parseFloatSafe', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (strVal) {
				var safeStr = strVal != null ? String(strVal).trim() : '';
				if (safeStr.length == 0) return null;
				var floatVal = parseFloat(safeStr);
				if (Number.isNaN(floatVal) || !Number.isFinite(floatVal)) return null;
				return floatVal;
			}
		}
	);
if (!Number.parseIntSafe)
	Object.defineProperty(
		Number, 'parseIntSafe', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (strVal, radix) {
				var safeStr = strVal != null ? String(strVal).trim() : '';
				if (safeStr.length == 0) return null;
				radix = radix == null ? 10 : radix;
				var intVal = parseInt(safeStr, radix);
				if (Number.isNaN(intVal)) return null;
				return intVal;
			}
		}
	);
if (!Number.prototype.round) 
	Object.defineProperty(
		Number.prototype, 'round', {
			enumerable: false,
			writable: false,
			configurable: true,
			value: function (precision, mode) {
				var mode = mode || 'round';
				var multiplier = Math.pow(10, precision);
				return Math[mode](this * multiplier) / multiplier;
			}
		}
	);