import { CMS_STATUS_TYPE, POST_TARGET_EMTITY_TYPE, POST_TYPE, POST_VISIBLE_TYPE } from "../../types/enumTypes"

export interface CreatePostPayload {
    content?: string
    attachments?: string[]
    links?: string[]
    address?: string
    postType?: POST_TYPE
    postVisible?: POST_VISIBLE_TYPE
    targetEntity?: POST_TARGET_EMTITY_TYPE

    targetById?: string
    createdBy?: string
    tags?: string[]
}


export interface UpdatePostPayload {
    content?: string
    attachments?: string[]
    links?: string[]
    address?: string
    postType?: POST_TYPE
    postVisible?: POST_VISIBLE_TYPE
}

export interface QueryPostPayload {
    limit?: string
    page?: string
    cmsStatus?: CMS_STATUS_TYPE
    postType?: POST_TYPE
    postVisible?: POST_VISIBLE_TYPE
    targetEntity?: POST_TARGET_EMTITY_TYPE
    targetId?: string
}