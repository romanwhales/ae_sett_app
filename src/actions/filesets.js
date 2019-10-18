import axios from 'axios';
import {BASE_URL,GET_FILE_SETS,GET_FILE_SETS_ERROR,CREATE_FILE_SET,CREATE_FILE_SET_ERROR,UPDATE_FILE_SET,UPDATE_FILE_SET_ERROR,DELETE_FILE_SET,DELETE_FILE_SET_ERROR,GET_FILE_SETS_PAGINATED,GET_FILE_SETS_PAGINATED_ERROR,GET_FILE_SET,GET_FILE_SET_ERROR, GET_FILE_SET_DEFINITIONS, GET_FILE_SET_DEFINITIONS_ERROR,ADD_FILE_DEFINITIONS_TO_FILESET,ADD_FILE_DEFINITIONS_TO_FILESET_ERROR,DELETE_FILE_SET_FILE_DEFINITION,DELETE_FILE_SET_FILE_DEFINITION_ERROR,GET_FILE_SET_BATCHES_PAGINATED,GET_FILE_SET_BATCHES_PAGINATED_ERROR,GET_FILE_SET_DEFINITION_BATCHES_PAGINATED,GET_FILE_SET_DEFINITION_BATCHES_PAGINATED_ERROR,GET_FILE_SET_DEFINITION_BATCHES_TRANSACTIONS_PAGINATED,GET_FILE_SET_DEFINITION_BATCHES_TRANSACTIONS_PAGINATED_ERROR,GET_FILESET_BATCH_DETAIL,GET_FILESET_BATCH_DETAIL_ERROR,GET_FILESET_BATCH_DEFINITION_DETAIL,GET_FILESET_BATCH_DEFINITION_DETAIL_ERROR,GET_FILESET_BATCHES_SUMMARY,GET_FILESET_BATCHES_SUMMARY_ERROR,GET_FILE_SET_STATUS,GET_FILE_SET_STATUS_ERROR,GET_T112S,GET_T112S_ERROR,GET_T464S,GET_T464S_ERROR,GET_ADVISEMENT,GET_ADVISEMENT_ERROR,GET_MASTERCARD_T112_TRANSACTIONS,GET_MASTERCARD_T112_TRANSACTIONS_ERROR,GET_T140S,GET_T140S_ERROR,GET_T464_TRANSACTIONS,GET_T464_TRANSACTIONS_ERROR,GET_T112_TRANSACTIONS,GET_T112_TRANSACTIONS_ERROR,GET_T112_SUMMARY,GET_T112_SUMMARY_ERROR,GET_T112_SUMMARY_LOADING,GET_T464_SUMMARY,GET_T464_SUMMARY_ERROR,GET_T461S,GET_T461S_ERROR,GET_T461_TRANSACTIONS,GET_T461_TRANSACTIONS_ERROR,GET_T140S_TRANSACTIONS,GET_T140S_TRANSACTIONS_ERROR,GET_T140S_TRANSACTIONS_LOADING,GET_INTERAFILIATE_ISSUERS,GET_INTERAFILIATE_ISSUERS_ERROR,GET_INTERAFILIATE_ACQUIRER,GET_INTERAFILIATE_ACQUIRER_ERROR,GET_ISSUER_TRANSACTIONS,GET_ISSUER_TRANSACTIONS_ERROR,GET_ACQUIRER_TRANSACTIONS,GET_ACQUIRER_TRANSACTIONS_ERROR,GET_VISA_ACQUIRER,GET_VISA_ACQUIRER_ERROR,GET_VISA_ACQUIRER_TRANSACTIONS,GET_VISA_ACQUIRER_TRANSACTIONS_ERROR, GET_VISA_ISSUER, GET_VISA_ISSUER_ERROR, GET_VISA_ISSUER_TRANSACTIONS, GET_VISA_ISSUER_TRANSACTIONS_ERROR,GET_INTERAFFILIATE_ACQUIRER_SUMMARY,GET_INTERAFFILIATE_ACQUIRER_SUMMARY_ERROR,GET_INTERAFFILIATE_ISSUER_SUMMARY,GET_INTERAFFILIATE_ISSUER_SUMMARY_ERROR,GET_INTERAFFILIATE_SUMMARY,GET_INTERAFFILIATE_SUMMARY_ERROR,GET_INTERAFFILIATE_SUMMARY_TRANSACTIONS,GET_INTERAFFILIATE_SUMMARY_TRANSACTIONS_ERROR,GET_VISA_ACQUIRER_SUMMARY,GET_VISA_ACQUIRER_SUMMARY_ERROR,GET_VISA_ISSUER_SUMMARY,GET_VISA_ISSUER_SUMMARY_ERROR,GET_VISA_ISSUER_SUMMARY_STATS,GET_VISA_ISSUER_SUMMARY_STATS_ERROR,GET_T112_SUMMARY_STATS,GET_T112_SUMMARY_STATS_ERROR,GET_T464_SUMMARY_STATS,GET_t464_SUMMARY_STATS_ERROR,GET_VISA_ACQUIRER_SUMMARY_STATS,GET_VISA_ACQUIRER_SUMMARY_STATS_ERROR, GET_INTERAFFILIATE_ACQUIRER_SUMMARY_STATS, GET_INTERAFFILIATE_ACQUIRER_SUMMARY_STATS_ERROR,GET_INTERAFFILIATE_ISSUER_SUMMARY_STATS,GET_INTERAFFILIATE_ISSUER_SUMMARY_STATS_ERROR,GET_VISA_SUMMARY,GET_VISA_SUMMARY_ERROR,GET_VISA_POSTING_SUMMARY,GET_VISA_POSTING_SUMMARY_ERROR,GET_VISA_POSTING_SUMMARY_LOADING,GET_INTERAFFILIATE_POSTING_SUMMARY,GET_INTERAFFILIATE_POSTING_SUMMARY_ERROR,GET_ADVISEMENT_DETAIL,GET_ADVISEMENT_DETAIL_ERROR,GET_ALL_VSS,GET_ALL_VSS_ERROR,GET_VSS_110,GET_VSS_110_ERROR,GET_VSS_110_SUMMARY,GET_VSS_110_SUMMARY_ERROR,GET_VSS_115,GET_VSS_115_ERROR,GET_VSS_115_SUMMARY,GET_VSS_115_SUMMARY_ERROR,GET_VSS_116,GET_VSS_116_SUMMARY,GET_VSS_116_SUMMARY_ERROR,GET_VSS_116_ERROR,GET_VSS_120,GET_VSS_120_ERROR,GET_VSS_120_SUMMARY,GET_VSS_120_SUMMARY_ERROR,GET_VSS_300,GET_VSS_300_ERROR,GET_VSS_300_SUMMARY,GET_VSS_300_SUMMARY_ERROR,GET_VSS_900,GET_VSS_900_ERROR,GET_VSS_900_SUMMARY,GET_VSS_900_SUMMARY_ERROR,GET_VISA_ISSUER_TRANSACTIONS_REQUEST,GET_INTERSWITCH_COMPUTATIONS,GET_INTERSWITCH_COMPUTATIONS_ERROR,GET_DAILY_INTERSWITCH_SUMMARY,GET_DAILY_INTERSWITCH_SUMMARY_ERROR} from './types';

