import { GET_OPERATORS,GET_LOGS,GET_CHANNEL_LOGS,GET_CURRENCY,DECODE_TOKEN,GET_PENDING_AUTHORIZATIONS,APPROVE_AUTHORIZATION,APPROVE_AUTHORIZATION_ERROR,GET_USERS,GET_USERS_ERROR,ADD_AFFILIATES_TO_USERS,ADD_AFFILIATES_TO_USERS_ERROR,GET_LOGGED_IN_USER,GET_LOGGED_IN_USER_ERROR,ADD_AFFILIATE_TO_USER,ADD_AFFILIATE_TO_USER_ERROR,REMOVE_AFFILIATE_FROM_USER_ERROR,REMOVE_AFFILIATE_FROM_USER,GET_SCHEME_STANDINGS,GET_SCHEME_STANDINGS_ERROR,GET_USER_AFFILIATES,GET_USER_AFFILIATES_ERROR} from '../actions/types';

export default function(state ={},action){
    switch(action.type){
        case GET_OPERATORS:
            return {...state,operators:action.payload}
        case GET_LOGS:
            return {...state,logs:action.payload}
        case GET_CHANNEL_LOGS:
            return {...state,channelLogs:action.payload}
        case GET_CURRENCY:
            return {...state,currencies:action.payload}
        case DECODE_TOKEN:
            return {...state,decodeToken:action.payload}
        case GET_USERS:
            return {...state,users:action.payload.data}
        case GET_USERS_ERROR:
            return {...state,usersError:action.payload}
        case ADD_AFFILIATES_TO_USERS:
            return {...state,addAffiliatesToUsers:action.payload}
        case ADD_AFFILIATES_TO_USERS_ERROR:
            return {...state,addAffiliatesToUsersError:action.payload}
        case GET_PENDING_AUTHORIZATIONS:
            return {...state,pendingAuthorizations:action.payload.data}
        case GET_LOGGED_IN_USER:
            return {...state,userDetail:action.payload}
        case GET_LOGGED_IN_USER_ERROR:
            return {...state,userDetailError:action.payload}
        case GET_USER_AFFILIATES:
            return {...state,userAffiliates:action.payload}
        case GET_USER_AFFILIATES_ERROR:
            return {...state,userAffiliatesError:action.payload}
        case ADD_AFFILIATE_TO_USER:
            return {...state,affiliateAddedToUser:action.payload}
        case ADD_AFFILIATE_TO_USER_ERROR:
            return {...state,affiliateAddedToUserError:action.payload}
        case REMOVE_AFFILIATE_FROM_USER:
            return {...state,affiliateRemovedFromUser:action.payload}
        case GET_SCHEME_STANDINGS:
            return {...state,schemeStandings:action.payload}
        case GET_SCHEME_STANDINGS_ERROR:
            return {...state,schemeStandingsError:action.payload}
        case REMOVE_AFFILIATE_FROM_USER_ERROR:
            return {...state,affiliateRemovedFromUserError:action.payload}
        case APPROVE_AUTHORIZATION:
            state.pendingAuthorizations.payload.forEach(item => console.log(item.id));
            const remainingAuthorizations = state.pendingAuthorizations.payload.filter(item => item.id !== action.payload.data.redisId);
            state.pendingAuthorizations.payload = remainingAuthorizations;
            return {...state,authorizationApproved:action.payload}
        case APPROVE_AUTHORIZATION_ERROR:
            return {...state,authorizationApprovedError:action.payload}
        default:
            return state;
    }
    
}