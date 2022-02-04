import CustomServerError from "./custom-server.js"
import { StatusCodes } from "http-status-codes"

class BadRequestError extends CustomServerError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError