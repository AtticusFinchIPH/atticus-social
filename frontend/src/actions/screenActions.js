import { SWITCH_DRAWER_REQUEST } from '../constants/screenActions';

const switchDrawer = (state) => (dispatch) => {
    dispatch({ type: SWITCH_DRAWER_REQUEST, payload: state });
}

export { switchDrawer }