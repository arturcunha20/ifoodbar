/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */

export function success(message: string, results: object, statusCode: number) {
    return {
        code: statusCode,
        error: false,
        message,
        results,
    };
}

/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
export function error(message: string, statusCode: number) {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    // Get matched code
    const findCode = codes.find((code) => code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        code: statusCode,
        error: true,
        message,
    };
}

/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
export function validation(errors: object) {
    return {
        code: 422,
        error: true,
        errors,
        message: "Validation errors",
    };
}
