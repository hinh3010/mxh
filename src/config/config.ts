import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { AppDataSource } from "./db";

export abstract class ConfigServer {

    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        // console.log({ nodeNameEnv })
        dotenv.config({
            path: nodeNameEnv,
        });
    }

    // env
    public getEnvironment(k: string): string | undefined {
        // console.log({ getEnvironment: k, value: process.env[k] });
        return process.env[k];
    }

    public getNumberEnv(k: string): number {
        // console.log({ getNumberEnv: k, value: this.getEnvironment(k) });
        return Number(this.getEnvironment(k));
    }

    public get nodeEnv(): string {
        return this.getEnvironment("NODE_ENV")?.trim() || "";
    }

    public createPathEnv(path: string): string {
        const arrEnv: Array<string> = ["env"]; //['hello', 'cacbantre'] => 'hello.cacbantre'

        if (path.length > 0) {
            const stringToArray = path.split(".");
            arrEnv.unshift(...stringToArray);
        }
        // console.log({ arrEnv });
        return "." + arrEnv.join(".");
    }


    // type orm
    get initConnect(): Promise<DataSource> {
        return AppDataSource.initialize();
    }
}
