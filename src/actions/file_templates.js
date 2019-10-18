import axios from 'axios';
import qs from 'qs';

import{
    BASE_URL,
    GET_TEMPLATES,
    CREATE_TEMPLATE,
    DELETE_TEMPLATE,
    UPDATE_TEMPLATE,
    

} from './types';

import {interceptor} from './interceptor';
interceptor();



export const createFileTemplate = (values) => dispatch => {
    axios.post(`${BASE_URL}/admin/templates`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_TEMPLATE,
                payload:response
            })
        })
        // .catch(err =>{
        //     dispatch({
        //         type:CREATE_PRODUCT_ERROR,
        //         payload:err
        //     });
        // })
}

export const updateFileTemplate = (values,id) => dispatch => {
    axios.put(`${BASE_URL}/admin/templates/${id}`,values)
        .then((response) => {
            dispatch({
                type:UPDATE_TEMPLATE,
                payload:response
            })
        })
}

export const fetchFileTemplates = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/admin/templates`
    }).then((response) =>{
        dispatch({
            type:GET_TEMPLATES,
            payload:response
        })
    })
}

export const deleteFileTemplate = (id) => dispatch => {
    axios.delete(`${BASE_URL}/admin/templates/${id}`,{}).
        then(response => {
            if(response.status == 200){
                response.data = "File Template Deleted Successfully!";
                response.id = id;
                dispatch({
                    type:DELETE_TEMPLATE,
                    payload:response
                })
            }
        })
}