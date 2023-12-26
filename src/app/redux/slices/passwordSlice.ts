import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
    hash: string | null
}
const initialState: PasswordState = {
    hash: null
}

export const passwordSlice = createSlice({
    name: 'counter',
    initialState,

    reducers: {
        /**
         * Sets the password state to the value provided in the action payload.
         *
         * @param {PayloadAction<PasswordState>} action - The action containing the new password state.
         */
        setPassword: (state, action: PayloadAction<string>) => {
            state.hash = action.payload
        },
    },
});

export const { setPassword } = passwordSlice.actions;


export default passwordSlice.reducer;