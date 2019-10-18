import { GET_BANKS, GET_BANKS_ERROR, CREATE_BANK,CREATE_BANK_ERROR,GET_BANK,GET_BANK_ERROR,UPDATE_BANK,UPDATE_BANK_ERROR,DELETE_BANK,GET_BANK_CARDS,GET_BANK_CARDS_ERROR,ADD_CARDS_TO_BANK,ADD_CARDS_TO_BANK_ERROR,GET_BANKS_UNPAGINATED,GET_BANKS_UNPAGINATED_ERROR} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case GET_BANKS:
            return {...state,bankList:action.payload}
        case GET_BANKS_UNPAGINATED:
            return {...state,bankListUnpaginated:action.payload}
        case GET_BANKS_UNPAGINATED_ERROR:
            return {...state,bankListUnpaginatedError:action.payload}
        case GET_BANKS_ERROR:
            return {...state,bankListError:action.payload}
        case CREATE_BANK:
            state.bankList.content.push(action.payload.data)
            return {...state,bankCreated:action.payload}
        case CREATE_BANK_ERROR:
            return {...state,bankCreatedError:action.payload}
        case DELETE_BANK:
            const remainingAccounts = state.accountList.content.filter(item => item.id !== action.payload.id);
            state.accountList.content = remainingAccounts;
            return {...state,accountDeleted:action.payload}
        case GET_BANK:
            return {...state,bank:action.payload}
        case GET_BANK_CARDS:
            return {...state,bankCards:action.payload}
        case GET_BANK_CARDS_ERROR:
            return {...state,bankCardsError:action.payload}
        case ADD_CARDS_TO_BANK:
            return {...state,cardsAddedToBank:action.payload}
        case ADD_CARDS_TO_BANK_ERROR:
            return {...state,cardsAddedToBankError:action.payload}
        case UPDATE_BANK:
            let filtered_account_data = state.bankList.content.filter(item => item.id !== action.payload.data.id);
            filtered_account_data.push(action.payload.data);
            state.bankList.content = filtered_account_data;
            return{...state,bankUpdated:action.payload}
        default:
            return state;
    }
}