var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Front = /** @class */ (function (_super) {
    __extends(Front, _super);
    function Front() {
        var _this = _super.call(this) || this;
        _this.encodedFiles = [];
        _this.encodedFilesCount = 0;
        _this.initTestSubmit();
        return _this;
    }
    Front.prototype.initTestSubmit = function () {
        this.form = document.getElementById('ajax_upload');
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this), true);
        this.filesInput = this.form['files[]'];
        this.uploadedFilesCont = document.getElementById('uploaded_files');
        return this;
    };
    Front.prototype.handleFormSubmit = function (e) {
        //this.execRequest();
        var file, reader;
        this.encodedFiles = [];
        this.encodedFilesCount = 0;
        for (var i = 0, l = this.filesInput.files.length; i < l; i++) {
            file = this.filesInput.files.item(i);
            this.encodedFiles[i] = {
                filename: file.name,
                type: file.type
            };
            reader = new FileReader();
            reader.addEventListener('load', this.handleFileReaderLoaded.bind(this, i, reader), false);
            reader.readAsDataURL(file);
        }
        e.preventDefault();
    };
    Front.prototype.handleFileReaderLoaded = function (index, reader) {
        this.encodedFiles[index].content = reader.result.toString();
        this.encodedFilesCount++;
        if (this.encodedFilesCount === this.filesInput.files.length) {
            this.execRequest();
        }
    };
    Front.prototype.execRequest = function () {
        Ajax.load({
            url: this.form.action,
            method: this.form.method,
            headers: {
                'Content-Type': 'application/json'
            },
            //data: JSON.stringify({files: window.testImages}),
            data: JSON.stringify({ files: this.encodedFiles }),
            type: 'json',
            success: this.handleSuccessResponse.bind(this)
        });
    };
    Front.prototype.handleSuccessResponse = function (response) {
        var e_1, _a;
        if (response.result) {
            var code = [], date, formatedDate;
            try {
                for (var _b = __values(response.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var file = _c.value;
                    date = new Date();
                    date.setTime(file.time * 1000);
                    formatedDate = date.toJSON().replace(/^([^T]+)T([^\.]+)\.000Z/g, '$1 $2');
                    code.push.apply(code, [
                        "<div>",
                        "<b>".concat(file.name, "</b><br />"),
                        "<i>Modified: ".concat(formatedDate, ")</i><br />"),
                        "<img src=\"".concat(file.url, "\" />"),
                        "</div>",
                    ]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.uploadedFilesCont.innerHTML = code.join('');
        }
        else {
            console.log(response.errors);
        }
    };
    return Front;
}(Module));
// run all declared javascripts after <body>, after all elements are declared
Front.GetInstance();
//# sourceMappingURL=Front.js.map