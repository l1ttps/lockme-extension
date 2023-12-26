import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
    hash?: string | null,
    createdAt?: Date | null
}
const initialState: PasswordState = {}

export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        /**
         * Sets the password state to the value provided in the action payload.
         *
         * @param {PayloadAction<PasswordState>} action - The action containing the new password state.
         */
        setPassword: (state, action: PayloadAction<string>) => {
            state.hash = action.payload
            state.createdAt = new Date()
        },
        removePassword: (state) => {
            state.createdAt = null
            state.hash = null
        }
    },
});

export const { setPassword, removePassword } = passwordSlice.actions;


export default passwordSlice.reducer;