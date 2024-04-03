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
        },
        setToken(state, action) {
            state.token = action.payload
        }
    },
});

export const {authorizeUser, unAuthorizeUser, setToken} = userSlice.actions;

export default userSlice.reducer;