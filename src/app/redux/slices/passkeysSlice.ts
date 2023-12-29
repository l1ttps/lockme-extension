import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Verification } from "../../types/types";
interface PasskeysState {
    [keys: string]: Verification & {
        deviceName?: string,
        createdAt: Date
    }
}

const initialState: PasskeysState = {}

interface SaveVerificationPayload {
    username: string
    verification: Verification
}
export const passkeysSlice = createSlice({
    name: 'passkeys',
    initialState,
    reducers: {
        /**
         * Saves the verification payload to the state.
         *
         * @param {object} state - The current state object.
         * @param {object} action - The payload action containing the username and verification.
         * @param {string} action.payload.username - The username.
         * @param {object} action.payload.verification - The verification object.
         * @param {Date} action.payload.verification.createdAt - The creation date of the verification.
         * @return {void}
         */
        saveVerification: (state, action: PayloadAction<SaveVerificationPayload>) => {
            const { username, verification } = action.payload
            state[username] = {
                ...verification,
                createdAt: new Date()
            }
        },
        /**
         * Delete a verification from the state.
         *
         * @param {string} state - The current state object.
         * @param {PayloadAction<string>} action - The payload action containing the verification to be deleted.
         */
        deleteVerification: (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        },
        /**
         * Updates the device name for a given user.
         *
         * @param {object} state - The current state of the application.
         * @param {object} action - The action object containing the payload.
         * @param {string} action.payload.username - The username of the user.
         * @param {string} action.payload.deviceName - The new device name.
         */
        updateDeviceName: (state, action: PayloadAction<{ username: string, deviceName: string }>) => {
            const { username, deviceName } = action.payload
            state[username].deviceName = deviceName
        }
    },
});

export const { saveVerification, deleteVerification, updateDeviceName } = passkeysSlice.actions;


export default passkeysSlice.reducer;