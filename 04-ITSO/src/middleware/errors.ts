import {Request, Response, NextFunction} from "express"

function errorsMiddelware(err: Error, req: Request, res: Response, next: NextFunction){
    console.log("[Error middleware]");
    console.error(err.stack);
    res.status(500).send({
        success: false,
        message: err.message
    });
}

export default errorsMiddelware;