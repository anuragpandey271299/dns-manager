const jwt=require('jsonwebtoken')

const isLoggedIn=(req,res,next)=>{
    try{
        const {authorization}=req.headers
        const user=jwt.verify(authorization,process.env.JWT_SECRET_KEY)
        req.user=user
        next()
    }catch(error){
        console.log(error)
    }
}
module.exports=isLoggedIn