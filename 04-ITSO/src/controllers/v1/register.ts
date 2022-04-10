import { Router, Request, Response } from "express";
import models from "../../models";
import JwtUtils from "../../utils/JwtUtils";
import runAsyncWrapper from "../../utils/runAsyncWrapper";

const router = Router();
const {User, Role} = models;

router.post("/register", runAsyncWrapper(async (req: Request, res: Response) => {
    const {email, password, roles} = req.body;
    const user = await User.findOne({where: {email}});
    if(user) return res.status(200).send({
        success: false,
        message: "User already exists"
    });
    try{
        const newUser = await User.create({email, password});
        const JwtPayload = {email};
        const accessToken = JwtUtils.generateAccessToken(JwtPayload);
        const refreshToken = JwtUtils.generateRefreshToken(JwtPayload);
        await newUser.createRefreshToken({token: refreshToken});
    }
    catch(error: any){
        console.error(error.stack);
        return res.status(500).send({
            success: false,
            message: error.mesage
        });
    }
}));

export default router;