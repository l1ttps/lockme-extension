import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
    hash?: string | null,
    hint?: string | null
    createdAt?: number | null
}

interface SetPasswordPayload {
    hash: string,
    hint: string
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
        setPassword: (state, action: PayloadAction<SetPasswordPayload>) => {
            state.hash = action.payload.hash
            state.hint = action.payload.hint
            state.createdAt = new Date().getTime()
        },
        removePassword: (state) => {
            state.createdAt = null
            state.hash = null
        }
    },
});

export const { setPassword, removePassword } = passwordSlice.actions;


export default passwordSlice.reducer;