import {interceptor} from './interceptor';
interceptor();


export const fetchAllVss = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss?all&all`
    }).then(response => {
        dispatch({
            type:GET_ALL_VSS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_ALL_VSS_ERROR,
            payload:err.response
        })
    })
}

export const fetchAllVss110Files = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss?vss110&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_110,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_110_ERROR,
            payload:err.response
        })
    })
} 

export const fetchAllVss115Files = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss?vss115&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_115,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_115_ERROR,
            payload:err.response
        })
    })
}
export const fetchAllVss116Files = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss?vss116&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_116,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_116_ERROR,
            payload:err.response
        })
    })
}

export const fetchAllVss120Files = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss?vss120&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_120,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_120_ERROR,
            payload:err.response
        })
    })
}

export const fetchAllVss300Files = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss?vss300&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_300,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_300_ERROR,
            payload:err.response
        })
    })
}

export const fetchAllVss900Files = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss?vss900s&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_900,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_900_ERROR,
            payload:err.response
        })
    })
}

export const fetchVss110Summary = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss/${date}?vss110&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_110_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_110_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchVss115Summary = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss/${date}?vss115&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_115_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_115_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchVss116Summary = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss/${date}?vss116&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_116_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_116_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchVss120Summary = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss/${date}?vss120&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_120_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_120_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchVss300Summary = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss/${date}?vss300&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_300_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_300_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchVss900Summary = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/vss/${date}?vss900s&page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VSS_900_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VSS_900_SUMMARY_ERROR,
            payload:err.response
        })
    })
}
export const fetchInterswitchComputationSummary = (id,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-switch/daily-computations/${id}/details?page=${page}&size=20`
    }).then(response => {
        debugger;
        dispatch({
            type:GET_DAILY_INTERSWITCH_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_DAILY_INTERSWITCH_SUMMARY_ERROR,
            payload:err.response
        })
    })
}
export const fetchAllInterswitchComputations = (startDate,endDate,page) => dispatch => {
    if(startDate && endDate){
        axios({
            method:'GET',
            url:`${BASE_URL}/inter-switch/daily-computations?date&startDate=${startDate}&endDate=${endDate}`
        }).then(response => {
            dispatch({
                type:GET_INTERSWITCH_COMPUTATIONS,
                payload:response
            })
        }).catch(err => {
            dispatch({
                type:GET_INTERSWITCH_COMPUTATIONS_ERROR,
                payload:err.response
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/inter-switch/daily-computations?page=${page}&size=20`
        }).then(response => {
            dispatch({
                type:GET_INTERSWITCH_COMPUTATIONS,
                payload:response
            })
        }).catch(err => {
            dispatch({
                type:GET_INTERSWITCH_COMPUTATIONS_ERROR,
                payload:err.response
            })
        })
    }
}


export const fetchAllAdvisements = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/advisement`
    }).then(response => {
        dispatch({
            type: GET_ADVISEMENT,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_ADVISEMENT_ERROR,
            payload:err.response
        })
    })
}

export const fetchAdvisementDetail = (batchDate) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/advisement/${batchDate}`
    }).then(response => {
        dispatch({
            type:GET_ADVISEMENT_DETAIL,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_ADVISEMENT_DETAIL_ERROR,
            payload:err.response
        })
    })
}

export const downloadInterAffiliateSummaryTransactions = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/summaries/${date}/items?csv&csv`,
        responseType:'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Inter Affiliate Summary Transactions '+date+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const fetchInterAffiliateSummaryTransactions = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/summaries/${date}/items?page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_SUMMARY_TRANSACTIONS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_SUMMARY_TRANSACTIONS_ERROR,
            payload:err.response
        })
    })
}

