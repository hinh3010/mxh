import { GENDER_TYPE } from "../../types/enumTypes"

export interface UpdateUserPayload {
    firstName?: string
    lastName?: string
    displayName?: string
    avatar?: string
    gender?: GENDER_TYPE
    dateOfBirth?: Date
    description?: string
    favorites?: string
}


export interface ChangePassWordUserPayload {
    password: string
}
