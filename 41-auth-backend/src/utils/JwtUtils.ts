import jwt, {SignOptions, JwtPayload} from "jsonwebtoken";
import environment from "../config/environment";

class JwtUtils{

    static generateAccessToken(payload: JwtPayload, options: SignOptions = {}){
        const {expiresIn = "1d"} = options;
        return jwt.sign(payload, environment.JWT_ACCESS_TOKEN_SECRET, {expiresIn});
    }

    static generateRefreshToken(payload: JwtPayload){
        return jwt.sign(payload, environment.JWT_REFRESH_TOKEN_SECRET);
    }

    static verifyAccessToken(accessToken: string){
        return jwt.verify(accessToken, environment.JWT_ACCESS_TOKEN_SECRET);
    }

    static verifyRefreshToken(refreshToken: string){
        return jwt.verify(refreshToken, environment.JWT_REFRESH_TOKEN_SECRET);
    }
}

export default JwtUtils;