export const downloadInterAffiliatePostingSummary = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/${date}/summary?csv&csv`,
        responseType:'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Inter Affiliate Posting Summary'+date+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const fetchInterAffiliatePostingSummary = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/${date}/summary`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_POSTING_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_POSTING_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchInterAffilliateSummary = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/summaries?page=${page}&size=10`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchVisaSummary = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa?page=${page}&size=10`
    }).then(response => {
        dispatch({
            type:GET_VISA_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VISA_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const downloadVisaPostingSummary = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/${date}/summary?csv&csv`,
        responseType:'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Visa Posting Summary '+date+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const fetchVisaPostingSummary = (date) => dispatch => {
    dispatch({
        type:GET_VISA_POSTING_SUMMARY_LOADING
    })
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/${date}/summary`
    }).then(response => {
        dispatch({
            type:GET_VISA_POSTING_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VISA_POSTING_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchVisaAcquirerSummary =(date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/acquirers/${date}/summary`
    }).then(response => {
        dispatch({
            type:GET_VISA_ACQUIRER_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VISA_ACQUIRER_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchVisaAcquirerSummaryStats = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/acquirers/${date}/utils`
    }).then(response => {
        dispatch({
            type:GET_VISA_ACQUIRER_SUMMARY_STATS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VISA_ACQUIRER_SUMMARY_STATS_ERROR,
            payload:err.response
        })
    })
}

export const fetchVisaIssuerSummaryStats = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/issuers/${date}/utils`
    }).then(response => {
        dispatch({
            type:GET_VISA_ISSUER_SUMMARY_STATS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VISA_ISSUER_SUMMARY_STATS_ERROR,
            payload:err.response
        })
    })
}

export const fetchVisaIssuerSummary = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/issuers/${date}/summary`
    }).then(response => {
        dispatch({
            type:GET_VISA_ISSUER_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VISA_ISSUER_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchAllInterAffiliateIssuer = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/issuers?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_INTERAFILIATE_ISSUERS,
            payload:response
        })
    }).catch(err => dispatch({
        type:GET_INTERAFILIATE_ISSUERS_ERROR,
        payload:err.response
    }))
}

export const fetchAllInterAffiliateAcquirer = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/acquirers?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_INTERAFILIATE_ACQUIRER,
            payload:response
        })
    }).catch(err => dispatch({
        type:GET_INTERAFILIATE_ACQUIRER_ERROR,
        payload:err.response
    }))
}

