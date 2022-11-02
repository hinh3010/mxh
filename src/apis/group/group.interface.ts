import { GROUP_VISIBLE_TYPE } from "../../types/enumTypes"

export interface ICreateGroupPayload {
    name?: string
    description?: string
    banner?: string
    groupVisible?: GROUP_VISIBLE_TYPE

    createdBy?: string
}

export interface IUpdateGroupPayload {
    name?: string
    description?: string
    banner?: string
    groupVisible?: GROUP_VISIBLE_TYPE
}
