import * as express from "express";
import Database from "./infra/database";
import * as bodyParser from "body-parser";
import newsController from "./controller/newsController";

class StartUp {
    public app: express.Application;
    private _db: Database;
    private bodyParser;

    constructor() {
        this.app = express();
        this._db = new Database();
        this._db.createConnection();
        this.middler();
        this.routes();
    }

    middler() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    routes() {
        this.app.route('/').get((req, res) => {
            res.send('versão: 0.0.1');
        });

        this.app.route("/api/v1/news").get(newsController.get);
        this.app.route("/api/v1/news/:id").get(newsController.getById);
        this.app.route("/api/v1/news/:id").put(newsController.update);
        this.app.route("/api/v1/news/:id").post(newsController.update);
        this.app.route("/api/v1/news/:id").post(newsController.delete);
    }
}

export default new StartUp();