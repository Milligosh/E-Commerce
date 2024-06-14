"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideResponse = exports.responseProvider = void 0;
function responseProvider(res, data, message, code) {
    return res.status(code).json({ message, data });
}
exports.responseProvider = responseProvider;
function provideResponse(status, code, message, data) {
    return {
        status: status,
        code: code,
        message: message,
        data: data
    };
}
exports.provideResponse = provideResponse;
