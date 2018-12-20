const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isFinish: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MOVIES_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_MOVIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                data: action.payload.data
            };

        case 'GET_MOVIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: 'Error Network'
            };
            
        case 'GET_CATEGORIES_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_CATEGORIES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                data: action.payload.data
            };

        case 'GET_CATEGORIES_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: 'Error Network'
            };

        case 'GET_TRENDING_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_TRENDING_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                data: action.payload.data
            };

        case 'GET_TRENDING_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: 'Error Network'
            };
        default:
            return state
    }
} 