import axios from 'axios';
import{
    BASE_URL,
    GET_SRES,
    GET_SRES_ERROR,
    GET_SRE,
    GET_SRE_ERROR,
    CREATE_SRE,
    CREATE_SRE_ERROR,
    UPDATE_SRE,
    UPDATE_SRE_ERROR,
    GET_SRES_UNPAGINATED,
    GET_SRES_UNPAGINATED_ERROR

} from './types';


import {interceptor} from './interceptor';
interceptor();

export const createSre = (values) => dispatch => {
    axios.post(`${BASE_URL}/sre`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_SRE,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_SRE_ERROR,
                payload:err.response
            });
        })
}


export const fetchSres = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/sre?all`
    }).then((response) =>{
        dispatch({
            type:GET_SRES_UNPAGINATED,
            payload:response
        })
    })
    .catch(err => {
        dispatch({
            type:GET_SRES_UNPAGINATED_ERROR,
            payload:err
        })
    })
}

export const fetchSresPaginated = (pageNumber) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/sre?page=${pageNumber}&size=20`
    }).then((response) =>{
        dispatch({
            type:GET_SRES,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_SRES_ERROR,
            payload:err
        })
    })
}

export const fetchSre =(id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/sre/${id}`
    }).then(response => {
        dispatch({
            type:GET_SRE,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_SRE_ERROR,
            payload:err
        })
    })
}

export const updateSre= (values) => dispatch => {
    
    let id = values.affiliate.code;
    axios.put(`${BASE_URL}/sre/${id}`,values)
        .then((response) => {
            dispatch({
                type:UPDATE_SRE,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_SRE_ERROR,
                payload:err
            })
        })
}
