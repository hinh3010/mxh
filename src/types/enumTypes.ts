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

export enum SORT_TYPE {
    DESC = "DESC",
    ASC = "ASC"
}

// post 
export enum POST_TYPE {
    NORMAL = 'NORMAL',
    POLL = 'POLL',
    EVENT = 'EVENT',
}

export enum POST_VISIBLE_TYPE {
    PUBLIC = 'PUBLIC',
    ONLY_ME = 'ONLY_ME',
    FRIEND = 'FRIEND',
}

export enum POST_TARGET_EMTITY_TYPE {
    USER = 'user',
    GROUP = 'group',
    PAGE = 'page',
}


// group
export enum GROUP_VISIBLE_TYPE {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

