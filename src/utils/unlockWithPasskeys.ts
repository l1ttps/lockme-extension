import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { base64url } from "../app/helper/base64url";
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
        const credentialID = new Uint8Array(Object.values(cred.credentialID))
        const b64encoded = base64url.encode(credentialID as any);

        // 
        return !!credential
        // const verification = await verifyAuthenticationResponse({
        //     response: credential as AuthenticationResponseJSON,
        //     expectedChallenge: options.challenge,
        //     expectedOrigin: getOrigin(),
        //     expectedRPID: options.rpId,
        //     authenticator: {
        //         counter: 0,
        //         credentialID: credentialID,
        //         credentialPublicKey: cred.credentialPublicKey,
        //         transports: ["internal"]
        //     },
        //     requireUserVerification: false,
        // });

        // return verification
    } catch (error) {
        console.error("Error unlocking with passkeys:", error);
        throw error;
    }
}

