import { combineReducers, configureStore } from '@reduxjs/toolkit'
import adminSlice from './slices/adminSlice'
import userSlice from './slices/userSlice'
import partnerSlice from './slices/partnerSlice'

const admin = combineReducers({
    adminSlice: adminSlice
})
const users = combineReducers({
    userSlice: userSlice
})
const partner = combineReducers({
    partnerSlice: partnerSlice
})


const store = configureStore({
    reducer: {
        admin: admin,
        users: users,
        partner: partner
    }
})

export default store