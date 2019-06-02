"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../documents/Document");
var LazyDocument = /** @class */ (function (_super) {
    __extends(LazyDocument, _super);
    function LazyDocument(init) {
        var _this = _super.call(this) || this;
        _this.urlMethod = init.url;
        _this.extractorMethod = init.extractor;
        _this.serializerMethod = init.serializer;
        return _this;
    }
    LazyDocument.prototype.url = function (context) {
        return this.urlMethod(context);
    };
    LazyDocument.prototype.extractor = function (dto) {
        return this.extractorMethod(dto);
    };
    LazyDocument.prototype.serializer = function (data) {
        return this.serializerMethod(data);
    };
    return LazyDocument;
}(Document_1.Document));
var test = new LazyDocument({
    url: function () { return 'https://httpbin.org/get'; },
    extractor: function (dto) { return dto; },
    serializer: function (data) { return data; },
});
test.update().then(function (obj) {
    console.log(obj);
}).catch(function (obj) {
    console.log('error');
});
