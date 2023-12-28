import { fido2Create } from "@ownid/webauthn";
import {
    generateAuthenticationOptions
} from "@simplewebauthn/server";
import { nanoid } from "nanoid";

const rpID = "";

export default async function createPasskeys(username: string) {
    const publicKey = await createPublicKey(username)
    console.log(publicKey);
    const credentials = await fido2Create(publicKey, username);
    console.log(credentials);
    return credentials
}

// function verifyPasskeys(credentials: any) {
//     verifyRegistrationResponse({
//         response: credentials.data,
//         expectedChallenge
//     })
// }

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