export const fetchVisaAcquirer = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/acquirers?page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VISA_ACQUIRER,
            payload:response
        })
    }).catch(err => dispatch({
        type:GET_VISA_ACQUIRER_ERROR,
        payload:err.response
    }))
}

export const fetchVisaIssuer = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/issuers?page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VISA_ISSUER,
            payload:response
        })
    }).catch(err => dispatch({
        type:GET_VISA_ISSUER_ERROR,
        payload:err.response
    }))
}

export const fetchVisaIssuerTransactions = (date,page) => dispatch => {
    debugger;
    dispatch({
        type:GET_VISA_ISSUER_TRANSACTIONS_REQUEST
    })
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/issuers/${date}/items?page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VISA_ISSUER_TRANSACTIONS,
            payload:response
        })
    }).catch(err => dispatch({
        type:GET_VISA_ISSUER_TRANSACTIONS_ERROR,
        payload:err.response
    }))
}

export const fetchVisaAcquirerTransactions = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/acquirers/${date}/items?page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_VISA_ACQUIRER_TRANSACTIONS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_VISA_ACQUIRER_TRANSACTIONS_ERROR,
            payload:err.response
        })
    })
}

export const fetchAllT140s = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/t140s?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_T140S,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T140S_ERROR,
            payload:err.response
        })
    })
}


export const fetchAllT461s = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/t461s?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_T461S,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T461S_ERROR,
            payload:err.response
        })
    })
}

export const fetchAllT464s = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t464s?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_T464S,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T464S_ERROR,
            payload:err.response
        })
    })
}

export const fetchAllT112s = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t112s?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_T112S,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T112S_ERROR,
            payload:err.response
        })
    })
}

export const fetchT464Transactions = (fileId,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t464s/${fileId}?page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_T464_TRANSACTIONS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T464_TRANSACTIONS_ERROR,
            payload:err.response
        })
    })
}
export const fetchAcquirerTransactions = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/acquirers/${date}/items?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_ACQUIRER_TRANSACTIONS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_ACQUIRER_TRANSACTIONS_ERROR,
            payload:err.response
        })
    })
}

export const fetchIssuerTransactions = (date,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/issuers/${date}/items?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_ISSUER_TRANSACTIONS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_ISSUER_TRANSACTIONS_ERROR,
            payload:err.response
        })
    })
}

