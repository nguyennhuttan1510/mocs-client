import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile: {},
}

const user = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginSuccess(state, action) {
            state.profile = action.payload
        },
        loginFail(state, action) {
            state.profile = {}
        },

        logoutSuccess(state, action) {
            state.profile = {}
        },

        getProfile(state, action) {
            state.profile = action.payload
        },
    },
})
export const authAction = user.actions

export default user.reducer
