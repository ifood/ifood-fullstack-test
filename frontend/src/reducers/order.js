const INITIAL_STATE = {
    orders: [],
};
const search = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_FILTERED_DATA':
            return {
                ...state,
                orders: action.payload,
            };
        default:
            return state;
    }
};

export default search;