export const fetchT461Transactions = (fileId,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/t461s/${fileId}?page=${page}&size=20`
    }).then(response => {
        dispatch({
            type:GET_T461_TRANSACTIONS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T461_TRANSACTIONS_ERROR,
            payload:err.response
        })
    })
}

export const fetchT112Transactions=(fileId,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t112s/${fileId}?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_T112_TRANSACTIONS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T112_TRANSACTIONS_ERROR,
            payload:err.response
        })
    })
} 


export const fetchT140Transactions = (fileId,page) => dispatch => {
    dispatch({
        type:GET_T140S_TRANSACTIONS_LOADING
    })
    axios({
        method:'GET',
        url:`${BASE_URL}/t140s/${fileId}?size=20&page=${page}`
    }).then(response => {
        dispatch({
            type:GET_T140S_TRANSACTIONS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T140S_TRANSACTIONS,
            payload:err.response
        })
    })
}

export const fetchInterAffiliateAcquirerSummary = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/acquirers/${date}/summary`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_ACQUIRER_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_ACQUIRER_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchInterAffiliateAcquirerSummaryStats = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/acquirers/${date}/utils`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_ACQUIRER_SUMMARY_STATS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_ACQUIRER_SUMMARY_STATS_ERROR,
            payload:err.response
        })
    })
}

export const fetchInterAffiliateIssuerSummaryStats = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/issurers/${date}/utils`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_ISSUER_SUMMARY_STATS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_ISSUER_SUMMARY_STATS_ERROR,
            payload:err.response
        })
    })
}

export const fetchInterAffiliateIssuerSummary = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/issuers/${date}/summary`
    }).then(response => {
        dispatch({
            type:GET_INTERAFFILIATE_ISSUER_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_INTERAFFILIATE_ISSUER_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchT464Summary = (fileId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t464s/${fileId}/summary`
    }).then(response => {
        dispatch({
            type:GET_T464_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T464_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchT464SummaryStats = (fileId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t464s/${fileId}/utils`
    }).then(response => {
        dispatch({
            type:GET_T464_SUMMARY_STATS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_t464_SUMMARY_STATS_ERROR,
            payload:err.response
        })
    })
}

export const fetchT112SummaryStats = (fileId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t112s/${fileId}/utils`
    }).then(response => {
        
        dispatch({
            type:GET_T112_SUMMARY_STATS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T112_SUMMARY_STATS_ERROR,
            payload:err.response
        })
    })
}

export const fetchT112Summary = (fileId) => dispatch => {
    dispatch({
        type:GET_T112_SUMMARY_LOADING
    })
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t112s/${fileId}/summary`
    }).then(response => {
        dispatch({
            type:GET_T112_SUMMARY,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_T112_SUMMARY_ERROR,
            payload:err.response
        })
    })
}

export const fetchFileSet = (fileSetId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}`
    }).then((response) => {
        dispatch({
            type:GET_FILE_SET,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_FILE_SET_ERROR,
            payload:err.response
        })
    })
}

export const fetchFileSetStatus = (fileSetId,affiliateCode,startDate,endDate) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}/affiliate-details-list?affiliateCode=${affiliateCode}&startDate=${startDate}&endDate=${endDate}`
    }).then((response) => {
        dispatch({
            type:GET_FILE_SET_STATUS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_FILE_SET_STATUS_ERROR,
            payload:err.response
        })
    })
}


export const fetchFileSetDefinitions = (fileSetId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}/definitions`
    }).then((response) => {
        dispatch({
            type:GET_FILE_SET_DEFINITIONS,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_FILE_SET_DEFINITIONS_ERROR,
            payload:err.response
        })
    })
}




export const fetchFileSets = () => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets`
    }).then((response) => {
        dispatch({
            type:GET_FILE_SETS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type:GET_FILE_SETS_ERROR,
            payload:err.response
        })
    })
}

export const fetchFileSetsPaginated = (page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets?size=20&page=${page}`
    }).then((response) => {
        dispatch({
            type:GET_FILE_SETS_PAGINATED,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_FILE_SETS_PAGINATED_ERROR,
            payload:err.response
        })
    })
}


