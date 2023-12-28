export interface PasswordForm {
    password: string;
    confirmPassword: string;
}

export interface LockScreenForm {
    password: string;
}

export enum LockScreenType {
    WINDOW = 'window',
    TAB = 'tab'
}

export interface PublicKey {
    challenge: string
    timeout: number
    userVerification: string
    rpId: string
    rp: Rp
    user: User
    pubKeyCredParams: PubKeyCredParam[]
    authenticatorSelection: AuthenticatorSelection
}

export interface Rp {
    id: string
    name: string
}

export interface User {
    id: string
    name: string
    displayName: string
}

export interface PubKeyCredParam {
    type: string
    alg: number
}

export interface AuthenticatorSelection {
    authenticatorAttachment: string
    userVerification: string
    residentKey: string
    requireResidentKey: boolean
}
