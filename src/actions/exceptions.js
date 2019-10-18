import axios from 'axios';
import qs from 'qs';

import{
    BASE_URL,
    GET_EXCEPTION_DEFINITIONS,
    CREATE_EXCEPTION_DEFINITION,
    CREATE_EXCEPTION_DEFINITION_ERROR,
    GET_EXCEPTION_DEFINITION,
    UPDATE_EXCEPTION_DEFINITION,
    GET_PROCESSOR_EXCEPTION_BYDATE,
    GET_PROCESSOR_CHANNEL_EXCEPTION_BYDATE,
    GET_CHANNEL_ROWS,
    POST_CUSTOMER_EXCEPTION,
    ALL_EXCEPTION_DEFINITIONS,
    POST_MULTIPLE_CUSTOMER_EXCEPTION
} from './types';

import {interceptor} from './interceptor';
interceptor();




export const fetchAllExceptionDefinitions = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/processors/exceptions/definitions`
    })
    .then(response =>{
        dispatch({
            type:ALL_EXCEPTION_DEFINITIONS,
            payload:response.data
        })
    })
}
export const fetchExceptionDefinition = (id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/processors/definitions/${id}`
    })
    .then(response =>{
        dispatch({
            type:GET_EXCEPTION_DEFINITION,
            payload:response.data
        })
    })
}

export const fetchExceptionDefinitions = (date,processorId) => dispatch => {
    if(date && !processorId){
        debugger;
        axios({
            method:'GET',
            url:`${BASE_URL}/processors/exceptions/batches?size=20&date=${date}`
        }).then((response) =>{
            dispatch({
                type:GET_EXCEPTION_DEFINITIONS,
                payload:response
            })
        })
    }else if(date && processorId){
        debugger;
        axios({
            method:'GET',
            url:`${BASE_URL}/processors/exceptions/batches?size=20&date=${date}&processorId=${processorId}`
        }).then((response) =>{
            dispatch({
                type:GET_EXCEPTION_DEFINITIONS,
                payload:response
            })
        })
    }
    else if(processorId){
        debugger;
        axios({
            method:'GET',
            url:`${BASE_URL}/processors/exceptions/batches?size=20&processorId=${processorId}`
        }).then((response) =>{
            dispatch({
                type:GET_EXCEPTION_DEFINITIONS,
                payload:response
            })
        })
    }
    else{
        axios({
            method:'GET',
            url:`${BASE_URL}/processors/exceptions/batches?size=20`
        }).then((response) =>{
            dispatch({
                type:GET_EXCEPTION_DEFINITIONS,
                payload:response
            })
        })
    }
    
}



export const postCustomerException = (values,id) => dispatch => {
    axios.post(`${BASE_URL}/processors/exceptions/details/${id}/post`,values)
        .then(response => {
            dispatch({
                type:POST_CUSTOMER_EXCEPTION,
                payload:response
            })
        })
} 

export const postCustomerExceptions = (values) => dispatch => {
    axios.post(`${BASE_URL}/processors/exceptions/details`,values)
        .then(response => {
            dispatch({
                type:POST_MULTIPLE_CUSTOMER_EXCEPTION,
                payload:response
            })
        })
}


export const createExceptionDefinition = (values,id) => dispatch => {
    axios.post(`${BASE_URL}/processors/${id}/definitions`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_EXCEPTION_DEFINITION,
                payload:response
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_EXCEPTION_DEFINITION_ERROR,
                payload:err
            });
        })
}

export const updateExceptionDefinition= (values,id) => dispatch => {
    axios.put(`${BASE_URL}/procesors/definitions/${id}`,values)
        .then((response) => {
            dispatch({
                type:UPDATE_EXCEPTION_DEFINITION,
                payload:response
            })
        })
        // .catch((error)=>{
        //     dispatch({
                
        //         type:UPDATE_FILE_DEFINITION_ERROR,
        //         payload:error
        //     })
        // })
}

export const fetchDailyProcessorExceptionSummary = (date,endDate) => dispatch => {
    //  let accepted_date_format;
    if(date.includes("T")){
        let extract = date.split("T");
        date = extract[0];
    }
    if(endDate && endDate.includes("T")){
        let extractendDate = endDate.split("T");
        endDate = extractendDate[0];
    }
    axios({
        method:'GET',
        url:`${BASE_URL}/processors/exceptions/summary?date=${date}`
    }).then((response)=>{
        dispatch({
            type:GET_PROCESSOR_EXCEPTION_BYDATE,
            payload:response
        })
    })
}

export const fetchDailyProcessorChannelExceptionSummary = (id,date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/processors/${id}/exceptions/summary?date=${date}`
    }).then((response)=>{
        dispatch({
            type:GET_PROCESSOR_CHANNEL_EXCEPTION_BYDATE,
            payload:response
        })
    })
}


export const fetchChannelRows = (id,page) => dispatch =>{
    if(page){
        axios({
            method:'GET',
            url:`${BASE_URL}/processors/exceptions/details?batchId=${id}&size=20&page=${page}`
        }).then((response)=>{
            dispatch({
                type:GET_CHANNEL_ROWS,
                payload:response
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/processors/exceptions/details?batchId=${id}&size=20&page=0`
        }).then((response)=>{
            dispatch({
                type:GET_CHANNEL_ROWS,
                payload:response
            })
        })
    }   
}

