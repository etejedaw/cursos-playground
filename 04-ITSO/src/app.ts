import express, {Express, Request, Response} from "express";
import logger from "morgan";
import environment from "./config/environment";
import errorsMiddleware from "./middleware/errors";
import {v1Routes} from "./controllers"

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(logger('dev', {skip: (req: Request, res: Response) => environment.NODE_ENV === "test"}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.setRoutes();
    }

    setRoutes() {
        this.app.use("/v1", v1Routes);
        this.app.use(errorsMiddleware);
    }

    getApp() {
        return this.app;
    }

    listen() {
        const {PORT} = environment;
        this.app.listen(PORT, () => console.log("Listening at port " + PORT));
    }
}

export default App;