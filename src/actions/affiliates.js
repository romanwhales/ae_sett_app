import axios from 'axios';
import{
    BASE_URL,
    GET_AFFILIATES,
    GET_AFFILIATES_ERROR,
    GET_AFFILIATE,
    GET_AFFILIATE_ERROR,
    UPDATE_AFFILIATE,
    UPDATE_AFFILIATE_ERROR,
    CREATE_AFFILIATE,
    CREATE_AFFILIATE_ERROR,
    DELETE_AFFILIATE,
    DELETE_AFFILIATE_ERROR,
    GET_AFFILIATE_BINS,
    GET_AFFILIATE_BINS_ERROR,
    ADD_BINS_TO_AFFILIATE,
    ADD_BINS_TO_AFILIATE_ERROR,
    ADD_SRES_TO_AFFILIATE,
    ADD_SRES_TO_AFFILIATE_ERROR,
    GET_AFFILIATES_SRES,
    GET_AFFILIATES_SRES_ERROR,
    GET_AFFILIATES_UNPAGINATED,
    GET_AFFILIATES_UNPAGINATED_ERROR,
    GET_AFFILIATE_PRODUCT_ACCOUNTS,
    GET_AFFILIATE_PRODUCT_ACCOUNTS_ERROR,
    GET_AFFILIATE_PROCESSOR_ACCOUNTS,
    GET_AFFILIATE_PROCESSOR_ACCOUNTS_ERROR,
    UPDATE_AFFILIATE_PROCESSOR_ACCOUNT,
    UPDATE_AFFILIATE_PROCESSOR_ACCOUNT_ERROR,
    UPDATE_AFFILIATE_PRODUCT_ACCOUNT,
    UPDATE_AFFILIATE_PRODUCT_ACCOUNT_ERROR,
    UPDATE_AFFILIATE_SRE,
    UPDATE_AFFILIATE_SRE_ERROR

} from './types';

// import * as TYPES from './types';

// TYPES.CREATE_ACCOUNT


import {interceptor} from './interceptor';
interceptor();

export const createAffiliate = (values) => dispatch => {
    axios.post(`${BASE_URL}/affiliates`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_AFFILIATE,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_AFFILIATE_ERROR,
                payload:err
            });
        })
}


export const fetchAffiliatesPaginated = (pageNumber) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/affiliates?page=${pageNumber}&size=20`
    }).then((response) =>{
        dispatch({
            type:GET_AFFILIATES,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_AFFILIATES_ERROR,
            payload:err
        })
    })
}

export const fetchAffiliates = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/affiliates?all`
    }).then((response) =>{
        dispatch({
            type:GET_AFFILIATES_UNPAGINATED,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_AFFILIATES_UNPAGINATED_ERROR,
            payload:err
        })
    })
}

export const fetchAffiliateProductAccounts = (code) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/affiliates/${code}/product-accounts`
    }).then(response => {
        dispatch({
            type:GET_AFFILIATE_PRODUCT_ACCOUNTS,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_AFFILIATE_PRODUCT_ACCOUNTS_ERROR,
            payload:err
        })
    })
}

export const fetchAffiliateProcessorAccounts = (code) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/affiliates/${code}/processor-accounts`
    }).then(response => {
        dispatch({
            type:GET_AFFILIATE_PROCESSOR_ACCOUNTS,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_AFFILIATE_PROCESSOR_ACCOUNTS_ERROR,
            payload:err
        })
    })
}

export const fetchAffiliate =(code) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/affiliates/${code}?noProducts`
    }).then(response => {
        
        dispatch({
            
            type:GET_AFFILIATE,
            payload:response.data
        })
    })
    .catch(err => {
       
        dispatch({
            type:GET_AFFILIATE_ERROR,
            payload:err
        })
    })
}

export const fetchAffiliateBins =(id,pageNumber) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/affiliates/${id}/bins?page=${pageNumber}&size=20`
    }).then(response => {
        debugger;
        dispatch({
            type:GET_AFFILIATE_BINS,
            payload:response.data
        })
    })
    .catch(err => {
        debugger;
        dispatch({
            type:GET_AFFILIATE_BINS_ERROR,
            payload:err
        })
    })
}

export const fetchAffiliateSres =(id,pageNumber) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/affiliates/${id}/sres?page=${pageNumber}&size=20`
    }).then(response => {
        dispatch({
            type:GET_AFFILIATES_SRES,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_AFFILIATES_SRES_ERROR,
            payload:err
        })
    })
}

export const updateAffiliate= (values) => dispatch => {
    let {code} = values
    
    axios.put(`${BASE_URL}/affiliates/${code}`,values)
        .then((response) => {
            
            dispatch({
                type:UPDATE_AFFILIATE,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_AFFILIATE_ERROR,
                payload:err
            })
        })
}


export const updateAffiliateProductAccount = (values,code,productId) => dispatch => {
    // let {id} = values
    axios.put(`${BASE_URL}/affiliates/${code}/product-accounts/${productId}`,values)
        .then((response) => {
            response.data = {}
            response.data.productId = productId;
            response.data.productName = values.productName;
            response.data.treatAs = values.treatAs;
            response.data.accountNo = values.accountNo;
            dispatch({
                type:UPDATE_AFFILIATE_PRODUCT_ACCOUNT,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_AFFILIATE_PRODUCT_ACCOUNT_ERROR,
                payload:err
            })
        })
}

export const updateAffiliateProcessorAccount = (values,code,processorId) => dispatch => {
    // let {id} = values
    axios.put(`${BASE_URL}/affiliates/${code}/processor-accounts/${processorId}`,values)
        .then((response) => {
            response.data = {}
            response.data.processorId = processorId;
            response.data.accountType = values.accountType;
            response.data.accountNo = values.accountNo;
            response.data.processorName = values.processorName;
            dispatch({
                type:UPDATE_AFFILIATE_PROCESSOR_ACCOUNT,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_AFFILIATE_PROCESSOR_ACCOUNT_ERROR,
                payload:err
            })
        })
}


export const addBinsToAffiliate = (values,id) => dispatch => {
    axios.post(`${BASE_URL}/affiliates/${id}/bins`,values)
        .then((response)=>{
            dispatch({
                type:ADD_BINS_TO_AFFILIATE,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:ADD_BINS_TO_AFILIATE_ERROR,
                payload:err
            });
        })
}

export const addSresToAffiliate = (values,id) => dispatch => {
    axios.post(`${BASE_URL}/affiliates/${id}/sres`,values)
        .then((response)=>{
            dispatch({
                type:ADD_SRES_TO_AFFILIATE,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:ADD_SRES_TO_AFFILIATE_ERROR,
                payload:err
            });
        })
}

