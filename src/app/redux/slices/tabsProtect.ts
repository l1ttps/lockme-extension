import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TabsProtectState {
    hostname: string,
    createdAt?: number
}

export const tabsProtectedByDefault: string[] =
    ["settings", "extensions", "password-manager/passwords", "history"]

const initialState: TabsProtectState[] = []
interface AddNewTabPayload {
    hostname: string
}
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
        addNewTab: (state, action: PayloadAction<AddNewTabPayload>) => {
            state.push({
                hostname: action.payload.hostname,
                createdAt: new Date().getTime()
            })
        },
        /**
         * Deletes a tab from the state.
         *
         * @param {object} state - The current state of tabs.
         * @param {PayloadAction<string>} action - The action containing the payload with the tab's hostname.
         * @return {void}
         */
        deleteTab: (state, action: PayloadAction<string>) => {
            state = state.filter((tab) => tab.hostname !== action.payload)
            return state
        }
    },
});

export const { addNewTab, deleteTab } = tabsProtectSlice.actions;

export default tabsProtectSlice.reducer;