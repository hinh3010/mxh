
import { GENDER_TYPE, ROLE_TYPE } from '../../types/enumTypes';

export interface RegisterPayload {
    firstName: string
    lastName: string
    displayName: string
    email: string
    phone: string
    password: string
    gender: GENDER_TYPE
}

export interface SignTokenPayload {
    id: string
    role: ROLE_TYPE
}