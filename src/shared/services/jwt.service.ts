import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Env } from '../../config/env';

const {
    access_token_serret, access_expiresIn, access_expires,
    refresh_token_serret, refresh_expiresIn, refresh_expires
} = Env.jwt

const signAccessToken = async (payload: any) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            access_token_serret,
            { expiresIn: access_expiresIn },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            }
        )
    })
}

const verifyAccessToken = async (req: any, res: Response, next: NextFunction) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }
    const authorization = req.headers['authorization']
    const token = authorization.split(' ')[1]
    if (!token) {
        return next(createError.Unauthorized())
    }
    jwt.verify(token, access_token_serret, (err: any, payload: any) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message))
        }
        req.payload = payload

        next()
    })
}


const signRefreshToken = async (payload: any) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            refresh_token_serret,
            { expiresIn: refresh_expiresIn },
            (err, refreshToken) => {
                if (err) reject(err)
                resolve(refreshToken)
            }
        )
    })
}


const verifyRefreshToken = async (refreshToken: string) => {
    return new Promise((resolve, reject) => {
        if (!refreshToken) {
            return reject(createError.BadRequest())
        }
        jwt.verify(refreshToken, refresh_token_serret, async (err, payload) => {
            if (payload) {
                return resolve(payload)
            } else {
                return reject(err)
            }
        })
    })
}

const jwtService = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
}

export default jwtService