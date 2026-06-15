class ApiResponse {
    constructor(status , message = '' , data = []){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}


class ApiError extends Error {
    constructor(message , statusCode) {
        super(message);
        this.statusCode = statusCode
    }
}


class Forbidden extends ApiError {
    constructor(message = 'Not Authorized : Forbidden') {
        super(message , 403)
    }
}
class UnAuthenticated extends ApiError {
    constructor(message = 'Not Authenticated') {
        super(message , 401)
    }
}
class BadRequest extends ApiError {
    constructor(message = 'BadRequest') {
        super(message , 400)
    }
}


class NotFound extends ApiError {
    constructor(message = 'Not Found') {
        super(message , 404)
    }
}


class InternalServerError extends ApiError {
    constructor(message = 'Internal Server Error') {
        super(message , 500)
    }
}


class ConflictError extends ApiError {
    constructor(message = 'Already Exists') {
        super(message , 409)
    }
}



module.exports = { ApiResponse , UnAuthenticated , NotFound , BadRequest , Forbidden , InternalServerError , ConflictError }