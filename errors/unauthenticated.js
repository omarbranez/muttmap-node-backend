import CustomServerError from "./custom-server.js"
import { StatusCodes } from "http-status-codes"

class UnauthenticatedError extends CustomServerError {
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default UnauthenticatedError