import axios from 'axios';
import{
    BASE_URL,
    GET_BATCHES,
    GET_MANUAL_POSTINGS,
    GET_MANUAL_BATCHES_ERROR,
    GET_BATCHES_TRANSACTIONS,
    GET_BATCHES_SUMMARY,
    POST_ALL_TRANSACTIONS,
    POST_TRANSACTION,
    POST_TRANSACTION_ERROR,
    MANUAL_ADD_BATCH,
    MANUAL_ADD_BATCH_ERROR,
    GET_DAILY_PROCESSORS_SUBGROUPS_SUMMARY,
    GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_SUMMARY,
    GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_ACCOUNTS_SUMMARY

} from './types';
import moment from 'moment';

import {interceptor} from './interceptor';
interceptor();




export const fetchBatches = (pageNumber) => dispatch => {
    if(pageNumber){
        axios({
            method:'GET',
            url:`${BASE_URL}/batches?page=${pageNumber}`
        }).then((response) =>{
            dispatch({
                type:GET_BATCHES,
                payload:response
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/batches`
        }).then((response) =>{
            dispatch({
                type:GET_BATCHES,
                payload:response
            })
        })
    }
   
}
/**
 * View Batches for a particular Product, by Name
 */

 export const fetchBatchesForProductName = (name) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/batches/product-name/${name}`
    }).then((response)=>{
        dispatch({
            type:GET_BATCHES,
            payload:response
        })
    })
 }

 /*POST All Transactions */

 export const postAllTransactions = (values) => dispatch => {
    axios.post(`${BASE_URL}/batches/post-all`,values)
        .then((response)=>{
            dispatch({
                type:POST_ALL_TRANSACTIONS,
                payload:response
            })
        })
}

export const postTransaction = (values) => dispatch => {
    axios.post(`${BASE_URL}/batches/post-one`,values)
        .then((response)=>{
            dispatch({
                type:POST_TRANSACTION,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:POST_TRANSACTION_ERROR,
                payload:err
            })
        })
}

 export const fetchBatchesSummary = (date) => dispatch => {
    //  let accepted_date_format;
    if(date){
        if(date.includes("T")){
            let extract = date.split("T");
            date = extract[0];
        }
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/summary?date=${date}`
        }).then((response)=>{
            dispatch({
                type: GET_BATCHES_SUMMARY,
                payload:response
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/summary`
        }).then((response)=>{
            dispatch({
                type: GET_BATCHES_SUMMARY,
                payload:response
            })
        })
    }
    
 }

 export const fetchDailyProcessorSubGroupSummary = (id,date,endDate) => dispatch =>{
    if(date.includes("T")){
        let extract = date.split("T");
        date = extract[0];
    }
    if(endDate && endDate.includes("T")){
        let extractendDate = endDate.split("T");
        endDate = extractendDate[0];
     }
    if(date && endDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/summary/processor/${id}?date=${date}&endDate=${endDate}`
        }).then((response)=>{
            dispatch({
                type: GET_DAILY_PROCESSORS_SUBGROUPS_SUMMARY,
                payload:response
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/summary/processor/${id}?date=${date}`
        }).then((response)=>{
            dispatch({
                type: GET_DAILY_PROCESSORS_SUBGROUPS_SUMMARY,
                payload:response
            })
        })
    }
    
 }

export const fetchDailyProcessorSubGroupSummaryProducts = (id,date,endDate) => dispatch =>{
    if(date.includes("T")){
        let extract = date.split("T");
        date = extract[0];
    }
    if(endDate && endDate.includes("T")){
        let extractendDate = endDate.split("T");
        endDate = extractendDate[0];
    }
    if(date && endDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/summary/subgroup/${id}?date=${date}&endDate=${endDate}`
        }).then((response)=>{
            dispatch({
                type:GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_SUMMARY ,
                payload:response
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/summary/subgroup/${id}?date=${date}`
        }).then((response)=>{
            dispatch({
                type:GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_SUMMARY ,
                payload:response
            })
        })
    }
    
}

export const fetchDailyProcessorSubGroupSummaryProductsAccounts = (id,date,endDate) => dispatch =>{
    if(date.includes("T")){
        let extract = date.split("T");
        date = extract[0];
    }
    if(endDate && endDate.includes("T")){
        let extractendDate = endDate.split("T");
        endDate = extractendDate[0];
    }
    if(date && endDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/summary/product/${id}?date=${date}&endDate=${endDate}`
        }).then((response)=>{
            dispatch({
                type:GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_ACCOUNTS_SUMMARY,
                payload:response
            })
        })
    }
    axios({
        method:'GET',
        url:`${BASE_URL}/batches/summary/product/${id}?date=${date}`
    }).then((response)=>{
        dispatch({
            type:GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_ACCOUNTS_SUMMARY,
            payload:response
        })
    })
}

export const manualBatchPosting = (values) => dispatch => {
    // axios.post(`${BASE_URL}/batches/manual?isManual=true`,values)
    axios.post(`${BASE_URL}/batches`,values)
        .then((response)=>{
            dispatch({
                type:MANUAL_ADD_BATCH,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:MANUAL_ADD_BATCH_ERROR,
                payload:err.response
            })
        })
}

export const fetchManualPostings = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/batches/manual?isManual=true`
    }).then(response =>{
        dispatch({
            type:GET_MANUAL_POSTINGS,
            payload:response
        })
    })
    .catch(err => {
        dispatch({
            type:GET_MANUAL_BATCHES_ERROR,
            payload:err
        })
    })
}

export const fetchBatchesTransactions = (id,pageNumber) => dispatch => {
    
    if(pageNumber){
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/${id}/transactions?page=${pageNumber}`
        }).then((response)=>{
            dispatch({
                type:GET_BATCHES_TRANSACTIONS,
                payload:response
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/${id}/transactions`
        }).then((response)=>{
            dispatch({
                type:GET_BATCHES_TRANSACTIONS,
                payload:response
            })
        })
    }
    
}