export const fetchFileSetBatchDetail = (fileSetId,batchId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}/batches/${batchId}`
    }).then((response) => {
        dispatch({
            type:GET_FILESET_BATCH_DETAIL,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_FILESET_BATCH_DETAIL_ERROR,
            payload:err.response
        })
    })
}

export const fetchFileSetBatchSummary = (fileSetId,batchId,affiliateId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}/batches/${batchId}/summary`
    }).then((response) => {
        dispatch({
            type:GET_FILESET_BATCHES_SUMMARY,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_FILESET_BATCHES_SUMMARY_ERROR,
            payload:err.response
        })
    })
}


export const downloadT461Transactions = (fileId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/t461s/${fileId}?csv&csv`,
        responseType:'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'T461 '+fileId+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadT112Transactions = (fileId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t112s/${fileId}?csv&csv`,
        responseType:'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'T112 '+fileId+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadT140Transactions = (fileId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/t140s/${fileId}?csv`,
        responseType:'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'T140 '+fileId+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadT464Transactions = (fileId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t464s/${fileId}?csv&csv`,
        responseType:'blob'
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'T464 '+fileId+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadT112PostingFile = (fileId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t112s/${fileId}/summary?csv&csv`,
        responseType: 'blob', // important
    })
    .then(response =>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileId+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadVisaIssuerCsv = (date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/issuers/${date}/items?csv&csv`,
        responseType: 'blob', // important
    })
    .then(response =>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', date+' Issuer Transactions.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadVisaAcquirerCsv =(date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/visa/acquirers/${date}/items?csv&csv`,
        responseType: 'blob', // important
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', date+' Acquirer Transactions.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadInterAffiliateIssuerCsv =(date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/issuers/${date}/items?csv&csv`,
        responseType: 'blob', // important
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', date+' InterAffiliate Issuers Transactions.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadInterAffiliateAcquirerCsv =(date) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/inter-affiliate/acquirers/${date}/items?csv&csv`,
        responseType: 'blob', // important
    }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', date+' InterAffiliate Acquirer Transactions.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadT464PostingFile = (fileId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/mastercard/t464s/${fileId}/summary?csv&csv`,
        responseType: 'blob', // important
    })
    .then(response =>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileId+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const downloadFileSetBatchesSummaryCsv = (fileSetId,batchId,name) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}/batches/${batchId}/summary?csv`,
        responseType: 'blob', // important
    })
    .then(response =>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

export const fetchFileSetsDefinitionBatchesPaginated = (fileSetId,batchId,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}/batches/${batchId}/definition-batches?size=20&page=${page}`
    }).then((response) => {
        dispatch({
            type:GET_FILE_SET_DEFINITION_BATCHES_PAGINATED,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_FILE_SET_DEFINITION_BATCHES_PAGINATED_ERROR,
            payload:err.response
        })
    })
}

/** Download CSV Fileset Definition Batches Transaction  */

