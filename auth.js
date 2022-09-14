import jwt from "jsonwebtoken";
export const auth = (req, resp, next) => {
    try{
        const token = req.header("x-auth-token");
        console.log("token", token);
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    }catch (err){
        resp.status(401).send({error: err.message})
    }
};