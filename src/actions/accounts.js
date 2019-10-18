import axios from 'axios';
import qs from 'qs';

import{
    BASE_URL,
    GET_ACCOUNTS,
    CREATE_ACCOUNT,
    CREATE_ACCOUNT_ERROR,
    DELETE_ACCOUNT,
    GET_ACCOUNT,
    UPDATE_ACCOUNT,
    ACCOUNTS_BYDATE,
    GET_ACCOUNTS_ERROR
} from './types';

import {interceptor} from './interceptor';
interceptor();

export const fetchAccounts = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/accounts`
    }).then((response) =>{
        dispatch({
            type:GET_ACCOUNTS,
            payload:response
        })
    })
    .catch(err => {
        dispatch({
            type:GET_ACCOUNTS_ERROR,
            payload:err.response
        })
    })
}

export const getAccountsbyDateRange = (startDate,endDate) => dispatch => {
    if(startDate && endDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/accounts?createdDate&date=${startDate}&endDate=${endDate}`
        }).then((response) =>{
            dispatch({
                type:ACCOUNTS_BYDATE,
                payload:response
            })
        })
    }else if(startDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/accounts?createdDate&date=${startDate}`
        }).then((response) =>{
            dispatch({
                type:ACCOUNTS_BYDATE,
                payload:response
            })
        })
    }
}

export const createAccount = (values,id) => dispatch => {
    axios.post(`${BASE_URL}/accounts/${id}`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_ACCOUNT,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_ACCOUNT_ERROR,
                payload:err
            });
        })
}

export const deleteAccount = (id) => dispatch => {
    axios.delete(`${BASE_URL}/accounts/${id}`,{}).
        then(response => {
            response.id = id;
            dispatch({
                type:DELETE_ACCOUNT,
                payload:response
            })
        })
}

export const fetchOneAccount =(id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/accounts/${id}`
    }).then(response => {
        dispatch({
            type:GET_ACCOUNT,
            payload:response.data
        })
    })
}

export const updateAccount= (values,productId,accountId) => dispatch => {
    axios.put(`${BASE_URL}/accounts/${productId}/${accountId}`,values)
        .then((response) => {
            dispatch({
                type:UPDATE_ACCOUNT,
                payload:response
            })
        })
}