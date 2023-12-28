import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasskeysState {
    username?: string,
}


const initialState: PasskeysState = {}

export const passkeysSlice = createSlice({
    name: 'passkeys',
    initialState,
    reducers: {
        /**
         * Sets the username in the state to the provided value.
         *
         * @param {string} state - The current state object.
         * @param {PayloadAction<string>} action - The payload action containing the new username.
         */
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
    },
});

export const { setUsername } = passkeysSlice.actions;


export default passkeysSlice.reducer;