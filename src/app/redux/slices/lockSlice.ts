import { createSlice } from '@reduxjs/toolkit';

interface LockState {
    isLocked: boolean,
    lockAt?: number | null,
    tried: number,
    disabledExpires: number | null
}
const initialState: LockState = {
    isLocked: true,
    tried: 0,
    lockAt: new Date().getTime(),
    disabledExpires: null
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
            state.lockAt = null
            state.disabledExpires = null
            state.tried = 0
        },
        /**
         * Locks the given state by setting the `isLocked` property to `true`.
         *
         * @param {any} state - The state object to be locked.
         */
        lock: (state) => {
            state.isLocked = true,
                state.lockAt = new Date().getTime()
        },
        /**
         * Retry the operation.
         *
         * @param {object} state - The state object.
         */
        retry: (state) => {
            state.tried = state.tried + 1
            if (state.tried >= 5) {
                state.disabledExpires = new Date().getTime() + 5 * 1000
            }
        }
    },
});

export const { unLock, lock, retry } = lockSlice.actions;

export default lockSlice.reducer;