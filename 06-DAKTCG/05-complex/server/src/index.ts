import keys from "./keys";
import express, { Request, Response } from "express";
import cors from "cors";
import {Pool} from "pg";
import redis from "redis";

const app = express();

app.use(cors());
app.use(express.json());

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on("error", error => console.error(error));

pgClient.on("connect", client => {
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch((err) => console.error(err));
});

const redisClient = redis.createClient();
const redisPublisher = redisClient.duplicate();

app.get("/", (req: Request, res: Response) => {
    res.send("hi!");
});

app.get("/values/all", async (req: Request, res: Response) => {
    const values = await pgClient.query("SELECT * FROM values");
    res.send(values.rows);
});

app.get("/values/current", async (req: Request, res: Response) => {
    const values = await redisClient.hGetAll("values");
    res.send(values.rows);
});

app.post("/values", async (req: Request, res: Response) => {
    const index = req.body.index;
    if(parseInt(index) > 40) return res.status(422).send("Index too high");
    redisClient.hSet("values", index, "Nothing yet!");
    redisPublisher.publish("insert", index);
    pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);
    res.send({working: true});
});

app.listen(5000, () => console.log("Listening"));