export const downloadFileSetBatchesDefinitionTransactionCsv = (fileSetId,batchId,definitionId,name) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}/batches/${batchId}/definition-batches/${definitionId}/transactions?csv`,
        responseType: 'blob', // important
    })
    .then(response =>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name+'.csv');
        document.body.appendChild(link);
        link.click();
        return;
    })
}

/**Here */

export const fetchFileSetsDefinitionBatchesTransactionsPaginated = (fileSetId,batchId,definitionId,page,affiliateId) => dispatch => {
    if(affiliateId){
        axios({
            method:'GET',
            url:`${BASE_URL}/file-sets/${fileSetId}/batches/${batchId}/definition-batches/${definitionId}/transactions?affiliateId=${affiliateId}&size=20&page=${page}`
        }).then((response) => {
            dispatch({
                type:GET_FILE_SET_DEFINITION_BATCHES_TRANSACTIONS_PAGINATED,
                payload:response.data
            })
        }).catch(err => {
            dispatch({
                type:GET_FILE_SET_DEFINITION_BATCHES_TRANSACTIONS_PAGINATED_ERROR,
                payload:err.response
            })
        })
    }else{
        axios({
            method:'GET',
            url:`${BASE_URL}/file-sets/${fileSetId}/batches/${batchId}/definition-batches/${definitionId}/transactions?size=20&page=${page}`
        }).then((response) => {
            dispatch({
                type:GET_FILE_SET_DEFINITION_BATCHES_TRANSACTIONS_PAGINATED,
                payload:response.data
            })
        }).catch(err => {
            dispatch({
                type:GET_FILE_SET_DEFINITION_BATCHES_TRANSACTIONS_PAGINATED_ERROR,
                payload:err.response
            })
        })
    }
    
}

export const fetchFileSetsDefinitionBatchesDetail = (fileSetId,batchId,definitionId) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}/batches/${batchId}/definition-batches/${definitionId}`
    }).then((response) => {
        dispatch({
            type:GET_FILESET_BATCH_DEFINITION_DETAIL,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_FILESET_BATCH_DEFINITION_DETAIL_ERROR,
            payload:err.response
        })
    })
}


export const fetchFileSetsBatchesPaginated = (fileSetId,page) => dispatch => {
    axios({
        method:'GET',
        url:`${BASE_URL}/file-sets/${fileSetId}/batches?size=20&page=${page}`
    }).then((response) => {
        dispatch({
            type:GET_FILE_SET_BATCHES_PAGINATED,
            payload:response.data
        })
    }).catch(err => {
        dispatch({
            type:GET_FILE_SET_BATCHES_PAGINATED_ERROR,
            payload:err.response
        })
    })
}

export const updateFileSet = (fileSetId,value) => dispatch => {
    axios.put(`${BASE_URL}/file-sets/${fileSetId}`,value).
        then(response=>{
            dispatch({
                type:UPDATE_FILE_SET,
                payload:response.data
            })
        })
        .catch(err => {
            dispatch({
                type:UPDATE_FILE_SET_ERROR,
                payload:err.response
            })
        })
}


export const deleteFileSet = (fileSetId) => dispatch => {
    axios.delete(`${BASE_URL}/file-sets/${fileSetId}`,{}).
        then(response => {
            dispatch({
                type:DELETE_FILE_SET,
                payload:response.data
            })
        })
        .catch(err => {
            dispatch({
                type:DELETE_FILE_SET_ERROR,
                payload:err.response
            })
        })
}


export const createFileSet = (values) => dispatch => {
    axios.post(`${BASE_URL}/file-sets`,values)
        .then((response)=>{
            dispatch({
                type:CREATE_FILE_SET,
                payload:response.data
            })
        })
        .catch(err =>{
            dispatch({
                type:CREATE_FILE_SET_ERROR,
                payload:err.response
            });
        })
}

export const addFileDefinitionsToFileSet = (fileSetId,values) => dispatch => {
    axios.post(`${BASE_URL}/file-sets/${fileSetId}/definitions`,values)
        .then((response)=>{
            dispatch({
                type:ADD_FILE_DEFINITIONS_TO_FILESET,
                payload:response.data
            })
        })
        .catch(err =>{
            dispatch({
                type:ADD_FILE_DEFINITIONS_TO_FILESET_ERROR,
                payload:err.response
            });
        })
}

export const deleteFileSetDefinition = (fileSetId,definitionId) => dispatch => {
    axios.delete(`${BASE_URL}/file-sets/${fileSetId}/definitions/${definitionId}`,{}).
        then(response => {
            if(response.status == 200){
                response.data = "File Definition Deleted Successfully!";
                response.definitionId = definitionId
                dispatch({
                    type:DELETE_FILE_SET_FILE_DEFINITION,
                    payload:response.definitionId
                })
            }
        })
        .catch(err => {
            dispatch({
                type:DELETE_FILE_SET_FILE_DEFINITION_ERROR,
                payload:err.response
            })
        })
}

