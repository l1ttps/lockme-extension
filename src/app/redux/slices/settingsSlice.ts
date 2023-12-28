import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
    showPasswordHint: boolean,
    enableLock: boolean
}

interface ChangeSettingsPayload {
    checked: boolean,
    key: keyof SettingsState
}

const initialState: SettingsState = {
    showPasswordHint: true,
    enableLock: true
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        /**
         * Updates the settings state based on the provided action payload.
         *
         * @param {object} state - The current state of the settings.
         * @param {object} action - The action object containing the payload.
         * @param {string} action.payload.key - The key of the setting to be updated.
         * @param {boolean} action.payload.checked - The new value for the setting.
         */
        changeSettings: (state, action: PayloadAction<ChangeSettingsPayload>) => {
            const { key, checked } = action.payload;
            state[key] = checked
        }
    },
});

export const { changeSettings } = settingsSlice.actions;

export default settingsSlice.reducer;