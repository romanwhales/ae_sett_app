import axios from 'axios';
import {LOCALE_SET,UPDATE_LOCALE,BASE_URL} from './types';

import {interceptor} from './interceptor';
interceptor();

export const updateLocale = (language) => dispatch => {
    axios.put(`${BASE_URL}/users`,language)
        .then((response) => {
            dispatch({
                type:UPDATE_LOCALE,
                payload:response
            })
        })
}


export const setLocale = (language) => dispatch => {
    localStorage.se8lementLang = language;
    dispatch({
        type:LOCALE_SET,
        payload:language
    })
}