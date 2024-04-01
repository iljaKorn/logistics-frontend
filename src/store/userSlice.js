import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userState",
    initialState: {
        token: "",
        user: {},
        isLogged: false
    }, 
    reducers: {
        authorizeUser(state, action) {
            state.user = action.payload.user
            state.isLogged = true
            state.token = action.payload.token
        },
        unAuthorizeUser(state, action) {
            state.user = {}
            state.isLogged = false
            state.equipmentForRent = {}
            state.booking = {}
        }
    },
});

export const {authorizeUser, unAuthorizeUser} = userSlice.actions;

export default userSlice.reducer;