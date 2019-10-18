import { GET_ACCOUNTS,CREATE_ACCOUNT,CREATE_ACCOUNT_ERROR,DELETE_ACCOUNT, GET_ACCOUNT,UPDATE_ACCOUNT,ACCOUNTS_BYDATE,GET_ACCOUNTS_ERROR,} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case GET_ACCOUNTS:
            return {...state,accountList:action.payload}
        case CREATE_ACCOUNT:
            return {...state,accountCreated:action.payload}
        case CREATE_ACCOUNT_ERROR:
            return {...state,accountCreatedError:action.payload}
        case GET_ACCOUNTS_ERROR:
            return {...state,accountListError:action.payload}
        case DELETE_ACCOUNT:
            const remainingAccounts = state.accountList.data.filter(item => item.id !== action.payload.id);
            state.accountList.data = remainingAccounts;
            return {...state,accountDeleted:action.payload}
        case GET_ACCOUNT:
            return {...state,account:action.payload}
        case ACCOUNTS_BYDATE:
            return {...state,accountsByDate:action.payload}
        case UPDATE_ACCOUNT:
            let filtered_account_data = state.accountList.data.filter(item => item.id !== action.payload.data.id);
            filtered_account_data.push(action.payload.data);
            state.accountList.data = filtered_account_data;
            return{...state,accountUpdated:action.payload}
        default:
            return state;
    }
}