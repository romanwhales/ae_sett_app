import axios from 'axios';
import qs from 'qs';

import{
    BASE_URL,
    GET_FILE_DEFINITIONS,
    CREATE_FILE_DEFINITION,
    CREATE_FILE_DEFINITION_ERROR,
    GET_FILE_DEFINITION,
    UPDATE_FILE_DEFINITION,
    UPDATE_FILE_DEFINITION_ERROR,
    DELETE_FILE_DEFINITION
} from './types';


import {interceptor} from './interceptor';
interceptor();




export const fetchFileDefinitions = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/definitions`
    }).then((response) =>{
        dispatch({
            type:GET_FILE_DEFINITIONS,
            payload:response
        })
    })
}

export const fetchOneFileDefinition = (id) => dispatch =>{
    axios({
        method:'GET',
        url:`${BASE_URL}/definitions/${id}`
    }).then(response => {
        dispatch({
            type:GET_FILE_DEFINITION,
            payload:response
        })
    })
}

export const createFileDefinition = (values) => dispatch => {
    axios.post(`${BASE_URL}/definitions/`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_FILE_DEFINITION,
                payload:response
            })
        })
        .catch(err =>{
            debugger;
            dispatch({
                type:CREATE_FILE_DEFINITION_ERROR,
                payload:err
            });
        })
}

export const updateFileDefinition= (values,id) => dispatch => {
    axios.put(`${BASE_URL}/definitions/${id}`,values)
        .then((response) => {
            
            dispatch({
                type:UPDATE_FILE_DEFINITION,
                payload:response
            })
        })
        .catch((error)=>{
            dispatch({
                
                type:UPDATE_FILE_DEFINITION_ERROR,
                payload:error
            })
        })
}


export const deleteFileDefinition = (id) => dispatch => {
    axios.delete(`${BASE_URL}/definitions/${id}`,{}).
        then(response => {
            response.id = id;
            dispatch({
                type:DELETE_FILE_DEFINITION,
                payload:response
            })
        })
}