import {GET_ALL_ACCOUNT_REPORT,GET_ALL_CHANNEL_REPORT,GET_DAILY_PROCESSOR_REPORT,GET_ALL_ACCOUNT_REPORT_ERROR,GET_T112_POSTING_REPORT,GET_T112_POSTING_REPORT_ERROR,GET_T464_POSTING_REPORT,GET_T464_POSTING_REPORT_ERROR,GET_VISA_REPORT,GET_VISA_REPORT_ERROR,GET_INTERAFFILIATE_ISSUER_REPORT,GET_INTERAFFILIATE_ISSUER_REPORT_ERROR,GET_INTERAFFILIATE_POSTING_REPORT,GET_INTERAFFILIATE_POSTING_REPORT_ERROR} from '../actions/types';

export default function(state ={},action){
    switch(action.type){
        case GET_VISA_REPORT:
            return {...state,visaReport:action.payload}
        case GET_VISA_REPORT_ERROR:
            return {...state,visaReportError:action.payload}
        case GET_T112_POSTING_REPORT:
            return {...state,t112PostingReport:action.payload}
        case GET_T112_POSTING_REPORT_ERROR:
            return {...state,t112PostingReportError:action.payload}
        case GET_T464_POSTING_REPORT:
            return {...state,t464PostingReport:action.payload}
        case GET_T464_POSTING_REPORT_ERROR:
            return {...state,t464PostingReportError:action.payload}
        case GET_ALL_ACCOUNT_REPORT:
            return {...state,accountReports:action.payload}
        case GET_ALL_CHANNEL_REPORT:
            return {...state,channelReports:action.payload}
        case GET_INTERAFFILIATE_ISSUER_REPORT:
            return {...state,interAffiliateIssuerReport:action.payload}
        case GET_INTERAFFILIATE_ISSUER_REPORT_ERROR:
            return {...state,interAffiliateIssuerReportError:action.payload}
        case GET_INTERAFFILIATE_POSTING_REPORT:
            return {...state,interAffiliatePostingReport:action.payload}
        case GET_INTERAFFILIATE_POSTING_REPORT_ERROR:
            return {...state,interAffiliatePostingReportError:action.payload}
        case GET_DAILY_PROCESSOR_REPORT:
            return {...state,dailyReport:action.payload}
        case GET_ALL_ACCOUNT_REPORT_ERROR:
            return {...state,accountReportsErr:action.payload}
        default:
            return state;
    }
    
}