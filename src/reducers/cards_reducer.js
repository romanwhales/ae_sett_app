import { GET_CARDS,GET_CARDS_ERROR,GET_CARD,GET_CARD_ERROR,CREATE_CARD,CREATE_CARD_ERROR,UPDATE_CARD,UPDATE_CARD_ERROR,DELETE_CARD,DELETE_CARD_ERROR,GET_CARDS_UNPAGINATED,GET_CARDS_UNPAGINATED_ERROR} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case GET_CARDS:
            return {...state,cardList:action.payload}
        case GET_CARDS_UNPAGINATED:
            return {...state,cardListUnpaginated:action.payload}
        case GET_CARDS_UNPAGINATED_ERROR:
            return {...state,cardListUnpaginatedError:action.payload}
        case GET_CARDS_ERROR:
            return {...state,cardListError:action.payload}
        case CREATE_CARD:
            state.cardList.content.push(action.payload.data)
            return {...state,cardCreated:action.payload}
        case CREATE_CARD_ERROR:
            return {...state,cardCreatedError:action.payload}
        case DELETE_CARD:
            const remainingCards = state.cardList.content.filter(item => item.id !== action.payload.id);
            state.cardList.content = remainingCards;
            return {...state,cardDeleted:action.payload}
        case GET_CARD:
            return {...state,card:action.payload}
        case UPDATE_CARD:
            let filtered_card_data = state.cardList.content.filter(item => item.id !== action.payload.data.id);
            filtered_card_data.push(action.payload.data);
            state.cardList.content = filtered_card_data;
            return{...state,cardUpdated:action.payload}
        default:
            return state;
    }
}