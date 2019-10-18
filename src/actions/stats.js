import axios from 'axios';

import {
    TOP_CONTRIBUTORS,
    BOTTOM_CONTRIBUTORS,
    GET_DAILY_PROCESSORS_SUMMARY,
    GET_DAILY_PROCESSOR_ACCOUNT_POST,
    GET_BOTTOM_CONTRIBUTOR_ERROR,
    BASE_URL,
} from './types';

import {interceptor} from './interceptor';
interceptor();



export const fetchDailyProcessorPostingAccounts = (id,date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/batches/summary/processor/${id}/account?date=${date}`
    })
    .then(response => {
        // console.log('Called ',response);
        dispatch({
            type:GET_DAILY_PROCESSOR_ACCOUNT_POST,
            payload:response
        })
    })
}

export const fetchDailyProcessorsSummary = (date,endDate) => dispatch => {
    if(date.includes("T")){
        let extract = date.split("T");
        date = extract[0];
     }
    if(endDate && endDate.includes("T")){
        let extractendDate = endDate.split("T");
        endDate = extractendDate[0];
    }
    if(endDate && date){
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/summary/processor?date=${date}&endDate=${endDate}`
        })
        .then(response => {
            // console.log('Called ',response);
            dispatch({
                type:GET_DAILY_PROCESSORS_SUMMARY,
                payload:response
            })
        }) 
        return;
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/batches/summary/processor?date=${date}`
        })
        .then(response => {
            // console.log('Called ',response);
            dispatch({
                type:GET_DAILY_PROCESSORS_SUMMARY,
                payload:response
            })
        })
    }
    
}
export const fetchTopContributors = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/stats/top-commissions`
    })
    .then(response=>{
        
        dispatch({
            type:TOP_CONTRIBUTORS,
            payload:response
        })
    })
}

export const fetchBottomContributors =() => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/stats/bottom-commissions`
    })
    .then(response => {
        dispatch({
            type:BOTTOM_CONTRIBUTORS,
            payload:response
        })
    })
    .catch(err =>{
        dispatch({
            type:GET_BOTTOM_CONTRIBUTOR_ERROR,
            payload:err.response
        })
    })
}
