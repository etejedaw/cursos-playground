import express, {Request, Response} from "express";
import cluster from "cluster";
import crypto from "crypto";

process.env.UV_THREADPOOL_SIZE = "1";

if(cluster.isPrimary){
    cluster.fork();
    cluster.fork();
}
else{
    const app = express();

    app.get("/", (_req: Request, res: Response) => {
        crypto.pbkdf2('a', 'b', 100000, 512, "sha512", () => {
            res.send("Hello World!");
        });
    });

    app.get("/fast", (_req: Request, res: Response) => {
        res.send("This was fast!");
    });
    
    app.listen(3000, () => console.log("Connected on PORT 3000"));
}
