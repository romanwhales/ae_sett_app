import axios from 'axios';
import{
    BASE_URL,
    GET_BINS,
    GET_BINS_ERROR,
    GET_BIN,
    GET_BIN_ERROR,
    UPDATE_BIN,
    UPDATE_BIN_ERROR,
    DELETE_BIN,
    DELETE_BIN_ERROR,
    CREATE_BIN,
    CREATE_BIN_ERROR,
    GET_BINS_UNPAGINATED,
    GET_BINS_UNPAGINATED_ERROR

} from './types';


import {interceptor} from './interceptor';
interceptor();

export const createBin = (values) => dispatch => {
    axios.post(`${BASE_URL}/bins`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_BIN,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_BIN_ERROR,
                payload:err
            });
        })
}


export const fetchBins = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/bins`
    }).then((response) =>{
        dispatch({
            type:GET_BINS_UNPAGINATED,
            payload:response
        })
    })
    .catch(err => {
        dispatch({
            type:GET_BINS_UNPAGINATED_ERROR,
            payload:err
        })
    })
}

export const fetchBinsPaginated = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/bins`
    }).then((response) =>{
        dispatch({
            type:GET_BINS,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_BINS_ERROR,
            payload:err
        })
    })
}

export const fetchBin =(id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/bins/${id}`
    }).then(response => {
        dispatch({
            type:GET_BIN,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_BIN_ERROR,
            payload:err
        })
    })
}

export const updateBin= (values) => dispatch => {
    let {id} = values
    axios.put(`${BASE_URL}/bins/${id}`,values)
        .then((response) => {
            dispatch({
                type:UPDATE_BIN,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_BIN_ERROR,
                payload:err
            })
        })
}
