import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listFood: {},
    bill: {},
}

const cart = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, actions) => {
            state.listFood = {
                ...state.listFood,
                listFood: [...state.listFood.listFood, actions.payload],
                totalPrice: state.listFood.totalPrice + actions.payload.price,
                totalItem: state.listFood.totalItem + actions.payload.count,
            }
        },
        removeFoodFromCart: (state, actions) => {
            state.listFood = state.listFood.filter((e) => e.id !== actions.payload)
        },
        setCountFood: (state, actions) => {
            state.listFood.listFood = state.listFood.listFood.map((e) => {
                if (e.id === actions.payload.id) {
                    return {
                        ...e,
                        count: actions.payload.count,
                        price: actions.payload.price,
                    }
                }
                return e
            })
        },
        getBill: (state, actions) => {
            state.bill = actions.payload
        },
        getTableClient: (state, actions) => {
            state.listFood = actions.payload
        },
    },
})
export const cartAction = cart.actions

export default cart.reducer
