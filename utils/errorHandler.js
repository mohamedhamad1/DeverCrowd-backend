class ErorHandler extends Error{
    constructor(){
        super();
    }
    create(message, statusCode){
        this.message = message;
        this.statusCode = statusCode;
        console.log(this);
        return this;
    }
}
module.exports = new ErorHandler();