import { CONSTANTS } from '../services/Util';

const INITIAL_STATE = {
    theme: CONSTANTS.default,
};
const theme = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: CONSTANTS.italian,
            };
        default:
            return state;
    }
};

export default theme;
