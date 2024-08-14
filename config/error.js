export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenError';
        this.statusCode = 403; // HTTP 상태 코드
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404; // HTTP 상태 코드
    }
}

export class UnauthorizedError extends Error{
    constructor(message){
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}