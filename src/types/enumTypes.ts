import { Table } from "./tableTypes";

export enum LOGIN_TYPE {
    ACCOUNT = 'ACCOUNT',
    GOOGLE = 'GOOGLE',
    FACEBOOK = 'FACEBOOK',
}

export enum GENDER_TYPE {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}


export enum ROLE_TYPE {
    USER = 'USER',
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}

export enum CMS_STATUS_TYPE {
    ACTIVE = 'ACTIVE',
    BLOCK = 'BLOCK',
}

// post 
export enum POST_TYPE {
    NORMAL = 'NORMAL',
    POLL = 'POLL',
    EVENT = 'EVENT',
    WALL = 'WALL',
    SHARE = 'SHARE',
}

export enum POST_VISIBLE_TYPE {
    PUBLIC = 'PUBLIC',
    ONLY_ME = 'ONLY_ME',
    FRIEND = 'FRIEND',
}

export enum POST_TARGET_EMTITY_TYPE {
    USER = 'user',
    POST = 'post',
    PAGE = 'page',
}


