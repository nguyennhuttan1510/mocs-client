import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listMenu: [],
    categoryMenu: [],
    listEvent: [],
}

const home = createSlice({
    name: 'home',
    initialState: initialState,
    reducers: {
        getListMenu: (state, actions) => {
            state.listMenu = actions.payload
        },
        getCategory: (state, actions) => {
            state.categoryMenu = actions.payload
        },
        getEvent: (state, actions) => {
            state.listEvent = actions.payload
        },
    },
})
export const homeAction = home.actions

export default home.reducer
