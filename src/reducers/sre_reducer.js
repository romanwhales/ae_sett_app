import { GET_SRES,GET_SRES_ERROR,GET_SRE,GET_SRE_ERROR,CREATE_SRE,CREATE_SRE_ERROR,UPDATE_SRE,UPDATE_SRE_ERROR,DELETE_SRE,DELETE_SRE_ERROR,ADD_SRES_TO_AFFILIATE,ADD_SRES_TO_AFFILIATE_ERROR} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case GET_SRES:
            return {...state,sreList:action.payload}
        case GET_SRES_ERROR:
            return {...state,sreListError:action.payload}
        case CREATE_SRE:
            state.sreList.content.push(action.payload.data)
            return {...state,sreCreated:action.payload}
        case CREATE_SRE_ERROR:
            return {...state,sreCreatedError:action.payload}
        case DELETE_SRE:
            const remainingSres = state.sreList.content.filter(item => item.id !== action.payload.id);
            state.sreList.content = remainingSres;
            return {...state,sreDeleted:action.payload}
        case GET_SRE:
            return {...state,sre:action.payload}
        case ADD_SRES_TO_AFFILIATE:
            return {...state,sreAddedToAffiliate:action.payload}
        case ADD_SRES_TO_AFFILIATE_ERROR:
            return {...state,sreAddedToAffiliateError:action.payload}
        case UPDATE_SRE:
            let filtered_sre_data = state.sreList.content.filter(item => item.id !== action.payload.data.id);
            filtered_sre_data.push(action.payload.data);
            state.sreList.content = filtered_sre_data;
            return{...state,sreUpdated:action.payload}
        case UPDATE_SRE_ERROR:
            return {...state,sreUpdateError:action.payload}
        default:
            return state;
    }
}