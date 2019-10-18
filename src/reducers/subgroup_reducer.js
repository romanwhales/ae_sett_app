import { GET_SUBGROUPS,GET_SUBGROUP_ACCOUNTS,GET_SUBGROUPS_BYDATE,UPDATE_PRODUCT} from '../actions/types';

export default function(state ={},action){
    switch(action.type){
        case GET_SUBGROUPS:
            return {...state,subGroups:action.payload}
        case GET_SUBGROUP_ACCOUNTS:
            return {...state,subGroupAccounts:action.payload}
        case GET_SUBGROUPS_BYDATE:
            return {...state,subGroupDateRange:action.payload}
        case UPDATE_PRODUCT:
            let filtered_products_data = state.subGroupAccounts.data.filter(item => item.id !== action.payload.data.id);
            filtered_products_data.push(action.payload.data);
            state.subGroupAccounts.data = filtered_products_data;
            // debugger;
            return {...state,productUpdated:action.payload}
        default:
            return state;
    }  
}