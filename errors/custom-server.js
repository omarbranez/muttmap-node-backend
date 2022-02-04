class CustomServerError extends Error {
    constructor(message){
        super(message)
    }
}

export default CustomServerError