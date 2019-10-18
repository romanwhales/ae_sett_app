import axios from 'axios';
import qs from 'qs';

import{
    BASE_URL,
    CREATE_PRODUCT,
    CREATE_PRODUCT_ERROR,
    GET_PRODUCTS,
    GET_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCT_ACCOUNTS,
    GET_PRODUCTS_BYDATE,
    GET_PRODUCTS_ERROR

} from './types';

import {interceptor} from './interceptor';
interceptor();



export const createProduct = (values,id) => dispatch => {
    
    axios.post(`${BASE_URL}/products/${id}`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_PRODUCT,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_PRODUCT_ERROR,
                payload:err.response
            });
        })
}

export const updateProduct = (values,subgroupId,productId) => dispatch => {
    axios.put(`${BASE_URL}/products/${subgroupId}/${productId}`,values)
        .then((response) => {
            dispatch({
                type:UPDATE_PRODUCT,
                payload:response
            })
        })
}

export const fetchProducts = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/products`
    }).then((response) =>{
        // console.log('Response is ',response)
       
        dispatch({
            type:GET_PRODUCTS,
            payload:response
        })
    })
    .catch(error => {
        dispatch({
            type:GET_PRODUCTS_ERROR,
            payload:error.response
        })
    })
}


export const fetchProductsbyDateRange = (startDate,endDate) => dispatch => {
    if(startDate && endDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/products?createdDate&date=${startDate}&endDate=${endDate}`
        }).then((response) =>{
            dispatch({
                type:GET_PRODUCTS_BYDATE,
                payload:response
            })
        })
    }else if(startDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/products?createdDate&date=${startDate}`
        }).then((response) =>{
            dispatch({
                type:GET_PRODUCTS_BYDATE,
                payload:response
            })
        })
    }
}

export const getProduct =(id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/products/${id}`
    }).then(response => {
        dispatch({
            type:GET_PRODUCT,
            payload:response.data
        })
    })
}

export const deleteProduct = (id) => dispatch => {
    axios.delete(`${BASE_URL}/products/${id}`,{}).
        then(response => {
            if(response.status == 200){
                response.data = "Product Deleted Successfully!";
                response.id = id;
                dispatch({
                    type:DELETE_PRODUCT,
                    payload:response
                })
            }
        })
}

export const getProductAccounts = (id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/products/${id}`
    }).then(response => {
        dispatch({
            type:GET_PRODUCT_ACCOUNTS,
            payload:response.data
        })
    })
}
