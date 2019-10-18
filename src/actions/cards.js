import axios from 'axios';
import{
    BASE_URL,
    GET_CARDS,
    GET_CARDS_ERROR,
    GET_CARD,
    GET_CARD_ERROR,
    CREATE_CARD,
    CREATE_CARD_ERROR,
    UPDATE_CARD,
    UPDATE_CARD_ERROR,
    GET_CARDS_UNPAGINATED,
    GET_CARDS_UNPAGINATED_ERROR
} from './types';


import {interceptor} from './interceptor';
interceptor();

export const createCard = (values) => dispatch => {
    axios.post(`${BASE_URL}/cards`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_CARD,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_CARD_ERROR,
                payload:err
            });
        })
}


export const fetchCardsPaginated = (pageNumber) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/cards?page=${pageNumber}&size=20`
    }).then((response) =>{
        dispatch({
            type:GET_CARDS,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_CARDS_ERROR,
            payload:err
        })
    })
}


export const fetchCards = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/cards?all`
    }).then((response) =>{
        dispatch({
            type:GET_CARDS_UNPAGINATED,
            payload:response
        })
    })
    .catch(err => {
        dispatch({
            type:GET_CARDS_UNPAGINATED_ERROR,
            payload:err
        })
    })
}

export const fetchCard =(id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/cards/${id}`
    }).then(response => {
        dispatch({
            type:GET_CARD,
            payload:response.data
        })
    })
    .catch(err => {
        dispatch({
            type:GET_CARD_ERROR,
            payload:err
        })
    })
}

export const updateCard= (values) => dispatch => {
    let {id} = values
    axios.put(`${BASE_URL}/cards/${id}`,values)
        .then((response) => {
            dispatch({
                type:UPDATE_CARD,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_CARD_ERROR,
                payload:err
            })
        })
}
