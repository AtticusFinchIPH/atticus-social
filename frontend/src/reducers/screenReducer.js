import { SWITCH_DRAWER_REQUEST } from '../constants/screenActions';

function isDrawerOpenReducer(state = false, action){
    switch(action.type){
        case SWITCH_DRAWER_REQUEST:
            return action.payload;
        default:
            return state;
    }
}

export { isDrawerOpenReducer };