import { fido2Create } from "@ownid/webauthn";
import {
    generateAuthenticationOptions, verifyRegistrationResponse
} from "@simplewebauthn/server";
import { Buffer } from "buffer";
import { nanoid } from "nanoid";

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
    } as any);

    console.log(verification);


    return responseFido
}

/**
 * Converts a challenge into a base64-encoded string.
 *
 * @param {any} challenge - The challenge to convert.
 * @return {string} The base64-encoded string representation of the challenge.
 */
function convertChallenge(challenge: AllowSharedBufferSource | string): string {
    const textDecoder = new TextDecoder('utf-8');
    const base64 = Buffer.from(textDecoder.decode(challenge as AllowSharedBufferSource)).toString("base64")
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}


/**
 * Retrieves the origin of the current URL.
 *
 * @return {string} The origin of the current URL.
 */
function getOrigin(): string {
    const currentUrl = window.location.href
    return new URL(currentUrl).origin
}

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
            authenticatorAttachment: "platform",
            userVerification: "required",
            residentKey: "preferred",
            requireResidentKey: false,
        },
        allowCredentials: [],
    };

    return publicKey
}