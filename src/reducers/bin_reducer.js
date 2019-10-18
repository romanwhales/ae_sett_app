import { GET_BINS,GET_BINS_ERROR,CREATE_BIN,CREATE_BIN_ERROR,GET_BIN,GET_BIN_ERROR,UPDATE_BIN,UPDATE_BIN_ERROR,DELETE_BIN,ADD_BINS_TO_AFFILIATE,ADD_BINS_TO_AFILIATE_ERROR,GET_BINS_UNPAGINATED,GET_BINS_UNPAGINATED_ERROR} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case GET_BINS:
            return {...state,binList:action.payload}
        case GET_BINS_UNPAGINATED:
            return {...state,binListUnpaginated:action.payload}
        case GET_BINS_UNPAGINATED_ERROR:
            return {...state,binListUnpaginatedError:action.payload}
        case GET_BINS_ERROR:
            return {...state,binListError:action.payload}
        case CREATE_BIN:
            state.binList.content.push(action.payload.data)
            return {...state,binCreated:action.payload}
        case CREATE_BIN_ERROR:
            return {...state,binCreatedError:action.payload}
        case DELETE_BIN:
            const remainingBins = state.binList.content.filter(item => item.id !== action.payload.id);
            state.binList.content = remainingBins;
            return {...state,binDeleted:action.payload}
        case ADD_BINS_TO_AFFILIATE:
            return {...state,binAddedToAffiliate:action.payload}
        case GET_BIN:
            return {...state,bin:action.payload}
        case UPDATE_BIN:
            let filtered_bin_data = state.binList.content.filter(item => item.id !== action.payload.data.id);
            filtered_bin_data.push(action.payload.data);
            state.binList.content = filtered_bin_data;
            return{...state,binUpdated:action.payload}
        default:
            return state;
    }
}