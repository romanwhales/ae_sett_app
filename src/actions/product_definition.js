import axios from 'axios';

import{
   BASE_URL,
   CREATE_PRODUCT_DEFINITIONS,
   CREATE_PRODUCT_DEFINITIONS_ERROR,
   GET_PRODUCT_DEFINITIONS,
   DELETE_PRODUCT_DEFINITION,
   UPDATE_PRODUCT_DEFINITION,
   UPDATE_PRODUCT_DEFINITION_ERROR,
   GET_PRODUCT_DEFINITIONS_DETAILS
} from './types';

import {interceptor} from './interceptor';
interceptor();


export const createProductDefinitions = (values,id) => dispatch => {
    axios.post(`${BASE_URL}/accounts/${id}/definitions`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_PRODUCT_DEFINITIONS,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_PRODUCT_DEFINITIONS_ERROR,
                payload:err
            });
        })
}

export const fetchProductDefinitions = (id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/accounts/${id}/definitions`
    }).then((response) =>{
        dispatch({
            type:GET_PRODUCT_DEFINITIONS,
            payload:response
        })
    })
}

export const deleteProductDefinition = (id) => dispatch => {
    axios.delete(`${BASE_URL}/accounts/definitions/${id}`,{}).then(response => {
            if(response.status === 200){
                response.data = "Product Definition Deleted Successfully!";
                response.id = id
                dispatch({
                    type:DELETE_PRODUCT_DEFINITION,
                    payload:response
                })
            }
            
        })
}

export const updateProductDefinition = (value,id) => dispatch => {
    axios.put(`${BASE_URL}/definitions/${id}`,value).then(response=>{
            dispatch({
                type:UPDATE_PRODUCT_DEFINITION,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_PRODUCT_DEFINITION_ERROR,
                payload:err.response.data
            })
        })
}

export const viewProductDefinitionsDetails = (id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/accounts/definitions/${id}`
    }).then((response) =>{
        dispatch({
            type:GET_PRODUCT_DEFINITIONS_DETAILS,
            payload:response
        })
    })
}


