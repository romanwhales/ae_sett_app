import { TOP_CONTRIBUTORS, BOTTOM_CONTRIBUTORS,GET_DAILY_PROCESSORS_SUMMARY,GET_DAILY_PROCESSOR_ACCOUNT_POST,GET_BOTTOM_CONTRIBUTOR_ERROR } from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case TOP_CONTRIBUTORS:
            return {...state,topContributorsList:action.payload}
        case BOTTOM_CONTRIBUTORS:
            return {...state,bottomContributorsList:action.payload}
        case GET_DAILY_PROCESSORS_SUMMARY:
            return {...state,dailyProcessorSummary:action.payload}
        case GET_DAILY_PROCESSOR_ACCOUNT_POST:
            return {...state,dailyProcesorAccount:action.payload}
        case GET_BOTTOM_CONTRIBUTOR_ERROR:
            return {...state,bottomContributorListError:action.payload}
        default:
            return state;
    }
}