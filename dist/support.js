"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context = /** @class */ (function () {
    function Context() {
        this.method = 'GET';
    }
    return Context;
}());
exports.Context = Context;
var ActionReport = /** @class */ (function () {
    function ActionReport() {
        this.message = '';
    }
    return ActionReport;
}());
exports.ActionReport = ActionReport;
var RestResponse = /** @class */ (function () {
    function RestResponse(data, header) {
        this.header = header;
        this.data = data;
    }
    return RestResponse;
}());
exports.RestResponse = RestResponse;
