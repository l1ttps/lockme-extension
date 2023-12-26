import { createSlice } from '@reduxjs/toolkit';

interface LockState {
    isLocked: boolean
}
const initialState: LockState = {
    isLocked: true
}

export const lockSlice = createSlice({
    name: 'lock',
    initialState,

    reducers: {
        /**
         * Unlocks the state.
         *
         * @param {object} state - The state object.
         */
        unLock: (state) => {
            state.isLocked = false
        },
        /**
         * Locks the given state by setting the `isLocked` property to `true`.
         *
         * @param {any} state - The state object to be locked.
         */
        lock: (state) => {
            state.isLocked = true
        }
    },
});

export const { unLock, lock } = lockSlice.actions;

export default lockSlice.reducer;