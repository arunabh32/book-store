const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'baked';

// authentication 

exports.requiredAuth = async (req,res ,next)=>{
    try{    
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No Token Provided'});
        }
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token ,JWT_SECRET);

        //fetch user from Db to their role
        const user = await User.findById(decode.userId).select('-password');

        if(!user){
            return res.status(401).json({message:'User no longer'});
        }
        req.user = user ; 
        next();

    }catch(err){
        return res.status(401).json({ message : 'Invalid or expired token'});
    };
};

exports.authorize = (...roles) =>{
    return(req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message : `role (${req.user.role}) is not authorized to access this route`
            });
        }
        next();
    }
}