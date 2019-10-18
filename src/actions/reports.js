import axios from 'axios';
import qs from 'qs';

import{
    BASE_URL,
    GET_ALL_ACCOUNT_REPORT,
    GET_ALL_CHANNEL_REPORT,
    GET_DAILY_PROCESSOR_REPORT,
    GET_ALL_ACCOUNT_REPORT_ERROR,
    GET_T112_POSTING_REPORT,
    GET_T112_POSTING_REPORT_ERROR,
    GET_T464_POSTING_REPORT,
    GET_T464_POSTING_REPORT_ERROR,
    GET_INTERAFFILIATE_ACQUIRER_REPORT,
    GET_INTERAFFILIATE_ACQUIRER_REPORT_ERROR,
    GET_INTERAFFILIATE_ISSUER_REPORT,
    GET_INTERAFFILIATE_ISSUER_REPORT_ERROR,
    GET_VISA_ACQUIRER_REPORT,
    GET_VISA_ACQUIRER_REPORT_ERROR,
    GET_VISA_ISSUER_REPORT,
    GET_VISA_ISSUER_REPORT_ERROR,
    GET_VISA_REPORT,
    GET_VISA_REPORT_ERROR,
    GET_INTERAFFILIATE_POSTING_REPORT,
    GET_INTERAFFILIATE_POSTING_REPORT_ERROR
    

} from './types';

import {interceptor} from './interceptor';
interceptor();



export const fetchAccountsReport = (startDate,endDate) => dispatch => {
    
    axios({
        method:'GET',
        url:`${BASE_URL}/reports/account?size=20&date=${startDate}&endDate=${endDate}`
    })
    .then(response =>{
        dispatch({
            type:GET_ALL_ACCOUNT_REPORT,
            payload:response.data
        })
    })
}

export const fetchInterAffiliatePostingReport  = (startDate,endDate,page,postingStatus,validationStatus) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate?report=&page=${page}&size=20&startDate=${startDate}&endDate=${endDate}&postingStatus=${postingStatus}&validationStatus=${validationStatus}`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_POSTING_REPORT,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_POSTING_REPORT_ERROR,
            payload:err
        }) 
    })
}

export const fetchInterAffiliateIssuerPostingReport = (startDate,endDate,page,postingStatus,validationStatus) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/issuers?report=&page=${page}&size=20&startDate=${startDate}&endDate=${endDate}&postingStatus=${postingStatus}&validationStatus=${validationStatus}`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_ISSUER_REPORT,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_ISSUER_REPORT_ERROR,
            payload:err
        }) 
    })
}

export const fetchVisaPostingReport = (startDate,endDate,page,postingStatus,validationStatus) => dispatch =>{
    axios({
        method:'GET',
        url:`${BASE_URL}/visa?report=&page=${page}&size=20&startDate=${startDate}&endDate=${endDate}&postingStatus=${postingStatus}&validationStatus=${validationStatus}`
    }).then(response => {
        dispatch({
            type:GET_VISA_REPORT,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_VISA_REPORT_ERROR,
            payload:err
        })
    })
}

export const fetchInterAffiliateAcquirerPostingReport = (startDate,endDate,page,postingStatus,validationStatus) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/acquirers?report=&page=${page}&size=20&startDate=${startDate}&endDate=${endDate}&postingStatus=${postingStatus}&validationStatus=${validationStatus}`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_ISSUER_REPORT,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_ISSUER_REPORT_ERROR,
            payload:err
        }) 
    })
}

export const fetchT112PostingReport = (startDate,endDate,page,postingStatus,validationStatus) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t112s?report=&page=${page}&size=20&startDate=${startDate}&endDate=${endDate}&postingStatus=${postingStatus}&validationStatus=${validationStatus}`
    }).then(response => {
        dispatch({
            type:GET_T112_POSTING_REPORT,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_T112_POSTING_REPORT_ERROR,
            payload:err
        }) 
    })
}

export const fetchT464PostingReport = (startDate,endDate,page,postingStatus,validationStatus) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t464s?report=&page=${page}&size=20&startDate=${startDate}&endDate=${endDate}&postingStatus=${postingStatus}&validationStatus=${validationStatus}`
    }).then(response => {
        dispatch({
            type:GET_T464_POSTING_REPORT,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_T464_POSTING_REPORT_ERROR,
            payload:err
        })
    })
}

export const searchAccountsReport =(startDate,endDate,accountNameorNumber) => dispatch => {
    
    if(typeof accountNameorNumber !== "undefined" && typeof startDate !== "undefined" && typeof endDate !== "undefined"){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/account?&date=${startDate}&endDate=${endDate}&accNameOrNo=${accountNameorNumber}`
        })
        .then(response =>{
            dispatch({
                type:GET_ALL_ACCOUNT_REPORT,
                payload:response.data
            })
        })
    }else if(typeof accountNameorNumber !== "undefined" && typeof startDate === "undefined" && typeof endDate === "undefined"){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/account?accNameOrNo=${accountNameorNumber}`
        })
        .then(response =>{
            dispatch({
                type:GET_ALL_ACCOUNT_REPORT,
                payload:response.data
            })
        })
        .catch(err => {
            dispatch({
                type:GET_ALL_ACCOUNT_REPORT_ERROR,
                payload:err
            })
        })
    }
    else{
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/account?&date=${startDate}&endDate=${endDate}`
        })
        .then(response =>{
            dispatch({
                type:GET_ALL_ACCOUNT_REPORT,
                payload:response.data
            })
        })
    }
    
}



