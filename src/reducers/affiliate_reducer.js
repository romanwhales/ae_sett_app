import { GET_AFFILIATES,GET_AFFILIATES_ERROR,GET_AFFILIATE,GET_AFFILIATE_ERROR,CREATE_AFFILIATE,CREATE_AFFILIATE_ERROR,UPDATE_AFFILIATE,UPDATE_AFFILIATE_ERROR,DELETE_AFFILIATE,DELETE_AFFILIATE_ERROR,GET_AFFILIATE_BINS,GET_AFFILIATE_BINS_ERROR,GET_AFFILIATES_SRES,GET_AFFILIATES_SRES_ERROR,GET_AFFILIATES_UNPAGINATED,GET_AFFILIATES_UNPAGINATED_ERROR,GET_FILESET_BATCHES_SUMMARY,GET_AFFILIATE_PRODUCT_ACCOUNTS,GET_AFFILIATE_PRODUCT_ACCOUNTS_ERROR,GET_AFFILIATE_PROCESSOR_ACCOUNTS,GET_AFFILIATE_PROCESSOR_ACCOUNTS_ERROR,UPDATE_AFFILIATE_PRODUCT_ACCOUNT,UPDATE_AFFILIATE_PRODUCT_ACCOUNT_ERROR,UPDATE_AFFILIATE_PROCESSOR_ACCOUNT,UPDATE_AFFILIATE_PROCESSOR_ACCOUNT_ERROR} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case GET_AFFILIATES:
            return {...state,affiliateList:action.payload}
        case GET_AFFILIATES_UNPAGINATED:
            return {...state,affiliateListUnPaginated:action.payload}
        case GET_AFFILIATES_UNPAGINATED_ERROR:
            return {...state,affiliateListUnPaginatedError:action.payload}
        case GET_AFFILIATE_BINS:
            return {...state,affiliateBinList:action.payload}
        case GET_AFFILIATE_BINS_ERROR:
            return {...state,affiliateBinListError:action.payload}
        case GET_AFFILIATES_ERROR:
            return {...state,affiliateListError:action.payload}
        case CREATE_AFFILIATE:
            state.affiliateList.content.push(action.payload.data)
            return {...state,affiliateCreated:action.payload}
        case CREATE_AFFILIATE_ERROR:
            return {...state,affiliateCreatedError:action.payload}
        case DELETE_AFFILIATE:
            const remainingAffiliates = state.affiliateList.content.filter(item => item.id !== action.payload.id);
            state.affiliateList.content = remainingAffiliates;
            return {...state,affiliateDeleted:action.payload}
        case GET_AFFILIATE:
            return {...state,affiliate:action.payload}
        case GET_AFFILIATES_SRES:
            return {...state,affiliateSres:action.payload}
        case GET_AFFILIATES_SRES_ERROR:
            return {...state,affiliateSreError:action.payload}

        case GET_AFFILIATE_PRODUCT_ACCOUNTS:
            return {...state,affiliateProductAccounts:action.payload}
        case GET_AFFILIATE_PRODUCT_ACCOUNTS_ERROR:
            return {...state,affiliateProductAccountsError:action.payload}
        case GET_AFFILIATE_PROCESSOR_ACCOUNTS:
            return {...state,affiliateProcessorAccounts:action.payload}
        case GET_AFFILIATE_PROCESSOR_ACCOUNTS_ERROR:
            return {...state,affiliateProcessorAccountsError:action.payload}
        case UPDATE_AFFILIATE:
            // debugger;
            // let filtered_affiliate_data = state.affiliateList.content.filter(item => item.id !== action.payload.data.id);
            // filtered_affiliate_data.push(action.payload.data);
            // state.affiliateList.content = filtered_affiliate_data;
            // debugger;
            return{...state,affiliateUpdated:action.payload.data}
        case UPDATE_AFFILIATE_PRODUCT_ACCOUNT:
            let filtered_affiliate_product_account_data = state.affiliateProductAccounts.filter(function(item){
                return item.productId !== action.payload.data.productId || item.productName !== action.payload.data.productName
            })
            filtered_affiliate_product_account_data.push(action.payload.data);
            state.affiliateProductAccounts = filtered_affiliate_product_account_data;
            return {...state,affiliateProductAccountUpdated:action.payload}
        case UPDATE_AFFILIATE_PROCESSOR_ACCOUNT:
            
            let filtered_affiliate_processor_account_data = state.affiliateProcessorAccounts.filter(function(item){
                return item.processorId !== action.payload.data.processorId || item.accountType !==action.payload.data.accountType
            });
            // console.log(filtered_affiliate_processor_account_data);
            
            filtered_affiliate_processor_account_data.push(action.payload.data);
            
            state.affiliateProcessorAccounts = filtered_affiliate_processor_account_data;
            
            return {...state,affiliateProcessorAccountUpdated:action.payload}
        default:
            return state;
    }
}