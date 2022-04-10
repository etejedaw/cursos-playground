import JwtUtils from "../utils/JwtUtils";
import {Request, Response, NextFunction} from "express";

function requireAuth(tokenType: string){
    return function(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(401).send({
            success: false,
            message: "Authorization header not found"
        });
        try {
            let [bearer, token] = authHeader.split(' ');
            if (bearer.toLocaleLowerCase() !== "bearer" || !token) throw Error;
            let jwt: any;
            switch(tokenType){
                case "refreshToken":
                    jwt = JwtUtils.verifyRefreshToken(token);
                default:
                    jwt = JwtUtils.verifyAccessToken(token);
            }
            req.body.jwt = jwt;
            next();
        }
        catch(error) {
            return res.status(401).send({
                success: false,
                message: "Bearer token malformed"
            });
        }
    }
}

export default requireAuth;