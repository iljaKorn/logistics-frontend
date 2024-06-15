import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userState",
    initialState: {
        token: "",
        user: {},
        isLogged: false,
        routeForMap: []
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
            state.routeForMap = []
            state.token = ""
        },
        setToken(state, action) {
            state.token = action.payload
        },
        setRoute(state, action) {
            state.routeForMap = action.payload
        }
    },
});

export const {authorizeUser, unAuthorizeUser, setToken, setRoute} = userSlice.actions;

export default userSlice.reducer;