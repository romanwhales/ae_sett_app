import {CREATE_PROCESSOR,CREATE_PROCESSOR_ERROR,GET_PROCESSORS,GET_PROCESSOR,CREATE_SUBGROUP,GET_PROCESSOR_SUBGROUPS,DELETE_PROCESSOR,UPDATE_PROCESSOR,CREATE_PRODUCT,CREATE_PRODUCT_ERROR,UPDATE_PROCESSOR_ERROR, CREATE_SUBGROUP_ERROR,GET_PROCESSORS_BYDATE,GET_SUBGROUP,UPDATE_SUBGROUP,GET_PROCESSORS_FILESET,GET_PROCESSORS_FILESET_ERROR} from '../actions/types';

export default function(state ={},action){
    switch(action.type){
        case CREATE_PROCESSOR:
            
            state.processors.push(action.payload.data);
            return {...state,processorCreated:action.payload}
        case CREATE_PROCESSOR_ERROR:
            return {...state,createProcessorError:action.payload}
        case UPDATE_PROCESSOR_ERROR:
            return {...state,updateProcessorError:action.payload}
        case GET_PROCESSORS:
            return {...state,processors:action.payload}
        case GET_PROCESSORS_FILESET:
            return {...state,processorFileSet:action.payload.data}
        case GET_PROCESSORS_FILESET_ERROR:
            return {...state,processorFileSetError:action.payload}
        case GET_PROCESSOR:
            return {...state,processor:action.payload.data}
        case GET_SUBGROUP:
            return {...state,subGroup:action.payload.data}
        case CREATE_SUBGROUP:
            state.subGroups.push(action.payload.data);
            return {...state,subGroupCreated:action.payload}
        case CREATE_SUBGROUP_ERROR:
            return {...state,createSubGroupError:action.payload}
        case GET_PROCESSOR_SUBGROUPS:
            return {...state,subGroups:action.payload.data}
        case UPDATE_PROCESSOR: 
            let filtered_data = state.processors.data.filter(item => item.id !== action.payload.data.id);
            filtered_data.push(action.payload.data);
            state.processors.data = filtered_data;
            return {...state,updatedProcessor:action.payload}
        case UPDATE_SUBGROUP:
            let filtered_subGroup_data = state.subGroups.filter(item => item.id !== action.payload.data.id);
            filtered_subGroup_data.push(action.payload.data);
            state.subGroups = filtered_subGroup_data;
            return{...state,updatedSubGroup:action.payload}
        case DELETE_PROCESSOR:
            return {...state,deletedProcessor:action.payload}
        case CREATE_PRODUCT:
            return {...state,createdProduct:action.payload}
        case CREATE_PRODUCT_ERROR:
            return {...state,createProductError:action.payload}
        case GET_PROCESSORS_BYDATE:
            return {...state,processorsByDate:action.payload}
        default:
            return state;
    }
}