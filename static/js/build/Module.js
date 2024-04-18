var Module = /** @class */ (function () {
    function Module() {
        var _newTarget = this.constructor;
        this.Static = _newTarget;
        this.Static._instance = this;
        this._initErrorLogging();
    }
    Module.GetInstance = function () {
        if (this._instance == null)
            this._instance = new this();
        return this._instance;
    };
    Module.prototype._initErrorLogging = function () {
        var _this = this;
        this._errorFingerPrints = new Map();
        var envMeta = document.head.querySelector('meta[name=environment]');
        if (envMeta.content === 'dev')
            return this;
        window.onerror = function (message, file, line, col, error) {
            var errorFingerPrint = _this.convertStringToHexadecimalValue(file) + '_' + String(line);
            if (_this._errorFingerPrints.has(errorFingerPrint)) {
                return false;
            }
            else {
                _this._errorFingerPrints.set(errorFingerPrint, String(message));
                var data = {
                    message: _this.convertStringToHexadecimalValue(String(message)),
                    uri: _this.convertStringToHexadecimalValue(location.href),
                    file: _this.convertStringToHexadecimalValue(file),
                    line: line,
                    column: col,
                    callstack: error.stack ? _this.convertStringToHexadecimalValue(error.stack) : '',
                    browser: _this.convertStringToHexadecimalValue(navigator.userAgent),
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
    };
    Module.prototype.convertStringToHexadecimalValue = function (input) {
        var inputStr = String(input), chars = '0123456789ABCDEF', output = '', x;
        for (var i = 0; i < inputStr.length; i++) {
            x = inputStr.charCodeAt(i);
            output += chars.charAt((x >>> 4) & 0x0F) + chars.charAt(x & 0x0F);
        }
        return output;
    };
    return Module;
}());
//# sourceMappingURL=Module.js.map