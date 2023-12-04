class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.data = message;
            message = null;
            data = null;
        }

        if (data) {
            this.data = data;
        }

        if (message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message){
        super(data, message)
        this.code = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message){
        super(data, message);
        this.code = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}