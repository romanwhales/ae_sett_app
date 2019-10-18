import { CREATE_PRODUCT_DEFINITIONS,CREATE_PRODUCT_DEFINITIONS_ERROR,GET_PRODUCT_DEFINITIONS,DELETE_PRODUCT_DEFINITION,UPDATE_PRODUCT_DEFINITION,UPDATE_PRODUCT_DEFINITION_ERROR,GET_PRODUCT_DEFINITIONS_DETAILS} from '../actions/types';

export default function(state ={},action){
    switch(action.type){
        case CREATE_PRODUCT_DEFINITIONS:
            return {...state,productDefinitonCreated:action.payload}
        case GET_PRODUCT_DEFINITIONS:
            return {...state,productDefinitions:action.payload}
        case DELETE_PRODUCT_DEFINITION:
            const productDefinitionData = state.productDefinitions.data.filter(item => item.id !== action.payload.id);
            state.productDefinitions.data = productDefinitionData;
            return {...state,productDefinitionDeleted:action.payload}
        case UPDATE_PRODUCT_DEFINITION:
            return {...state,productDefinitionUpdated:action.payload}
        case UPDATE_PRODUCT_DEFINITION_ERROR:
            return {...state,productDefinitionError:action.payload}
        case GET_PRODUCT_DEFINITIONS_DETAILS:
            return {...state,productDefinitionDetails:action.payload.data}
        case CREATE_PRODUCT_DEFINITIONS_ERROR:
            debugger;
            return {...state,productDefinitionCreationError:action.payload.response.data}
            
        default:
            return state;
    }
    
}