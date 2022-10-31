import * as dotenv from 'dotenv'

dotenv.config({
    path:
        process.env.NODE_ENV !== undefined
            ? `.${process.env.NODE_ENV.trim()}.env`
            : ".env",
});

const access_expires = process.env.ACCESS_TOKEN_EXPIRES || 50
const refresh_expires = process.env.REFRESH_TOKEN_EXPIRES || 5000

export const Env = {
    port: Number(process.env.PORT) || 8081,
    db: {
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },

    jwt: {
        access_token_serret: 'HelloCacBanTre',
        access_expiresIn: access_expires.toString() + 'd',
        access_expires: Number(access_expires),

        refresh_token_serret: 'BatNgoChuaBaGia',
        refresh_expiresIn: refresh_expires.toString() + 'd',
        refresh_expires: Number(refresh_expires)
    },
}