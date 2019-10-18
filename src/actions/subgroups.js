import axios from 'axios';
import qs from 'qs';

import{
    BASE_URL,
    GET_SUBGROUPS,
    GET_SUBGROUP_ACCOUNTS,
    GET_SUBGROUPS_BYDATE
} from './types';

import {interceptor} from './interceptor';
interceptor();




export const fetchSubGroups = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/subgroups`
    }).then((response) =>{
        // console.log('Response is ',response)
        dispatch({
            type:GET_SUBGROUPS,
            payload:response
        })
    })
}

export const getSubGroupsbyDateRange = (startDate,endDate) => dispatch => {
    if(startDate && endDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/subgroups?createdDate&date=${startDate}&endDate=${endDate}`
        }).then((response) =>{
            dispatch({
                type:GET_SUBGROUPS_BYDATE,
                payload:response
            })
        })
    }else if(startDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/subgroups?createdDate&date=${startDate}`
        }).then((response) =>{
            dispatch({
                type:GET_SUBGROUPS_BYDATE,
                payload:response
            })
        })
    }
}

export const fetchSubGroupAccounts = (id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/subgroups/${id}/products`
    }).then(response =>{
        dispatch({
            type:GET_SUBGROUP_ACCOUNTS,
            payload:response
        })
    })
}