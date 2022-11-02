import Joi from 'joi';
import { ObjectID } from 'typeorm';
import { CMS_STATUS_TYPE, GROUP_VISIBLE_TYPE } from '../../types/enumTypes';

export class GroupValidate {
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

    getAllGroup() {
        return {
            query: Joi.object().keys({
                limit: Joi.number(),
                page: Joi.number(),

                name: Joi.string(),
                cmsStatus: Joi.string().valid(...Object.values(CMS_STATUS_TYPE)),
            })
        }
    }


    updateGroup() {
        return {
            body: Joi.object().keys({
                name: Joi.string().trim().required(),
                description: Joi.string().trim(),
                banner: Joi.string().trim(),
                groupVisible: Joi.string().valid(...Object.values(GROUP_VISIBLE_TYPE)),
            })
        }
    }

    createGroup() {
        return {
            body: Joi.object().keys({
                name: Joi.string().trim().required(),
                description: Joi.string().trim(),
                banner: Joi.string().trim(),
                groupVisible: Joi.string().valid(...Object.values(GROUP_VISIBLE_TYPE)),
            })
        }
    }

}


