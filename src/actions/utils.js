import axios from 'axios';
// and import via
import * as JWT from 'jwt-decode';
import _ from 'lodash';


import{
    BASE_URL,
   GET_OPERATORS,
   GET_LOGS,
   GET_CHANNEL_LOGS,
   GET_CURRENCY,
   DECODE_TOKEN,
   GET_PENDING_AUTHORIZATIONS,
   APPROVE_AUTHORIZATION,
   APPROVE_AUTHORIZATION_ERROR,
   GET_USERS,
   GET_USERS_ERROR,
   ADD_AFFILIATES_TO_USERS,
   ADD_AFFILIATES_TO_USERS_ERROR,
   REMOVE_AFFILIATE_FROM_USER,
   REMOVE_AFFILIATE_FROM_USER_ERROR,
   GET_LOGGED_IN_USER,
   GET_LOGGED_IN_USER_ERROR,
   USER_MGT_URL,
   ADD_AFFILIATE_TO_USER,
   ADD_AFFILIATE_TO_USER_ERROR,
   GET_SCHEME_STANDINGS,
   GET_SCHEME_STANDINGS_ERROR,
   GET_USER_AFFILIATES,
   GET_USER_AFFILIATES_ERROR,


} from './types';


export const fetchSchemeStanding = (scheme) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/schemes?scheme=${scheme}`
    }).then((response) =>{
        dispatch({
            type:GET_SCHEME_STANDINGS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_SCHEME_STANDINGS_ERROR,
            payload:err
        })
    })
}

export const addAffilaiteToUser =(values) => dispatch => {
    axios.post(`${BASE_URL}/users/add-affiliate`,values)
        .then((response)=>{
            dispatch({
                type:ADD_AFFILIATE_TO_USER,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:ADD_AFFILIATE_TO_USER_ERROR,
                payload:err
            });
        })
}

export const removeAffilaiteFromUser =(values) => dispatch => {
    axios.post(`${BASE_URL}/users/remove-affiliate`,values)
        .then((response)=>{
            dispatch({
                type:REMOVE_AFFILIATE_FROM_USER,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:REMOVE_AFFILIATE_FROM_USER_ERROR,
                payload:err
            });
        })
}

export const addAffiliatesToUsers = (values,email) => dispatch => {
    axios.post(`${BASE_URL}/users/${email}/add-affiliates`,values)
        .then((response)=>{
            dispatch({
                type:ADD_AFFILIATES_TO_USERS,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:ADD_AFFILIATES_TO_USERS_ERROR,
                payload:err
            });
        })
}

export const fetchUserAffiliates = (email) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/users/affiliates?login=${email}`  
    }).then(response => {
        dispatch({
            type:GET_USER_AFFILIATES,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_USER_AFFILIATES_ERROR,
            payload:err
        })
    })
}

export const fetchOperators = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/etc/operators`
    }).then((response) =>{
        dispatch({
            type:GET_OPERATORS,
            payload:response
        })
    })
}

export const fetchUsers = () => dispatch => {
    // axios({
    //     method:'GET',
    //     url:`${USER_MGT_URL}/auth-service/userapps`
    // }
    
    
    axios.get(`${USER_MGT_URL}/auth-service/userapps`,{
        headers: { 'Module': "SETTLEMENT"}
        
    }).then(response => {
        debugger
        dispatch({
            type:GET_USERS,
            payload:response
        })
    })
    .catch(err => {
        debugger
        dispatch({
            type:GET_USERS_ERROR,
            payload:err
        })
    })
}

export const fetchCurrencies = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/currencies`
    }).then((response) => {
        dispatch({
            type:GET_CURRENCY,
            payload:response
        })
    })
}

export const fetchLogs = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/admin/logs/processing`
    }).then((response) => {
        dispatch({
            type:GET_LOGS,
            payload:response
        })
    })
}

export const fetchLogsPaginated = (pageNumber) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/admin/logs/processing?page=${pageNumber}`
    }).then((response) => {
        dispatch({
            type:GET_LOGS,
            payload:response
        })
    })
}

export const fetchChannelLogs = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/admin/logs/channels`,
    }).then((response) =>{
        dispatch({
            type:GET_CHANNEL_LOGS,
            payload:response.data
        })
    })
}

export const fetchChannelLogsPaginated = (pageNumber) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/admin/logs/channels?page=${pageNumber}`,
    }).then((response) =>{
        dispatch({
            type:GET_CHANNEL_LOGS,
            payload:response.data
        })
    })
}

export const decodeToken = (token) => dispatch => {
    const decoded = JWT(token);
    console.log('Decoded Token is ',decoded);
    debugger;
    localStorage.setItem('decodedToken',JSON.stringify(decoded));
    dispatch({
        type:DECODE_TOKEN,
        payload:decoded
    })
}

export const getLoggedInUser = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/users`, 
    }).then(response => {
        
        localStorage.setItem('affiliates',JSON.stringify(response.data.affiliates));
        localStorage.setItem('selectedAfilliate',JSON.stringify(response.data.affiliates[0].code));
        dispatch({
            type:GET_LOGGED_IN_USER,
            payload:response
        })
    })
    .catch(err => {
        dispatch({
            type:GET_LOGGED_IN_USER_ERROR,
            payload:err
        })
    })
}

export const fetchPendingAuthorizations = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/todos`, 
    }).then(response => {
        dispatch({
            type:GET_PENDING_AUTHORIZATIONS,
            payload:response
        })
    })
}

export const approveAuthorization = (id,name) => dispatch => {
    axios.put(`${BASE_URL}/${name.toLowerCase()}?redisKey=${id}`,{})
        .then(response=>{
            response.data.redisId = id;
            dispatch({
                type:APPROVE_AUTHORIZATION,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:APPROVE_AUTHORIZATION_ERROR,
                payload:err.response.data
            })
    })
}

export const createLoadingSelector = (actions) => (state) => {
    //returns true only when all actions is not loading
    debugger;
    console.log(_(actions).some((action) => _.get(state,`api.loading.${action}`)));
    return _(actions).some((action) => _.get(state,`api.loading.${action}`));
}
