import { GET_BATCHES,GET_BATCHES_TRANSACTIONS,GET_BATCHES_SUMMARY,POST_ALL_TRANSACTIONS,POST_TRANSACTION,MANUAL_ADD_BATCH,MANUAL_ADD_BATCH_ERROR,GET_DAILY_PROCESSORS_SUBGROUPS_SUMMARY,GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_SUMMARY,GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_ACCOUNTS_SUMMARY,GET_MANUAL_POSTINGS,POST_TRANSACTION_ERROR} from '../actions/types';

export default function(state ={},action){
    switch(action.type){
        case GET_BATCHES:
            return {...state,batches:action.payload}
        case GET_MANUAL_POSTINGS:
            return {...state,manualPostings:action.payload}
        case GET_BATCHES_TRANSACTIONS:
            return {...state,batchTransactions:action.payload}
        case GET_BATCHES_SUMMARY:
            return {...state,batchSummary:action.payload}
        case MANUAL_ADD_BATCH:
            return {...state,manualAddBatch:action.payload}
        case POST_ALL_TRANSACTIONS:
            return {...state,postAllTransactionStatus:action.payload}
        case POST_TRANSACTION:
            return {...state,postTransactionStatus:action.payload}
        case POST_TRANSACTION_ERROR:
            debugger;
            return {...state,postTransactionError:action.payload}
        case MANUAL_ADD_BATCH_ERROR:
            return {...state,manualAddBatchError:action.payload}
        case GET_DAILY_PROCESSORS_SUBGROUPS_SUMMARY:
            return {...state,dailyProcessorSubGroupSummary:action.payload}
        case GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_SUMMARY:
            return {...state,dailyProcessorSubGroupSummaryProducts:action.payload}
        case GET_DAILY_PROCESSORS_SUBGROUPS_PRODUCTS_ACCOUNTS_SUMMARY:
            return {...state,dailyProcessorSubGroupSummaryProductsAccounts:action.payload}
        default:
            return state;
    }
    
}