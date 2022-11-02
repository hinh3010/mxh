
export interface CreatePagePayload {
    name?: string
    description?: string
    avatar?: string
    banner?: string
    website?: string
    hotline?: string
    address?: string

    createdBy?: string
}

export interface UpdatePagePayload {
    name?: string
    description?: string
    avatar?: string
    banner?: string
    website?: string
    hotline?: string
    address?: string
}
