import {Request, Response, NextFunction} from "express"

function runAsyncWrapper(callback: Function){
    return function(req: Request, res: Response, next: NextFunction){
        callback(req, res, next).catch(next);
    }
}

export default runAsyncWrapper;