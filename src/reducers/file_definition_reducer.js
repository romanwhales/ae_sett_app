import { CREATE_FILE_DEFINITION,GET_FILE_DEFINITIONS,GET_FILE_DEFINITION,UPDATE_FILE_DEFINITION,UPDATE_FILE_DEFINITION_ERROR,DELETE_FILE_DEFINITION,CREATE_FILE_DEFINITION_ERROR} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case CREATE_FILE_DEFINITION:
            return {...state,fileDefinitionCreated:action.payload}
        case GET_FILE_DEFINITIONS:
            return {...state,fileDefinitionList:action.payload}
        case GET_FILE_DEFINITION:
            return {...state,fileDefinition:action.payload.data}
        case UPDATE_FILE_DEFINITION:
            return {...state,fileDefinitionUpdated:action.payload}
        case UPDATE_FILE_DEFINITION_ERROR:
            return {...state,fileDefinitionUpdatedError:action.payload}
        case CREATE_FILE_DEFINITION_ERROR:
            return {...state,fileDefinitionCreatedError:action.payload.response.data}
        case DELETE_FILE_DEFINITION:
            const remainingFileDefinitions = state.fileDefinitionList.data.filter(item => item.id !== action.payload.id);
            state.fileDefinitionList.data = remainingFileDefinitions;
            return {...state,fileDefinitionDeleted:action.payload}
        default:
            return state;
    }
}