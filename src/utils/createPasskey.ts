import { fido2Create } from "@ownid/webauthn";
import {
    generateAuthenticationOptions
} from "@simplewebauthn/server";
import { nanoid } from "nanoid";

const rpID = "";

export default async function createPasskeys(username: string) {
    const publicKey = await createPublicKey(username)

    const responseFido = await fido2Create(publicKey, username);
    return responseFido
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
            // authenticatorAttachment: "platform",
            userVerification: "required",
            residentKey: "preferred",
            requireResidentKey: false,
        },
        allowCredentials: [],
    };

    return publicKey
}