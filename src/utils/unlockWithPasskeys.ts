import { generateAuthenticationOptions, verifyAuthenticationResponse } from "@simplewebauthn/server";
import { AuthenticationResponseJSON } from "@simplewebauthn/server/script/deps";
import { base64url } from "../app/helper/base64url";
import { getRegistrationInfo } from "../app/helper/bufferUtils";
import { getOrigin } from "../app/helper/getOrigin";
import store from "../app/redux/store";
export default async function unlockWithPasskeys(username: string) {
    const state = store.getState()
    const passkeys = state.passkeys
    try {
        const options: any = await generateAuthenticationOptions({
            allowCredentials: [],
        });
        options.challenge = base64url.decode(options.challenge);

        const credential = await navigator.credentials.get({
            publicKey: options as PublicKeyCredentialRequestOptions,
            mediation: 'optional'
        });

        const cred = passkeys[username]
        cred.credentialID = new Uint8Array(Object.values(cred.credentialID))
        console.log(cred.credentialID)
        const verification = await verifyAuthenticationResponse({
            response: credential as AuthenticationResponseJSON,
            expectedChallenge: options.challenge,
            expectedOrigin: getOrigin(),
            expectedRPID: options.rpId,
            authenticator: getRegistrationInfo(cred),
            requireUserVerification: false,
        });

        return verification
    } catch (error) {
        console.error("Error unlocking with passkeys:", error);
        throw error;
    }
}

