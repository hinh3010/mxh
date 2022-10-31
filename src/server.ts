import cors from "cors";
import express, { Router } from "express";
import morgan from "morgan";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { routersV1 } from "./apis/v1/index.routers";
import { ConfigServer } from "./config/config";


class Server extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT');


    constructor() {
        super()
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan("dev"));
        this.dbConnect();

        this.app.use(
            cors({
                origin: true,
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
                credentials: true,
            })
        );

        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: 'hello three'
            })
        })

        this.app.use('/v1', this.routers())

        this.app.use((err: any, req: express.Request, res: express.Response, next: any) => {
            res.json({
                status: err.status || 500,
                message: err.message
            })
        })

        this.listen();
    }

    routers(): Router {
        return routersV1
    }


    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => {
                console.log("Connect Success");
            })
            .catch((err) => {
                console.error(err);
            });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(
                `http://localhost:${this.port}/`
            );
        });
    }
}

new Server()