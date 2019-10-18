import {GET_EXCEPTION_DEFINITIONS,CREATE_EXCEPTION_DEFINITION,GET_EXCEPTION_DEFINITION,GET_PROCESSOR_EXCEPTION_BYDATE,UPDATE_EXCEPTION_DEFINITION,GET_PROCESSOR_CHANNEL_EXCEPTION_BYDATE,GET_CHANNEL_ROWS,CREATE_EXCEPTION_DEFINITION_ERROR,POST_CUSTOMER_EXCEPTION,ALL_EXCEPTION_DEFINITIONS,POST_MULTIPLE_CUSTOMER_EXCEPTION} from '../actions/types';

export default function(state ={},action){
    switch(action.type){
        case GET_EXCEPTION_DEFINITION:
            return {...state,singleExceptionDefinition:action.payload}
        case GET_EXCEPTION_DEFINITIONS:
            return {...state,exceptionDefinitionList:action.payload}
        case CREATE_EXCEPTION_DEFINITION:
            return {...state,exceptionDefinitionCreated:action.payload}
        case CREATE_EXCEPTION_DEFINITION_ERROR:
            return {...state,exceptionDefinitionCreatedError:action.payload}
        case GET_PROCESSOR_EXCEPTION_BYDATE:
            return {...state,exceptionDefinitonListPerDate:action.payload}
        case UPDATE_EXCEPTION_DEFINITION:
            return {...state,exceptionDefinitionUpdated:action.payload}
        case GET_PROCESSOR_CHANNEL_EXCEPTION_BYDATE:
            return {...state,exceptionChannelList:action.payload}
        case GET_CHANNEL_ROWS:
            return {...state,exceptionRows:action.payload}
        case POST_CUSTOMER_EXCEPTION:
            return {...state,exceptionPosted:action.payload}
        case ALL_EXCEPTION_DEFINITIONS:
            return {...state,allExceptionDefinitions:action.payload}
        case POST_MULTIPLE_CUSTOMER_EXCEPTION:
            return {...state,exceptionsPosted:action.payload}
        default:
            return state;
    }
    
}