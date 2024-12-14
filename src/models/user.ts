export interface SigninProps {
    username: string
    password: string
}

export interface TokenProps {
    access: string
    refresh: string
}

export interface CreateUserProps {
    agree: boolean
    confirmPassword: string
    password: string
    username: string
}

export interface CreateUserInfo {
    password: string
    username: string
}

export interface UserProps {
    username?: string
    nickname?: string
    profilePicture?: string
    interests?: string[]
    personalities?: string[]
}
