import { ObjectID } from "typeorm"
import { GENDER_TYPE, POST_TARGET_EMTITY_TYPE, POST_TYPE, POST_VISIBLE_TYPE } from "../../types/enumTypes"

export interface CreatePostPayload {
    content?: string
    postType?: POST_TYPE
    links?: string[]
    postVisible?: POST_VISIBLE_TYPE
    targetEntity?: POST_TARGET_EMTITY_TYPE
    targetId: ObjectID
    address?: string
}


