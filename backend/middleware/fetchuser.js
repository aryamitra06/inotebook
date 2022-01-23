const jwt = require('jsonwebtoken');

const JWT_SECRET = 'hello@!23';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        // decrypting and storing data.user value to req.user using jwt
        req.user = data.user;
        next();
    }
    catch{
        res.status(401).send({ error: "Invalid token"});
    }
}

module.exports = fetchuser;