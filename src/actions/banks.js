import axios from 'axios';
import{
    BASE_URL,
    GET_BANKS,
    GET_BANKS_ERROR,
    GET_BANK,
    GET_BANK_ERROR,
    CREATE_BANK,
    CREATE_BANK_ERROR,
    UPDATE_BANK,
    UPDATE_BANK_ERROR,
    GET_BANK_CARDS,
    GET_BANK_CARDS_ERROR,
    ADD_CARDS_TO_BANK,
    ADD_CARDS_TO_BANK_ERROR,
    GET_BANKS_UNPAGINATED,
    GET_BANKS_UNPAGINATED_ERROR

} from './types';


import {interceptor} from './interceptor';
interceptor();

export const createBank = (values) => dispatch => {
    axios.post(`${BASE_URL}/banks`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_BANK,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_BANK_ERROR,
                payload:err
            });
        })
}


export const fetchBanks = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/banks?all`
    }).then((response) =>{
        dispatch({
            type:GET_BANKS_UNPAGINATED,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_BANKS_UNPAGINATED_ERROR,
            payload:err
        })
    })
}

export const fetchBanksPaginated = (pageNumber) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/banks?page=${pageNumber}&size=20`
    }).then((response) =>{
        dispatch({
            type:GET_BANKS,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_BANKS_ERROR,
            payload:err
        })
    })
}

export const fetchBankCards = (id,pageNumber) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/banks/${id}/cards?size=20&page=${pageNumber}`
    }).then((response) =>{
        dispatch({
            type:GET_BANK_CARDS,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_BANK_CARDS_ERROR,
            payload:err
        })
    })
}

export const fetchOneBank =(code) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/banks/${code}`
    }).then(response => {
        dispatch({
            type:GET_BANK,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_BANK_ERROR,
            payload:err
        })
    })
}

export const updateBank= (values,code) => dispatch => {
    // let {code} = values
    axios.put(`${BASE_URL}/banks/${code}`,values)
        .then((response) => {
            dispatch({
                type:UPDATE_BANK,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_BANK_ERROR,
                payload:err
            })
        })
}


export const addCardsToBank = (values,id) => dispatch => {
    axios.post(`${BASE_URL}/banks/${id}/cards`,values)
        .then((response)=>{
            dispatch({
                type:ADD_CARDS_TO_BANK,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:ADD_CARDS_TO_BANK_ERROR,
                payload:err
            });
        })
}
