import {LOCALE_SET,UPDATE_LOCALE} from '../actions/types';

export default function(state={lang:'en'},action){
    switch(action.type){
        case LOCALE_SET:
            return {...state,lang:action.payload}
        // case UPDATE_LOCALE:
        //     debugger;
        default:
            return state;
    }
}