const initialState = {
    movie: [],
    lastPage: 0,
    isLoading: false,
    isFinish: false,
    isError: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        // case login
        case "FETCH_ALL_PENDING":
            return {
                ...state, isLoading: true
            }

        case "FETCH_ALL_FULFILLED":
            return {
                ...state,
                isLoading: false, isFinish: true,
                lastPage: action.payload.data.lastPage,
                movie: action.payload.data.data
            }

        case "FETCH_ALL_REJECTED":
            return {
                ...state, isError: true, isLoading: false
            }

        default:
            return state
    }
}