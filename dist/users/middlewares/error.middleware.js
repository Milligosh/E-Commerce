"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.appErrorHandler = exports.notFound = void 0;
/**
 * Error response middleware for 404 not found.
 *
 * @param {Request} req
 * @param {Response} res
 */
function notFound(req, res) {
    res.status(404).json({
        code: 404,
        message: 'Ooops, route not found'
    });
}
exports.notFound = notFound;
/**
 * Error response middleware for handling all app errors except generic errors.
 *
 * @param  {Error}   err
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 */
function appErrorHandler(err, req, res, next) {
    if (err.code && typeof err.code === 'number') {
        console.log(`
            status - ${err.code}
            message - ${err.message} 
            url - ${req.originalUrl} 
            method - ${req.method} 
            IP - ${req.ip}
        `);
        res.status(err.code).json({
            code: err.code,
            message: err.message
        });
    }
    else {
        next(err);
    }
}
exports.appErrorHandler = appErrorHandler;
/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {Error}   err
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 */
function genericErrorHandler(err, req, res, next) {
    console.log(`
        status - 500 
        message - ${err.stack} 
        url - ${req.originalUrl} 
        method - ${req.method} 
        IP - ${req.ip}
    `);
    res.status(500).json({
        code: 500,
        data: '',
        message: err.message
    });
}
exports.genericErrorHandler = genericErrorHandler;
