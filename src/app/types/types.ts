export interface PasswordForm {
    password: string;
    confirmPassword: string;
}

export interface LockScreenForm {
    password: string;
}

export enum LockScreenType {
    WINDOW = 'window',
    TAB_PROTECTED = 'tab_protected',
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

export interface Verification {
    fmt: string
    counter: number
    aaguid: string
    credentialID: Uint8Array
    credentialPublicKey: Uint8Array
    credentialType: string
    attestationObject: Uint8Array
    userVerified: boolean
    credentialDeviceType: string
    credentialBackedUp: boolean
    origin: string
}

export interface Uint8Array {
    [key: string]: number
}
