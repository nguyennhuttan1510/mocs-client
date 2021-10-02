import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    titleHeader: '',
    // IDTable: '',
}

const current = createSlice({
    name: 'current',
    initialState: initialState,
    reducers: {
        setTitleHeader: (state, actions) =>
            void (state.titleHeader = actions.payload),
        // setIDTable: (state, actions) => {
        //     state.IDTable = actions.payload
        // },
    },
})
export const currentState = current.actions

export default current.reducer
