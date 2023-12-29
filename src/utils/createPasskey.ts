import { fido2Create } from "@ownid/webauthn";
import {
    VerifyRegistrationResponseOpts,
    generateAuthenticationOptions, verifyRegistrationResponse
} from "@simplewebauthn/server";
import { Buffer } from "buffer";
import { nanoid } from "nanoid";
import { getOrigin } from "../app/helper/getOrigin";

/**
 * Creates passkeys for a given username.
 *
 * @param {string} username - The username for which to create passkeys.
 * @return {Promise<any>} A promise that resolves to the response from the FIDO2 create function.
 */

/**
 * Creates passkeys for a given username.
 *
 * @param {string} username - The username for which to create passkeys.
 * @return {Promise<any>} - The response from creating the passkeys.
 */
export default async function createPasskeys(username: string) {
    const publicKey = await createPublicKey(username)
    const responseFido = await fido2Create(publicKey, username);
    const expectedChallenge = convertChallenge(publicKey.challenge)
    const verification = await verifyRegistrationResponse({
        response: responseFido.data,
        expectedChallenge: expectedChallenge,
        expectedOrigin: getOrigin()
    } as VerifyRegistrationResponseOpts);
    const { verified, registrationInfo } = verification;
    if (verified) return registrationInfo
    return null
}

/**
 * Converts a challenge into a base64-encoded string.
 *
 * @param {any} challenge - The challenge to convert.
 * @return {string} The base64-encoded string representation of the challenge.
 */
export function convertChallenge(challenge: AllowSharedBufferSource | string): string {
    const textDecoder = new TextDecoder('utf-8');
    const base64 = Buffer.from(textDecoder.decode(challenge as AllowSharedBufferSource)).toString("base64")
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}



/**
 * Creates a public key for the given username.
 *
 * @param {string} username - The username for which to create the public key.
 * @return {Promise} The generated public key.
 */
async function createPublicKey(username: string) {
    const user = {
        id: nanoid(),
        name: username,
        displayName: username,
    }
    const options = await generateAuthenticationOptions({
        userVerification: "required",
    });
    const publicKey = {
        ...options,
        rp: { name: "passkeys" },
        user,
        pubKeyCredParams: [
            { type: "public-key", alg: -7 },
            { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
            // authenticatorAttachment: "platform",
            userVerification: "required",
            residentKey: "preferred",
            requireResidentKey: false,
        },
        allowCredentials: [],
    };

    return publicKey
}