import { GET_PRODUCTS,CREATE_PRODUCT_ERROR,GET_PRODUCT,UPDATE_PRODUCT,DELETE_PRODUCT,GET_PRODUCT_ACCOUNTS,GET_PRODUCTS_BYDATE,CREATE_PRODUCT,GET_PRODUCTS_ERROR} from '../actions/types';

export default function(state ={},action){
    switch(action.type){
        case GET_PRODUCTS:
            debugger;
            return {...state,products:action.payload}
        case CREATE_PRODUCT:
            debugger;
            return {...state,productCreated:action.payload}
        case CREATE_PRODUCT_ERROR:
        
            return {...state,productCreatedError:action.payload.data}  
        case GET_PRODUCTS_ERROR:
            return {...state,productsError:action.payload}
        case GET_PRODUCT:
            return {...state,product:action.payload}
        case UPDATE_PRODUCT:
            return {...state,productUpdated:action.payload}
        case GET_PRODUCT_ACCOUNTS:
            return {...state,productAccounts:action.payload}
        case GET_PRODUCTS_BYDATE:
            return {...state,productDateRange:action.payload}
        case DELETE_PRODUCT:
            const productDefinitionData = state.products.data.filter(item => item.id !== action.payload.id);
            state.products.data = productDefinitionData;
            return {...state,productDeleted:action.payload}
        default:
            return state;
    }
    
}
