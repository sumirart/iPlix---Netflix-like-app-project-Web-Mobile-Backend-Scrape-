const initialState = {
    token: [],
    user: [],
    isLoading: false,
    isFinish: false,
    isError: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        // case login
        case "LOGIN_PENDING":
            return {
                ...state, isLoading: true
            }

        case "LOGIN_FULFILLED":
            return {
                ...state,
                isLoading: false, isFinish: true,
                token: [action.payload.data.token.token],
                user: [action.payload.data.user]
            }

        case "LOGIN_REJECTED":
            return {
                ...state, isError: true, isLoading: false

            }

        // case logout
        case "LOGOUT":
            return {
                ...state,
                token: [], user: []
            }


        // case register
        case "REGISTER_PENDING":
            return {
                ...state, isLoading: true
            }

        case "REGISTER_FULFILLED":
            return {
                ...state,
                isLoading: false, isFinish: true,
                token: [action.payload.data.token.token],
                user: [action.payload.data.user]
            }

        case "REGISTER_REJECTED":
            return {
                ...state, isError: true, isLoading: false

            }
        default:
            return state
    }
}