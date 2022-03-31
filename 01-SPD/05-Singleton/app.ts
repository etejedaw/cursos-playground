import Database from "./Database";

const database = Database.getInstance();
database.query("SELECT * FROM database");