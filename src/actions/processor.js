import axios from 'axios';
import qs from 'qs';

import{
    BASE_URL,
    CREATE_PROCESSOR,
    CREATE_PROCESSOR_ERROR,
    GET_PROCESSORS,
    GET_PROCESSOR,
    CREATE_SUBGROUP,
    GET_PROCESSOR_SUBGROUPS,
    DELETE_PROCESSOR,
    UPDATE_PROCESSOR,
    UPDATE_PROCESSOR_ERROR,
    CREATE_SUBGROUP_ERROR,
    GET_PROCESSORS_BYDATE,
    GET_SUBGROUP_ACCOUNTS,
    UPDATE_SUBGROUP,
    GET_SUBGROUP,GET_PROCESSORS_FILESET,GET_PROCESSORS_FILESET_ERROR

} from './types';

    // Set the AUTH token for any request
  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if(token != null ){
        config.headers.Authorization =  token ? `${token}` : '';
        // debugger;
        return config;
    }
   
   
  });


export const createProcessor = (values) => dispatch => {
    axios.post(`${BASE_URL}/processors`,values)
        .then((response)=>{
            debugger;
            dispatch({
                type:CREATE_PROCESSOR,
                payload:response
            })
        })
        .catch(err =>{
            debugger;
            dispatch({
                type:CREATE_PROCESSOR_ERROR,
                payload:err
            });
        })
}

export const getProcessor = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/processors`
    }).then((response) =>{
        dispatch({
            type:GET_PROCESSORS,
            payload:response.data
        })
    })
}


export const getProcessorbyDateRange = (startDate,endDate) => dispatch => {
    if(startDate && endDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/processors?createdDate&date=${startDate}&endDate=${endDate}`
        }).then((response) =>{
            dispatch({
                type:GET_PROCESSORS_BYDATE,
                payload:response
            })
        })
    }else if(startDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/processors?createdDate&date=${startDate}`
        }).then((response) =>{
            dispatch({
                type:GET_PROCESSORS_BYDATE,
                payload:response
            })
        })
    }
}

export const getOneProcessor = (value) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/processors/${value}`
    }).then((response) => {
        dispatch({
            type:GET_PROCESSOR,
            payload:response
        })
    })
}

export const getOneSubGroup = (id) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/subgroups/${id}`,

    }).then(response => {
        dispatch({
            type:GET_SUBGROUP,
            payload:response
        })
    })
}

export const createSubGroup = (value,id) => dispatch => {
    axios.post(`${BASE_URL}/processors/${id}/subgroups`,value)
    .then((response) => {
        debugger;
        dispatch({
            type:CREATE_SUBGROUP,
            payload:response
        })
    })
    .catch(err => {
        debugger;
        dispatch({
            type:CREATE_SUBGROUP_ERROR,
            payload:err.response
        })
    })
}

export const getSubGroups = (id) => dispatch =>{
    axios({
        method:'GET',
        url:`${BASE_URL}/processors/${id}/subgroups`
    }).then((response) => {
        dispatch({
            type:GET_PROCESSOR_SUBGROUPS,
            payload:response
        })
    })
}

export const getProcessorFileset = (id,page) => dispatch =>{
    axios({
        method:'GET',
        url:`${BASE_URL}/processors/${id}/file-sets?page=${page}&size=20`
    }).then((response) => {
        dispatch({
            type:GET_PROCESSORS_FILESET,
            payload:response
        })
    })
    .catch(err => {
        dispatch({
            type:GET_PROCESSORS_FILESET_ERROR,
            payload:err.response.data
        })
    })
}

export const deleteProcessor = (id) => dispatch => {
    axios.delete(`${BASE_URL}/processors/${id}`,{}).
        then(response => {
            dispatch({
                type:DELETE_PROCESSOR,
                payload:response
            })
        })
}

export const updateProcessor = (value) => dispatch => {
    let id = value.id;
    delete value.id;
    axios.put(`${BASE_URL}/processors/${id}`,value).
        then(response=>{
            dispatch({
                type:UPDATE_PROCESSOR,
                payload:response
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_PROCESSOR_ERROR,
                payload:err.response.data
            })
        })
}

export const updateSubgroup = (value) => dispatch => {
    let id = value.id;
    delete value.id;
    delete value.products;
    axios.put(`${BASE_URL}/subgroups/${id}`,value).
        then(response => {
            dispatch({
                type:UPDATE_SUBGROUP,
                payload:response
            })
        })
}