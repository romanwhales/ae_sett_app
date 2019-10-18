import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import processors from './processor_reducer';
import products from './product_reducer';
import stats from './stats_reducer';
import batches from './batches_reducer';
import productDefinition from './product_definition_reducer';
import utils from './utils_reducer';
import fileTemplates from './file_template_reducer';
import accounts from './account_reducer';
import subGroups from './subgroup_reducer';
import fileDefinition from './file_definition_reducer';
import exceptionDefinition from './exception_reducer';
import reports from './report_reducer';
import locale from './locale_reducer';
import fileSets from './file_sets_reducer';
import banks from  './bank_reducer';
import cards from './cards_reducer';
import bins from './bin_reducer';
import affiliates from './affiliate_reducer';
import sres from './sre_reducer';
// import loading from './loading_reducer';

const rootReducer = combineReducers({
    form:formReducer,
    processors,
    products,
    stats,
    batches,
    productDefinition,
    fileTemplates,
    utils,
    accounts,
    subGroups,
    fileDefinition,
    exceptionDefinition,
    locale,
    reports,
    fileSets,
    banks,
    cards,
    bins,
    affiliates,
    sres
});

export default rootReducer;