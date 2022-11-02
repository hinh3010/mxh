import Joi from 'joi';
import { ObjectID } from 'typeorm';
import { CMS_STATUS_TYPE, POST_TARGET_EMTITY_TYPE, POST_TYPE, POST_VISIBLE_TYPE } from '../../types/enumTypes';
import { } from './page.interface';

export class PageValidate {
    constructor() {
    }

    paramId() {
        return {
            params: Joi.object().keys({
                id: Joi.string().trim().custom((value: any, helpers: any) => {
                    if (!value.match(ObjectID)) {
                        return helpers.message('"{{#label}}" must be a valid id');
                    }
                    return value;
                }).required(),
            })
        }
    }

    getAllPage() {
        return {
            query: Joi.object().keys({
                limit: Joi.number(),
                page: Joi.number(),

                name: Joi.string(),
                cmsStatus: Joi.string().valid(...Object.values(CMS_STATUS_TYPE)),
            })
        }
    }


    updatePage() {
        return {
            body: Joi.object().keys({
                name: Joi.string().trim().required(),
                description: Joi.string().trim(),

                avatar: Joi.string().trim(),
                banner: Joi.string().trim(),
                website: Joi.string().trim(),

                hotline: Joi.string().trim(),
                address: Joi.string().trim(),
            })
        }
    }

    createPage() {
        return {
            body: Joi.object().keys({
                name: Joi.string().trim().required(),
                description: Joi.string().trim(),

                avatar: Joi.string().trim(),
                banner: Joi.string().trim(),
                website: Joi.string().trim(),

                hotline: Joi.string().trim(),
                address: Joi.string().trim(),

            })
        }
    }

}


