module.exports = (asyncFn)=>{
    return(req, res, next)=>{
        asyncFn(req,res,next)
        .catch((err)=>{
            err.status = 500
            err.message = "bad request"
            console.log(err)
            next(err);
        })
    }
}