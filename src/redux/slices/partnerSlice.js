import { createSlice } from '@reduxjs/toolkit'

const partnerSlice = createSlice({
    name: 'Partner',
    initialState: {
        partnerToken: null
    },
    reducers: {
        partnerLG(state, action) {
            console.log(action.payload, "jjjjjjjjjjj23");
            const Token = action.payload
            console.log("ok : ", Token)
            state.partnerToken = Token
            console.log(state)

        },
        partnerLO(state, action) {
            state.partnerToken = null
        }
    }
})

export const { partnerLG, partnerLO } = partnerSlice.actions

export default partnerSlice.reducer