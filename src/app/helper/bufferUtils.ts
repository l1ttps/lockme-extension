import { base64url } from "./base64url";

function uintToString(a: any) {
    const base64string = btoa(String.fromCharCode(...a));
    return base64string.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}


export function getRegistrationInfo(registrationInfo: any) {
    const { credentialPublicKey, counter, credentialID } = registrationInfo;


    return {
        credentialID: base64url.decode(credentialID) as any,
        credentialPublicKey: credentialPublicKey,
        counter,
    }
}
