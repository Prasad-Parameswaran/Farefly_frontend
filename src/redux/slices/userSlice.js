import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'Admin',
    initialState: {
        userToken: null
    },
    reducers: {
        UserLG(state, action) {
            console.log(action.payload, "jjjjjjjjjjj");
            const Token = action.payload
            state.userToken = Token
        },
        userLO(state, action) {
            state.userToken = null
        }
    }
})

export const { UserLG, userLO } = userSlice.actions

export default userSlice.reducer