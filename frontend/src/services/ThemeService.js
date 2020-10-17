import changeTheme from '../actions/shared';

export default class ThemeService {
    static changeTheme = () => (dispatch) => dispatch(changeTheme());
}
