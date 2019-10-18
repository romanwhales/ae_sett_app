import { CREATE_TEMPLATE,DELETE_TEMPLATE,UPDATE_TEMPLATE,GET_TEMPLATES} from '../actions/types';

export default function(state ={},action){
    switch(action.type){
        case CREATE_TEMPLATE:
            return {...state,templateFileCreated:action.payload}
        case GET_TEMPLATES:
            return {...state,fileTemplateLists:action.payload}
         case DELETE_TEMPLATE:
            const fileTemplateData = state.fileTemplateLists.data.filter(item => item.id !== action.payload.id);
            state.fileTemplateLists.data = fileTemplateData;
            return {...state,fileTemplateDeleted:action.payload}
        case UPDATE_TEMPLATE:
            return {...state,fileTemplateUpdated:action.payload}
        default:
            return state;
    }
    
}