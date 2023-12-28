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