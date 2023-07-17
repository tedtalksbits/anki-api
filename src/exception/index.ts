export class HTTPError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  /**
   * 200 OK
   *
   * @param {string} [message='OK']
   * @return {HTTPError}
   * @static
   * @memberof HTTPError
   * @example
   * HTTPError.OK()
   * // returns HTTPError { statusCode: 200, message: 'OK' }
   */

  static OK(message: string = 'OK'): HTTPError {
    return new HTTPError(200, message);
  }

  /**
   * 201 Created
   *
   * @param {string} [message='Created']
   * @return {HTTPError}
   * @static
   * @memberof HTTPError
   * @example
   * HTTPError.CREATED()
   * // returns HTTPError { statusCode: 201, message: 'Created' }
   */

  static CREATED(message: string = 'Created'): HTTPError {
    return new HTTPError(201, message);
  }

  /**
   * 204 No Content
   *
   * @param {string} [message='No Content']
   * @return {HTTPError}
   * @static
   * @memberof HTTPError
   * @example
   * HTTPError.NO_CONTENT()
   * // returns HTTPError { statusCode: 204, message: 'No Content' }
   */

  /**
   * 400 Bad Request
   *
   * @param {string} [message='Bad Request']
   * @return {HTTPError}
   * @static
   * @memberof HTTPError
   * @example
   * HTTPError.BAD_REQUEST()
   * // returns HTTPError { statusCode: 400, message: 'Bad Request' }
   */
  static BAD_REQUEST(message: string = 'Bad Request'): HTTPError {
    return new HTTPError(400, message);
  }

  /**
   * 401 Unauthorized
   *
   * @param {string} [message='Unauthorized']
   * @return {HTTPError}
   * @static
   * @memberof HTTPError
   * @example
   * HTTPError.UNAUTHORIZED()
   * // returns HTTPError { statusCode: 401, message: 'Unauthorized' }
   */

  static UNAUTHORIZED(message: string = 'Unauthorized'): HTTPError {
    return new HTTPError(401, message);
  }

  /**
   *
   * 403 Forbidden
   *
   * @param {string} [message='Forbidden']
   * @return {HTTPError}
   * @static
   * @memberof HTTPError
   * @example
   * HTTPError.FORBIDDEN()
   * // returns HTTPError { statusCode: 403, message: 'Forbidden' }
   */

  static FORBIDDEN(message: string = 'Forbidden'): HTTPError {
    return new HTTPError(403, message);
  }

  /**
   * 404 Not Found
   *
   * @param {string} [message='Not Found']
   * @return {HTTPError}
   * @static
   * @memberof HTTPError
   * @example
   * HTTPError.NOT_FOUND()
   * // returns HTTPError { statusCode: 404, message: 'Not Found' }
   */

  static NOT_FOUND(message: string = 'Not Found'): HTTPError {
    return new HTTPError(404, message);
  }

  /**
   * 500 Internal Server Error
   *
   * @param {string} [message='Internal Server Error']
   * @return {HTTPError}
   * @static
   * @memberof HTTPError
   * @example
   * HTTPError.INTERNAL_ERROR()
   *  // returns HTTPError { statusCode: 500, message: 'Internal Server Error' }
   *
   */

  static INTERNAL_ERROR(message: string = 'Internal Server Error'): HTTPError {
    return new HTTPError(500, message);
  }
}
