import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name: 'Admin',
    initialState: {
        adminToken: null
    },
    reducers: {
        adminLG(state, action) {
            console.log(action.payload, "jjjjjjjjjjj");
            const Token = action.payload
            state.adminToken = Token
        },
        adminLO(state, action) {
            state.adminToken = null
        }
    }
})

export const { adminLG, adminLO } = adminSlice.actions

export default adminSlice.reducer