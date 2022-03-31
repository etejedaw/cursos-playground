// Puerto

const PORT = 3000;
process.env.PORT = process.env.PORT || PORT;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// Base de datos

let urlDB;
if (process.env.NODE_ENV === "dev") urlDB = "mongodb://localhost:27017/cafe";
else urlDB = process.env.MONGO_URI;
process.env.URLDB = urlDB;

// Token

process.env.EXPIRATION_TOKEN = "48h";
process.env.SEED = process.env.SEED || "secret-seed-developed";

// Google

process.env.CLIENT_ID = process.env.CLIENT_ID || "1054920166266-47aiko5851qro3jh2f5pmdb9lpp6didg.apps.googleusercontent.com";