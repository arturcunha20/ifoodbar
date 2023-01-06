"use strict";
/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.error = exports.success = void 0;
function success(message, results, statusCode) {
    return {
        code: statusCode,
        error: false,
        message,
        results,
    };
}
exports.success = success;
/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
function error(message, statusCode) {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
    if (!findCode)
        statusCode = 500;
    else
        statusCode = findCode;
    return {
        code: statusCode,
        error: true,
        message,
    };
}
exports.error = error;
/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
function validation(errors) {
    return {
        code: 422,
        error: true,
        errors,
        message: "Validation errors",
    };
}
exports.validation = validation;
