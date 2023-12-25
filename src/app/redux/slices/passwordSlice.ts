import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
    password: string | null
}
const initialState: PasswordState = {
    password: null
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
            state.password = action.payload
        },
    },
});

export const { setPassword } = passwordSlice.actions;


export default passwordSlice.reducer;