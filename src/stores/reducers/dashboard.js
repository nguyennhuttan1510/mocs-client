import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isRedirectDetail: false,
    table: {},
    data: [],
    staffs: [],
    listTable: [],
    listMenu: {},
}

const dashboard = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        setIsDetail: (state, action) =>
            void (state.isRedirectDetail = action.payload),
        table: (state, action) => {
            const table = action.payload
            if (table) {
                const currentTable = state.data.filter((e) => e.id === table.id)
                if (currentTable.length > 0) {
                    state.table = currentTable[0]
                    return
                } else {
                    state.table = table
                    return
                }
            }
            state.table = {}
        },

        payBill: (state, action) => {
            const tables = state.data
            const id = action.payload
            const index = tables.findIndex((e) => e.id === id)
            tables.splice(index, 1)
        },

        addTable: (state, action) => void (state.data = action.payload),

        addMenuOfTable: (state, action) => {
            const { id, food } = action.payload //id = id table, food = food is list food in table
            state.data = state.data.map((e) =>
                e.id === id ? { ...e, menu: food } : e
            )
        },

        removeMenuOfTable: (state, action) => {
            //id = id table, food = food has removed in table
            const { id, food } = action.payload

            state.data = state.data.map((item) =>
                item.id === id
                    ? { ...item, menu: item.menu.filter((e) => e.id !== food.id) }
                    : item
            )
        },

        staffs: (state, action) => void (state.staffs = action.payload),

        listTable: (state, action) => void (state.listTable = action.payload),
        listMenu: (state, action) => void (state.listMenu = action.payload),
    },
})
export const tableAction = dashboard.actions
export default dashboard.reducer
