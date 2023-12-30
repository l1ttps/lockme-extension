import { createSlice } from '@reduxjs/toolkit';

export interface TabsProtectState {
    url: string,
    createdAt?: number
}

const tabsProtectedByDefault: string[] =
    ["settings", "extensions", "password-manager/passwords", "history"]

const initialState: TabsProtectState[] = []

export const tabsProtectSlice = createSlice({
    name: 'tabsProtect',
    initialState,
    reducers: {
        /**
         * Adds a new tab to the state array.
         *
         * @param {Object[]} state - The current state array of tabs.
         * @param {Object} action - The action object containing the new tab's URL.
         * @param {string} action.payload.url - The URL of the new tab.
         * @returns {void}
         */
        addNewTab: (state, action) => {
            state.push({
                url: action.payload.url,
                createdAt: new Date().getTime()
            })
        }
    },
});

export const { addNewTab } = tabsProtectSlice.actions;

export default tabsProtectSlice.reducer;