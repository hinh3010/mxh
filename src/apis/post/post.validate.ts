import Joi from 'joi';
import { ObjectID } from 'typeorm';
import { CMS_STATUS_TYPE, POST_TARGET_EMTITY_TYPE, POST_TYPE, POST_VISIBLE_TYPE } from '../../types/enumTypes';
import { QueryPostPayload } from './post.interface';

export class PostValidate {
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
            }) as QueryPostPayload
        }
    }

    getAllPost() {
        return {
            query: Joi.object().keys({
                limit: Joi.number(),
                page: Joi.number(),
                postType: Joi.string().valid(...Object.values(POST_TYPE)),
                postVisible: Joi.string().valid(...Object.values(POST_VISIBLE_TYPE)),
                targetEntity: Joi.string().valid(...Object.values(POST_TARGET_EMTITY_TYPE)),
                cmsStatus: Joi.string().valid(...Object.values(CMS_STATUS_TYPE)),
            })
        }
    }

    getAllPostByTargetId() {
        return {
            query: Joi.object().keys({
                limit: Joi.number(),
                page: Joi.number(),
            }),

            body: Joi.object().keys({
                targetEntity: Joi.string().valid(...Object.values(POST_TARGET_EMTITY_TYPE)),
                postVisible: Joi.string().valid(...Object.values(POST_VISIBLE_TYPE)),
                cmsStatus: Joi.string().valid(...Object.values(CMS_STATUS_TYPE)),
                targetById: Joi.string().required()
            })
        }
    }

    updatePost() {
        return {
            body: Joi.object().keys({
                content: Joi.string().trim(),
                address: Joi.string().trim(),
                attachments: Joi.array(),
                tags: Joi.array(),
                links: Joi.array(),

                postType: Joi.string().valid(...Object.values(POST_TYPE)),
                postVisible: Joi.string().valid(...Object.values(POST_VISIBLE_TYPE)),
            })
        }
    }

    createPost() {
        return {
            body: Joi.object().keys({
                content: Joi.string().trim(),
                address: Joi.string().trim(),

                attachments: Joi.array(),
                tags: Joi.array(),
                links: Joi.array(),

                targetById: Joi.string().trim().required(),


                postType: Joi.string().valid(...Object.values(POST_TYPE)),
                postVisible: Joi.string().valid(...Object.values(POST_VISIBLE_TYPE)),
                targetEntity: Joi.string().valid(...Object.values(POST_TARGET_EMTITY_TYPE)),
            })
        }
    }

}


