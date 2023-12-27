import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
    isShowPasswordHint: boolean,
    isEnableLock: boolean
}
const initialState: SettingsState = {
    isShowPasswordHint: true,
    isEnableLock: true
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {

    },
});

export const { } = settingsSlice.actions;

export default settingsSlice.reducer;