export const fetchChannelReport = (startDate,endDate) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/reports/channel?size=20&date=${startDate}&endDate=${endDate}`
    })
    .then(response =>{
        dispatch({
            type:GET_ALL_CHANNEL_REPORT,
            payload:response.data
        })
    })
}

export const downloadPdf = (startDate,endDate,accountNumber) => dispatch => {
    debugger;
    if(accountNumber){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/account/report.pdf?&date=${startDate}&endDate=${endDate}&accNameOrNo=${accountNumber}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            debugger;

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
            return;
            debugger;
            dispatch({
                type:GET_ALL_CHANNEL_REPORT,
                payload:response.data
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/account/report.pdf?&date=${startDate}&endDate=${endDate}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
            return;
            debugger;
            dispatch({
                type:GET_ALL_CHANNEL_REPORT,
                payload:response.data
            })
        })
    }
    
}

export const downloadChannelPdf = (startDate,endDate,accountName) => dispatch => {
    if(accountName){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/channel/report.pdf?&date=${startDate}&endDate=${endDate}&accNoOrChannelName=${accountName}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
            return;
            debugger;
            dispatch({
                type:GET_ALL_CHANNEL_REPORT,
                payload:response.data
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/channel/report.pdf?&date=${startDate}&endDate=${endDate}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.pdf');
            document.body.appendChild(link);
            link.click();
            return;
            debugger;
            dispatch({
                type:GET_ALL_CHANNEL_REPORT,
                payload:response.data
            })
        })
    }
    
}

export const downloadCsv = (startDate,endDate,accountNumber) => dispatch => {
    if(accountNumber){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/account/report.csv?&date=${startDate}&endDate=${endDate}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.csv');
            document.body.appendChild(link);
            link.click();
            return;
            debugger;
            dispatch({
                type:GET_ALL_CHANNEL_REPORT,
                payload:response.data
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/account/report.csv?&date=${startDate}&endDate=${endDate}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.csv');
            document.body.appendChild(link);
            link.click();
            return;
            debugger;
            dispatch({
                type:GET_ALL_CHANNEL_REPORT,
                payload:response.data
            })
        })
    }
}

export const downloadChannelCsv = (startDate,endDate,channelName) => dispatch => {
    if(channelName){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/channel/report.csv?&date=${startDate}&endDate=${endDate}&accNoOrChannelName=${channelName}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.csv');
            document.body.appendChild(link);
            link.click();
            return;
            debugger;
            dispatch({
                type:GET_ALL_CHANNEL_REPORT,
                payload:response.data
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/channel/report.csv?&date=${startDate}&endDate=${endDate}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'report.csv');
            document.body.appendChild(link);
            link.click();
            return;
        })
    }
    
}


export const downloadDailyCsv = (date,processorId) => dispatch => {
    
    if(date && processorId){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/daily/report.csv?&date=${date}&processorId=${processorId}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'daily.csv');
            document.body.appendChild(link);
            link.click();
            return;
        })
    }else if(date != null && !processorId){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/daily/report.csv?&date=${date}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'daily.csv');
            document.body.appendChild(link);
            link.click();
            return;
        })
    }else if(!date && processorId){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/daily/report.csv?&processorId=${processorId}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'daily.csv');
            document.body.appendChild(link);
            link.click();
            return;
        })
    }
}

export const downloadDailyPdf = (date,processorId) => dispatch => {
    
    if(date && processorId){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/daily/report.pdf?&date=${date}&processorId=${processorId}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'daily.pdf');
            document.body.appendChild(link);
            link.click();
            return;
        })
    }else if(date != null && !processorId){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/daily/report.pdf?&date=${date}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'daily.pdf');
            document.body.appendChild(link);
            link.click();
            return;
        })
    }else if(!date && processorId){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/daily/report.pdf?&processorId=${processorId}`,
            responseType: 'blob', // important
        })
        .then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'daily.pdf');
            document.body.appendChild(link);
            link.click();
            return;
        })
    }
}

export const fetchDailyProcessorReport = (date,processorId) => dispatch => {
    
    if(date && !processorId){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/daily?date=${date}`
        })
        .then(response =>{
            dispatch({
                type:GET_DAILY_PROCESSOR_REPORT,
                payload:response.data
            })
        })
    }
    else if(processorId && !date){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/daily?processorId=${processorId}`
        })
        .then(response =>{
            dispatch({
                type:GET_DAILY_PROCESSOR_REPORT,
                payload:response.data
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/daily?processorId=${processorId}&date=${date}`
        })
        .then(response =>{
            dispatch({
                type:GET_DAILY_PROCESSOR_REPORT,
                payload:response.data
            })
        })
    }
}

export const searchChannelReport =(startDate,endDate,channel) => dispatch => {
    if(typeof channel !== "undefined"){
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/channel?&date=${startDate}&endDate=${endDate}&searchChannelReport=${channel}`
        })
        .then(response =>{
            dispatch({
                type:GET_ALL_CHANNEL_REPORT,
                payload:response.data
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/reports/channel?&date=${startDate}&endDate=${endDate}`
        })
        .then(response =>{
            dispatch({
                type:GET_ALL_CHANNEL_REPORT,
                payload:response.data
            })
        })
    }
    
}

