import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

import {FormattedMessage} from 'react-intl';
import { fetchInterAffiliateSummaryTransactions } from './actions/filesets';


function Loading() {
  return <div><FormattedMessage id='Loading' defaultMessage='Loading....'/></div>;
}





const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});



const Settlement = Loadable({
  loader:() => import('./views/Settlement/Settlement'),
  loading:Loading,
});

const Processors = Loadable({
  loader:() => import('./views/Processors/Processor'),
  loading:Loading
});

const Products = Loadable({
  loader:() => import('./views/Products/Products'),
  loading:Loading
});

const ProductDetails = Loadable({
  loader:() => import('./views/Products/ProductDetails'),
  loading:Loading
});

const UpdateProduct = Loadable({
  loader:() => import('./views/Products/UpdateProduct'),
  loading:Loading
});

const Batches = Loadable({
  loader:() => import('./views/Batches/Batches'),
  loading:Loading
});

const Summary = Loadable({
  loader:() => import('./views/Batches/Summary'),
  loading:Loading,
}) 

const ProductSetUp = Loadable({
  loader:() => import('./views/SetUp/SetUp'),
  loading:Loading
});

const ProductEditSetUp = Loadable({
  loader:() => import('./views/SetUp/EditSetUp'),
  loading:Loading
})

const EditProduct = Loadable({
  loader:() => import('./views/Products/EditProduct'),
  loading:Loading
})

const AddProducts = Loadable({
  loader:() => import('./views/SetUp/AddProducts'),
  loading:Loading
})

const Accounts = Loadable({
  loader:() => import('./views/Accounts/Accounts'),
  loading:Loading
})

const AddAccount = Loadable({
  loader:() => import('./views/Accounts/AddAccounts'),
  loading:Loading
})



const BatchesTransactions = Loadable({
  loader:() => import('./views/Batches/Transactions'),
  loading:Loading
});

const ProductDefinitions = Loadable({
  loader:() => import('./views/SetUp/Definitions'),
  loading:Loading
})

const AccountManualPosting = Loadable({
  loader:() => import('./views/Accounts/ManualPosting'),
  loading:Loading
})

const AdminLogs = Loadable({
  loader:() => import('./views/Admin/Logs'),
  loading:Loading
})

const ChannelLogs = Loadable({
  loader:() => import('./views/Admin/Channel/Logs'),
  loading:Loading
})

const FileTemplates = Loadable({
  loader:() => import('./views/FileTemplates/TemplateList'),
  loading:Loading
})

const AddFileTemplate = Loadable({
  loader:() => import('./views/FileTemplates/AddTemplate'),
  loading:Loading
});

const EditFileTemplate = Loadable({
  loader:() => import('./views/FileTemplates/EditTemplate'),
  loading:Loading
})

/**
 * Individual Processor
 */
// const ProcessorDetails= Loadable({
//   loader:() => import('./views/Processors/ProcessorDetails'),
//   loading:Loading
// });

const ProcessorSubGroups = Loadable({
  loader:() => import('./views/Processors/SubGroups'),
  loading:Loading
});

const ProcessorSubGroupsProducts = Loadable({
  loader:() => import('./views/Processors/SubGroups/Products'),
  loading:Loading
});

const ProcessorSubGroupsAddproduct = Loadable({
  loader:() => import('./views/Processors/SubGroups/AddProduct'),
  loading:Loading
})

const ProcessorSubGroupsProductsAccounts = Loadable({
  loader:() => import('./views/Processors/SubGroups/Accounts'),
  loading:Loading
});

const ProcessorSubGroupsProductsAddAccount = Loadable({
  loader:() => import('./views/Processors/SubGroups/AddAccounts'),
  loading:Loading
})
const DailySummary = Loadable({
  loader:() => import('./views/Summary/Index'),
  loading:Loading,
});

const DailyPosting = Loadable({
  loader:() => import('./views/Summary/Post'),
  loading:Loading,
})

const DailyPostingAccounts = Loadable({
  loader:() => import('./views/Summary/PostAccounts'),
  loading:Loading,
})


const DailySummarySubGroups = Loadable({
  loader:() => import('./views/Summary/SubGroups'),
  loading:Loading,
});

const DailySummarySubGroupsProducts = Loadable({
  loader:() => import('./views/Summary/Products'),
  loading:Loading,
})

const DailySummarySubGroupsProductsAccount = Loadable({
  loader:() => import('./views/Summary/Accounts'),
  loading:Loading,
})

// const Settings = Loadable({
//   loader:() => import('./views/Settings/Settings'),
//   loading:Loading
// })

const EditAccount = Loadable({
  loader:() => import('./views/Accounts/EditAccount'),
  loading:Loading
})

const Transactions = Loadable({
  loader:() => import('./views/Transactions/Transactions'),
  loading:Loading
})

const FileDefinitions = Loadable({
  loader:() => import('./views/FileDefinitions/FileDefinitions'),
  loading:Loading
});

const AddFileDefinitions = Loadable({
  loader:() => import('./views/FileDefinitions/addFileDefinitions'),
  loading:Loading
})

const ManualAddFileDefinitions = Loadable({
  loader:() => import('./views/FileDefinitions/manualAddFileDefinitions'),
  loading:Loading
})

const EditFileDefinition = Loadable({
  loader:()=> import('./views/FileDefinitions/editFileDefinition'),
  loading:Loading
})

const ManualPostings = Loadable({
  loader:() => import('./views/ManualPostings/ManualPostings'),
  loading:Loading
})

const Exceptions = Loadable({
  loader:()=> import('./views/Exceptions/Exception'),
  loading:Loading
});

const ExceptionDefinition = Loadable({
  loader:() => import('./views/Exceptions/Definitions'),
  loading:Loading
});

const ProcessorChannelExceptionSummary = Loadable({
  loader:() => import('./views/Exceptions/Channels'),
  loading:Loading
});

const AddException = Loadable({
  loader:() => import('./views/Exceptions/addDefinition'),
  loading:Loading
});

const EditProcessorExceptionDefinition = Loadable({
  loader:() => import('./views/Exceptions/editDefinition'),
  loading:Loading
});

const ChannelRows = Loadable({
  loader:() => import('./views/Exceptions/Rows'),
  loading:Loading
});

const AccountReports = Loadable({
  loader:() => import('./views/Reports/Accounts'),
  loading:Loading
});

const ChannelReports = Loadable({
  loader:() => import('./views/Reports/Channels'),
  loading:Loading
});

const DailyReports = Loadable({
  loader:() => import('./views/Reports/Daily'),
  loading:Loading
});

const Authorizations = Loadable({
  loader:()=>import('./views/Authorizations/Authorizations'),
  loading:Loading
});

const CheckerAuthorizations = Loadable({
  loader:()=>import('./views/Authorizations/CheckerAuthorizations'),
  loading:Loading
});

const Settings = Loadable({
  loader:() => import('./views/Settings/Settings'),
  loading:Loading
})

const FileSets = Loadable({
  loader: () => import('./views/FileSets/FileSets'),
  loading:Loading
})

const FileSetsDefinitions = Loadable({
  loader: () => import('./views/FileSets/FileDefinitions'),
  loading: Loading
})

const AddFileSetDefinition = Loadable({
  loader: () => import('./views/FileSets/AddFileDefinitions'),
  loading: Loading
})

const ProcessorFileSet = Loadable({
  loader: () => import('./views/Processors/FileSets'),
  loading: Loading
})

const FileSetBatches = Loadable({
  loader: () => import('./views/FileSets/Batches'),
  loading:Loading
})

const FileSetDefinitionBatches = Loadable({
  loader: () => import('./views/FileSets/BatchesDefinitions'),
  loading: Loading
})

const FileSetDefinitionBatchesTransactions = Loadable({
  loader: () => import('./views/FileSets/BatchesDefinitionTransactions'),
  loading: Loading
})




const Banks = Loadable({
  loader: () => import('./views/Banks/Banks'),
  loading: Loading
})

const Cards = Loadable({
  loader: () => import('./views/Cards/Cards'),
  loading:Loading
})

const Bins = Loadable({
  loader: () => import('./views/Bins/Bins'),
  loading: Loading
})

// const Affiliates = Loadable({
//   loader: () => import('./views/Affiliates/Affiliates'),
//   loading:Loading
// })

const Affiliates2 = Loadable({
  loader:() => import('./views/Affiliates/Affiliates2'),
  loading:Loading
})

const Affiliates3 = Loadable({
  loader:() => import('./views/Affiliates/Affiliates3'),
  loading:Loading
})

const Sres = Loadable({
  loader: () => import('./views/Sres/Sres'),
  loading: Loading
})

const AffiliatesBins = Loadable({
  loader: () => import('./views/Affiliates/Bins'),
  loading: Loading
})

const AddAffiliateBin = Loadable({
  loader: () => import('./views/Affiliates/addBin'),
  loading: Loading
})

const AffiliateSres = Loadable({
  loader: () => import('./views/Affiliates/Sres'),
  loading:Loading
})

const AddAffiliateSre = Loadable({
  loader: () => import('./views/Affiliates/addSre'),
  loading: Loading
})

const BankCards = Loadable({
  loader: () => import('./views/Banks/Cards'),
  loading:Loading
})

const AddBankCards = Loadable({
  loader:() => import('./views/Banks/addCards'),
  loading: Loading
})

const VisaDashboard = Loadable({
  loader:() => import('./views/Schemes/Dashboard'),
  loading:Loading
})

const InterAffiliateDashboard = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate'),
  loading:Loading
})

const MastercardDashboard = Loadable({
  loader:() => import('./views/Schemes/MasterCard'),
  loading: Loading
})

const MastercardT112Transactions = Loadable({
  loader:() => import('./views/Schemes/MasterCard/T112/Transactions'),
  loading:Loading
})

const MastercardT112Summary = Loadable({
  loader: () => import('./views/Schemes/MasterCard/T112/Summary'),
  loading:Loading
})

const MastercardT464Transactions = Loadable({
  loader:() => import('./views/Schemes/MasterCard/T464/Transactions'),
  loading:Loading
})

const MastercardT461Transactions = Loadable({
  loader: () => import('./views/Schemes/MasterCard/T461/Transactions'),
  loading:Loading
})

const MastercardT140Transactions = Loadable({
  loader:() => import('./views/Schemes/MasterCard/T140/Transactions'),
  loading:Loading
})

const MasterCardT464Summary = Loadable({
  loader:() => import('./views/Schemes/MasterCard/T464/Summary'),
  loading:Loading
})

const InterAffiliateAcquirerSummary = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate/Acquirer/Summary'),
  loading:Loading
})

const VisaSummary = Loadable({
  loader: ()=> import('./views/Schemes/Visa/Summary'),
  loading:Loading
})

const VisaAcquirerSummary = Loadable({
  loader:() => import('./views/Schemes/Visa/Acquirer/Summary'),
  loading:Loading
})

const VisaIssuerSummary = Loadable({
  loader:() => import('./views/Schemes/Visa/Issuer/Summary'),
  loading:Loading
})

const InterAffiliateIssuerSummary = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate/Issuer/Summary'),
  loading:Loading
})


const UserManagement = Loadable({
  loader:() => import('./views/Users/UserManagement'),
  loading:Loading
})

const FileSetBatchSummary = Loadable({
  loader:() => import('./views/FileSets/BatchesSummary'),
  loading:Loading
})

const EditAffiliate = Loadable({
  loader:() => import('./views/Affiliates/EditAffiliate'),
  loading:Loading
})

const AffiliateProductAccounts = Loadable({
  loader:() => import('./views/Affiliates/ProductsAccounts'),
  loading:Loading
})

const MastercardReports = Loadable({
  loader:() => import('./views/Schemes/MasterCard/Reports'),
  loading:Loading
})

const VisaReports = Loadable({
  loader:() => import('./views/Schemes/Visa/Reports'),
  loading:Loading
})

const InterAffiliatePostingReports = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate/Reports'),
  loading:Loading
})

const AffiliateProcessorAccounts = Loadable({
  loader:() => import('./views/Affiliates/ProcessorAccounts'),
  loading:Loading
})

// const MastercardDashboard = Loadable({
//   loader:() => import('./views/Schemes/MastercardDashbaord'),
//   loading:Loading
// })

const MastercardSettlement = Loadable({
  loader:() => import('./views/Schemes/MasterCardSettlement'),
  loading:Loading
})

const InterswitchSettlement = Loadable({
  loader:() => import('./views/Schemes/InterswitchSettlement'),
  loading:Loading
})

const InterswitchSettlementDailySummary = Loadable({
  loader:() => import('./views/Schemes/Interswitch/DailySummary'),
  loading:Loading
})

const MastercardAdvisementDetail = Loadable({
  loader:() => import('./views/Schemes/MasterCard/AdvisementDetail'),
  loading:Loading
})

const InterAffiliateSettlement = Loadable({
  loader: () => import('./views/Schemes/InterAffiliateSettlement'),
  loading:Loading
})

const VisaSettlement = Loadable({
  loader:() => import('./views/Schemes/VisaSettlement'),
  loading:Loading
})

const InterAffiliateIssuerTransactions = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate/Issuer/Transactions'),
  loading:Loading
})

const InterAffiliateAcquirerTransactions = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate/Acquirer/Transactions'),
  loading:Loading
})

const InterAffiliateSummary = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate/Summary'),
  loading:Loading
})

const InterAffiliateSummaryTransactions = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate/SummaryTransactions'),
  loading:Loading
})

const VisaAcquirerTransactions = Loadable({
  loader:() => import('./views/Schemes/Visa/Acquirer/Transactions'),
  loading:Loading
})

const VisaIssuerTransactions = Loadable({
  loader:() => import('./views/Schemes/Visa/Issuer/Transactions'),
  loading:Loading
})

const MastercardT112Reports = Loadable({
  loader:() => import('./views/Schemes/MasterCard/T112/Reports'),
  loading:Loading
})

const MastercardT464Reports = Loadable({
  loader:() => import('./views/Schemes/MasterCard/T464/Reports'),
  loading:Loading
})

const AcquirerInterAffiliateReports = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate/Acquirer/Reports'),
  loading:Loading
})

const InterAffiliateReports = Loadable({
  loader:() => import('./views/Schemes/InterAffiliate/Issuer/Reports'),
  loading:Loading
})

const IssuerVisaReports = Loadable({
  loader:() => import('./views/Schemes/Visa/Issuer/Reports'),
  loading:Loading
})

const AcquirerVisaReports = Loadable({
  loader:() => import('./views/Schemes/Visa/Acquirer/Reports'),
  loading:Loading
})

const VSSFiles = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/Index'),
  loading:Loading
})

const AllVss110 = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss110/All110s'),
  loading:Loading
})

const AllVss116 = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss116/All116s'),
  loading:Loading
}) 

const Vss110DailySummary = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss110/Summary'),
  loading:Loading
})

const VSS116DailySummary = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss116/Summary'),
  loading:Loading
})

const AllVss120 = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss120/All120s'),
  loading:Loading
})

const VSS120DailySummary = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss120/Summary'),
  loading:Loading
})

const AllVss300 = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss300/All300s'),
  loading:Loading
})

const VSS300DailySummary = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss300/Summary'),
  loading:Loading
})

const AllVss900 = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss900/All900s'),
  loading:Loading
})

const VSS900DailySummary = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss900/Summary'),
  loading:Loading
})

const AllVss115 = Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss115/All115s'),
  loading:Loading
})

const VSS115DailySummary= Loadable({
  loader:() => import('./views/Schemes/Visa/Vss/vss115/Summary'),
  loading:Loading
})










// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: <FormattedMessage id="home" defaultMessage="Home"/>, component: DefaultLayout },
  { path: '/dashboard', name: <FormattedMessage id="dashboard" defaultMessage='Dashboard'/>, component: Dashboard },
  { path:'/settlement/products/:id',exact:true, name:<FormattedMessage id='Product Set Up' defaultMessage='Product Set Up'/>, component: Settlement},
  { path:'/settlement/products',name:<FormattedMessage id='Product Set Up' defaultMessage='Product Set Up'/>,component:Settlement,exact:true},
  {path:'/processors',name: <FormattedMessage id='Processors' defaultMessage='Processors'/>,component:Processors,exact:true},
  {path:'/processors/:id/filesets',name:'Processors FileSet',component:ProcessorFileSet,exact:true},
  {path:'/products',name:<FormattedMessage id='Products' defaultMessage='Products'/>,component:Products,exact:true},
  {path:'/products/addProducts',name:<FormattedMessage id='Add Product' defaultMessage='Add Product'/>,component:AddProducts,exact:true},
  {path:'/products/addProducts/:id',name:<FormattedMessage id='Add Product' defaultMessage='Add Product'/>,component:AddProducts,exact:true},
  {path:'/processors/:id/subgroups/:subgroupid/products',name:<FormattedMessage id='Products' defaultMessage='Products'/>,exact:true,component:ProcessorSubGroupsProducts},
  {path:'/processors/:id/subgroups/:subgroupid/products/addProduct',name:<FormattedMessage id='Add Product' defaultMessage='Add Product'/>,exact:true,component:ProcessorSubGroupsAddproduct},
  {path:'/processors/:id/subgroups/:subgroupid/products/:productid/accounts',name:<FormattedMessage id='Accounts' defaultMessage='Accounts'/>,exact:true,component:ProcessorSubGroupsProductsAccounts},
  {path:'/processors/:id/subgroups/:subgroupid/products/:productid/accounts/addAccount',name:<FormattedMessage id='Add Account' defaultMessage='Add Account'/>,exact:true,component:ProcessorSubGroupsProductsAddAccount},
  // {path:'/subgroups/:id/products',name:'View Products',component:SubGroupProducts,exact:true},
  {path:'/daily-summary',name:<FormattedMessage id='Daily Summary' defaultMessage='Daily Summary'/>,component:DailySummary,exact:true},
  {path:'/daily-summary/:id/subgroups',name:<FormattedMessage id='SubGroups' defaultMessage='Daily Summary'/>,component:DailySummarySubGroups,exact:true},
  {path:'/transactions',name:<FormattedMessage id='Transactions' defaultMessage='Transactions'/>,component:Transactions,exact:true},
  {path:'/reports',name:<FormattedMessage id='Reports' defaultMessage='Reports'/>,component:Transactions,exact:true},
  {path:'/daily-summary/:id/subgroups/products',name:<FormattedMessage id='Products' defaultMessage='Products'/>,component:DailySummarySubGroupsProducts,exact:true},
  {path:'/daily-summary/:id/subgroups/products/accounts',name:<FormattedMessage id='Account'defaultMessage='Account'/>,component:DailySummarySubGroupsProductsAccount,exact:true},
  {path:'/daily-posting',name:<FormattedMessage id='Daily Posting' defaultMessage='Daily Posting'/>,component:DailyPosting,exact:true},
  {path:'/daily-posting/:id/accounts',name:<FormattedMessage id='Daily Posting Accounts' defaultMessage='Daily Posting Accounts'/>,component:DailyPostingAccounts,exact:true},
  {path:'/settings',name:<FormattedMessage id='Settings' defaultMessage='Settings'/>,component:Settings,exact:true},
  {path:'/accounts',name:<FormattedMessage id='Accounts' defaultMessage='Accounts'/>,component:Accounts,exact:true},
  {path:'/accounts/addAccounts',name:<FormattedMessage id='Add Account' defaultMessage='Add Account'/>,component:AddAccount,exact:true},
  {path:'/products/addAccounts/:productId',name:<FormattedMessage id='Add Account' defaultMessage='Add Account'/>,component:AddAccount,exact:true},
  {path:'/accounts/:id/edit',name:<FormattedMessage id='Edit Account' defaultMessage='Edit Account'/>,component:EditAccount,exact:true},
  {path:'/file-definitions',name:<FormattedMessage id='File Definitions' defaultMessage='File Definitions'/>,component:FileDefinitions,exact:true},
  {path:'/file-definitions/add',name:<FormattedMessage id='Add File Definitions' defaultMessage='Add File Definitions'/>,component:AddFileDefinitions,exact:true},
  {path:'/file-definitions/manualAddition',name:<FormattedMessage id='Add File Definitions Manually' defaultMessage='Add File Definitions Manually'/>,component:ManualAddFileDefinitions,exact:true},
  {path:'/file-definitions/:id/edit',name:<FormattedMessage id='Edit File Definition' defaultMessage='Edit File Definition'/> ,component:EditFileDefinition,exact:true},
  // {path:'/accounts/:id/details',name:'Account Details',component:},
  /**Real Bread Crumb */
  {path:'/accounts/:id/definitions',name:<FormattedMessage id='Account Definitions' defaultMessage='Account Definitions'/>,component:ProductDefinitions,exact:true},
  // {path:'/accounts/:id/definitions/manualPosting',name:'Manual Posting',component:AccountManualPosting,exact:true},
   {path:'/processors/:id/subgroups',name:<FormattedMessage id='SubGroups' defaultMessage='SubGroups'/>,exact:true,component:ProcessorSubGroups},
   {path:'/processors/:id/subgroups/addProduct',name:<FormattedMessage id='Add Product' defaultMessage='Add Product'/>,component:AddProducts,exact:true},
  {path:'/accounts/:accountid/definitions/editdefinition/:id',name:<FormattedMessage id='Edit Account Definition' defaultMessage='Edit Account Definition'/>,component:ProductEditSetUp,exact:true},
  {path:'/products/:id/accounts',name:<FormattedMessage id="Product's Account" defaultMessage="Product's Account"/>,component:ProductDetails,exact:true},
  {path:'/accounts/:id/definitions/setup',name:<FormattedMessage id='Account Definition Set Up' defaultMessage='Account Definition Set Up'/>,component:ProductSetUp,exact:true},
  {path:'/products/setup/:id',name:<FormattedMessage id='Product Set Up' defaultMessage='Product Set Up'/>,component:ProductSetUp,exact:true},
  {path:'/products/:id/update',name:<FormattedMessage id='Update Product' defaultMessage='Update Product'/>,component:UpdateProduct,exact:true},
  {path:'/products/:id/edit',name:<FormattedMessage id='Edit Product' defaultMessage='Edit Product'/>,component:EditProduct,exact:true},
  {path:'/batches',name:<FormattedMessage id='Batches' defaultMessage='Batches'/>,component:Batches,exact:true},
  {path:'/summary',name:<FormattedMessage id='Batches Summary' defaultMessage='Batches Summary'/>,component:Summary,exact:true},
  {path:'/batches/:id/transactions',name:<FormattedMessage id='Batches Transactions' defaultMessage='Batches Transactions'/>,component:BatchesTransactions,exact:true},
  {path:'/admin/logs',name:<FormattedMessage id='Admin Logs' defaultMessage='Admin Logs'/>,component:AdminLogs,exact:true},
  {path:'/channel/logs',name:<FormattedMessage id='Channel Logs' defaultMessage='Channel Logs'/>,component:ChannelLogs,exact:true},
  {path:'/file/templates',name:<FormattedMessage id='File Templates' defaultMessage='File Templates'/>,component:FileTemplates,exact:true},
  {path:'/file/templates/addTemplate',name:<FormattedMessage id='Add File Template' defaultMessage='Add File Template'/>,component:AddFileTemplate,exact:true},
  {path:'/file/templates/:id/update',name:<FormattedMessage id='Edit Template' defaultMessage='Edit Template'/>,component:EditFileTemplate,exact:true},
  {path:'/manualPostings',name:<FormattedMessage id='Manual Postings' defaultMessage='Manual Postings'/>,component:ManualPostings,exact:true},
  {path:'/manualPostings/add',name:<FormattedMessage id='Add Manual Posting' defaultMessage='Add Manual Posting'/>,component:AccountManualPosting,exact:true},
  {path:'/exceptions',name:<FormattedMessage id='Exceptions' defaultMessage='Exceptions'/>,component:Exceptions,exact:true},
  {path:'/exceptions/:id/rows',name:<FormattedMessage id='Processor Channel Rows' defaultMessage='Processor Channel Rows'/>,component:ChannelRows,exact:true},
  {path:'/exceptions/definitions',name:<FormattedMessage id='Processor Exception Definition' defaultMessage='Processor Exception Definition'/>,component:ExceptionDefinition,exact:true},
  {path:'/exceptions/:id/channels',name:<FormattedMessage id='Processor Channel Summary' defaultMessage='Processor Channel Summary'/>,component:ProcessorChannelExceptionSummary,exact:true},
  {path:'/exceptions/:id/definitions/edit',name:<FormattedMessage id='Edit Processor Exception Definiiton' defaultMessage='Edit Processor Exception Definiiton'/>,component:EditProcessorExceptionDefinition,exact:true},
  {path:'/exceptions/definitions/addException',name:<FormattedMessage id='Add Exception' defaultMessage='Add Exception'/>,component:AddException,exact:true},
  // {path:'/processor/:id',name:'Processor',exact:true,component:ProcessorDetails},
  {path:'/reports/accounts',name:<FormattedMessage id='Account Reports' defaultMessage='Account Reports'/>,component:AccountReports,exact:true},
  {path:'/reports/channels',name:<FormattedMessage id='Channel Reports' defaultMessage='Channel Reports'/>,component:ChannelReports,exact:true},
  {path:'/reports/daily',name:<FormattedMessage id='Daily Reports' defaultMessage='Daily Reports'/>,component:DailyReports,exact:true},
  {path:'/checker-authorizations',name:<FormattedMessage id='Checker Authorizations' defaultMessage='Checker Authorizations'/>,component:CheckerAuthorizations,exact:true},
  {path:'/authorizations',name:<FormattedMessage id='Authorizations' defaultMessage='Authorizations'/>,component:Authorizations,exact:true},
  {path:'/filesets',name:<FormattedMessage id='FileSets' defaultMessage='FileSets'/>,component:FileSets,exact:true},
  {path:'/interaffiliates/:id/batches',name:'InterAffiliates Batches',component:FileSetBatches,exact:true},
  {path:'/mastercard/:id/batches',name:'MasterCard Batches',component:FileSetBatches,exact:true},
  {path:'/mastercardDashboard',name:'MasterCard Dashboard',component:MastercardDashboard,exact:true},
  {path:'/interswitch/:id/batches',name:'Interswitch Batches',component:FileSetBatches,exact:true},
  {path:'/visa/:id/batches',name:'Visa Batches',component:FileSetBatches,exact:true},
  {path:'/filesets/:id/batches',name:<FormattedMessage id='FileSet Batches' defaultMessage='FileSet Batches'/>,component:FileSetBatches,exact:true},
  {path:'/filesets/:id/definitions',name:<FormattedMessage id='FileSet Definitions' defaultMessage='FileSet Definitions'/>,component:FileSetsDefinitions,exact:true},
  {path:'/filesets/:id/definitions/add',name:<FormattedMessage id='Add FileSet Definition' defaultMessage='Add FileSet Definition'/>,component:AddFileSetDefinition,exact:true},
  {path:'/filesets/:filesetId/batches/:batchesId/definitionBatches',name:<FormattedMessage id='FileSetBatchesDefinition' defaultMessage='FileSetBatchesDefinition'/>,component:FileSetDefinitionBatches,exact:true},
  {path:'/filesets/:filesetId/batches/:batchesId/summary',name:<FormattedMessage id='FileSetBatchesSummary' defaultMessage='FileSetBatchesSummary'/>,component:FileSetBatchSummary,exact:true},
  {path:'/filesets/:filesetId/batches/:batchesId/definitionBatches/:definitionId/transactions',name:<FormattedMessage id='FileSetDefinitionBatchesTransactions' defaultMessage='FileSetDefinitionBatchesTransactions'/>,component:FileSetDefinitionBatchesTransactions,exact:true},
  {
    path:'/mastercard/settlement/:date/detail',name:<FormattedMessage id="Mastercard Advisement Detail" defaultMessage="Mastercard Advisement Detail"/>,component:MastercardAdvisementDetail,exact:true
  },
  {path:'/mastercard/settlement/t112/:fileId/transactions',name:<FormattedMessage id='MasterCardT112Transactions' defaultMessage='MasterCardT112Transactions'/>,component:MastercardT112Transactions,exact:true},
  {path:'/mastercard/settlement/t112/:fileId/summary',name:<FormattedMessage id='MasterCardT112Summary' defaultmessage='MasterCardT112Summary'/>,component:MastercardT112Summary,exact:true},
  {
    path:'/mastercard/settlement/t464/:fileId/summary',name:<FormattedMessage id="MasterCardT464Summary" defaultMessage="MasterCardT464Summary"/>,component:MasterCardT464Summary,exact:true
  },
  {
    path:'/mastercard/settlement/t464/:fileId/transactions',name:<FormattedMessage id="MasterCard T464 Transactions" defaultMessage="MastercardT464Transactions"/>,component:MastercardT464Transactions,exact:true},
  {
    path:'/mastercard/settlement/t461/:fileId/transactions',name:<FormattedMessage id="MasterCard T461 Transactions" defaultMessage="MasterCard T461 transactions"/>,component:MastercardT461Transactions,exact:true
  },
  {
    path:'/mastercard/settlement/t140/:fileId/transactions',name:<FormattedMessage id="MasterCard T140 Transactions" defaultMessage="Mastercard T140 Transactions"/>,component:MastercardT140Transactions,exact:true
  },
  {
    path:'/mastercard/reports',name:<FormattedMessage id="Scheme Reports" defaultMessage="Scheme Reports"/>,component:MastercardReports,exact:true
  },
  {
    path:'/mastercard/reports/t112',name:<FormattedMessage id="T112 Reports" defaultMessage="T112 Reports"/>,component:MastercardT112Reports,exact:true
  },
  {
    path:'/mastercard/reports/t464',name:<FormattedMessage id="T464 Reports" defaultMessage="T464 Reports"/>,component:MastercardT464Reports,exact:true
  },
  {
    path:'/interAffiliate/reports',name:<FormattedMessage id="InterAffiliate Reports" defaultMessage="InterAffiliate Reports"/>,component:InterAffiliatePostingReports,exact:true
  },
  {
    path:'/visa/reports',name:<FormattedMessage id="Visa Reports" defaultMessage="Visa Reports"/>,component:VisaReports,exact:true
  },
  {
    path:'/visa/reports/issuer',name:<FormattedMessage id="Visa Issuer Reports" defaultMessage="Visa Issuer Reports"/>,component:IssuerVisaReports,exact:true
  },
  {
    path:'/visa/reports/acquirer',name:<FormattedMessage id="Visa Acquirer Reports" defaultMessage="Visa Acquirer Reports"/>,component:AcquirerVisaReports,exact:true
  },
  {
    path:'/interAffiliate/reports/posting',name:<FormattedMessage id="InterAffiliate Posting Reports" defaultMessage="Issuer InterAffiliate Reports"/>,component:InterAffiliateReports,exact:true
  },{
    path:'/interAffiliate/reports/acquirer',name:<FormattedMessage id="Acquirer interAffiliate Reports" defaultMessage="Acquirer InterAffiliate Reports"/>,component:AcquirerInterAffiliateReports,exact:true
  },
  {path:'/configuration/banks',name:<FormattedMessage id='Banks' defaultMessage='Banks'/>,component:Banks,exact:true},
  {path:'/configuration/cards',name:<FormattedMessage id='Cards' defaultMessage='Cards'/>,component:Cards,exact:true},
  {path:'/configuration/bins',name:<FormattedMessage id='Bins' defaultMessage='Bins'/>,component:Bins,exact:true},
  // {path:'/configuration/affiliates',name:<FormattedMessage id='Affiliates' defaultMessage='Affiliates'/>,component:Affiliates,exact:true},
  {path:'/configuration/affiliates',name:<FormattedMessage id='Affiliates' defaultMessage='Affiliates'/>,component:Affiliates2,exact:true},
  {
    path:'/configuration/affiliates3',name:<FormattedMessage id="Affilaites" defaultMessage="Affilaites"/>,component:Affiliates3,exact:true
  },
  {path:'/configuration/affiliates/:id/bins/addbin',name:<FormattedMessage id='Add Bin' defaultMessage='Add Bin'/>,component:AddAffiliateBin,exact:true},
  {path:'/configuration/affiliates/:id/bins',name:<FormattedMessage id='Bins' defaultMessage='Bins'/>,component:AffiliatesBins,exact:true},
  {path:'/configuration/affiliates/:id/product-accounts',name:<FormattedMessage id="Affiliate Product Accounts" defaultMessage="Affiliate Product Accounts"/>,component:AffiliateProductAccounts,exact:true},
  {path:'/configuration/affiliates/:id/details',name:<FormattedMessage id="Affiliate Details" defaultMessage="Affiliate Details"/>,component:AffiliateProcessorAccounts,exact:true},
  {
    path:'/configuration/affiliates/:code/edit',name:<FormattedMessage id="Edit Affiliate" defaultMessage="Edit Affiliate"/>,component:EditAffiliate,exact:true
  },
  {path:'/configuration/affiliates/:id/sres',exact:true,name:<FormattedMessage id='Affiliate Sres' defaultMessage="Affiliate Sres"/>,component:AffiliateSres},
  {path:'/configuration/sres',name:<FormattedMessage id='Sres' defaultMessage='Sres'/>,component:Sres,exact:true},
  {path:'/configuration/affiliates/:id/addSre',name:<FormattedMessage id='Add Sre' defaultMessage='Add Sre'/>,exact:true,component:AddAffiliateSre},
  {path:'/configuration/banks/:id/cards',name:<FormattedMessage id='Cards' defaultMessage='Cards'/>,exact:true,component:BankCards},
  {path:'/configuration/banks/:id/cards/addCards',name:<FormattedMessage id='Add Card' defaultMessage='Add Card'/>,exact:true,component:AddBankCards},
  {path:'/visa/dashboard',name:<FormattedMessage id='Visa Dashboard' defaultMessage='Visa Dashboard'/>, exact:true,component:VisaDashboard},
  {path:'/inter-affiliate/dashboard',name:<FormattedMessage id='InterAffiliate Dashboard' defaultMessage='InterAffiliate Dashboard'/>,exact:true,component:InterAffiliateDashboard},
  {path:'/mastercard/dashboard',name:<FormattedMessage id='Mastercard Dashboard' defaultMessage='Mastercard Dashboard'/>,exact:true,component:MastercardDashboard},
  {path:'/mastercard/settlement',name:<FormattedMessage id="Mastercard Settlement" defaultMessage='Mastercard Settlement'/>,exact:true,component:MastercardSettlement},
  {path:'/interAffiliate/settlement',name:<FormattedMessage id="InterAffiliate Settlement" defaultMessage="InterAffiliate Settlement"/>,exact:true,component:InterAffiliateSettlement},
  {
    path:'/interAffiliate/settlement/acquirer/:date/summary',name:<FormattedMessage id="InterAffiliate Acquirer Summary" defaultMessage="InterAffiliate Acquirer Summary"/>,component:InterAffiliateAcquirerSummary,exact:true
  },
  {
    path:'/interAffiliate/settlement/issuer/:date/summary',name:<FormattedMessage id="InterAffiliate Issuer Summary" defaultMessage="InterAffiliate Issuer Summary"/>,component:InterAffiliateIssuerSummary,exact:true
  },
  {path:'/visa/settlement',name:<FormattedMessage id="Visa Settlement" defaultMessage="Visa Settlement"/>,exact:true,component:VisaSettlement},
  {
    path:'/interswitch/settlement',name:<FormattedMessage id="Interswitch Settlement" defaultMessage="Interswitch Settlement"/>,exact:true,component:InterswitchSettlement
  },
  {
    path:'/interswitch/settlement/:id/summary',name:<FormattedMessage id="Interswitch Settlement Summary" defaultMessage="Interswitch Settlement Summary"/>,exact:true,component:InterswitchSettlementDailySummary
  },
  {
    
    path:'/visa/settlement/vssFiles/:date',name:<FormattedMessage id="VSS Files" defaultMessage="VSS Files"/>,exact:true,component:VSSFiles
  },
  {
    path:'/visa/settlement/vss110',name:<FormattedMessage id="VSS 110" defaultMessage="VSS 110"/>,exact:true,component:AllVss110
  },
  {
    path:'/visa/settlement/vss116',name:<FormattedMessage id="VSS 116" defaultMessage="VSS 116"/>,exact:true,component:AllVss116
  },
  {
    path:'/visa/settlement/:date/vss116/details',name:<FormattedMessage id="VSS 116 Details" defaultMessage="VSS 116 Details"/>,exact:true,component:VSS116DailySummary
  },
  {
    path:'/visa/settlement/vss120',name:<FormattedMessage id="VSS 120" defaultMessage="VSS 120"/>,exact:true,component:AllVss120
  },
  {
    path:'/visa/settlement/:date/vss120/details',name:<FormattedMessage id="VSS 120 Details" defaultMessage="VSS 120 Details"/>,exact:true,component:VSS120DailySummary
  },
  {
    path:'/visa/settlement/vss115',name:<FormattedMessage id="VSS 115" defaultMessage="VSS 115"/>,exact:true,component:AllVss115
  },
  {
    path:'/visa/settlement/:date/vss115/details',name:<FormattedMessage id="VSS 115 Details" defaultMessage="VSS 115 Details"/>,exact:true,component:VSS115DailySummary
  },
  {
    path:'/visa/settlement/vss300',name:<FormattedMessage id="VSS 300" defaultMessage="VSS 300"/>, exact:true,component:AllVss300
  },
  {
    path:'/visa/settlement/:date/vss300/details',name:<FormattedMessage id="VSS 300 Details" defaultMessage="VSS 300 Details"/>,exact:true,component:VSS300DailySummary
  },
  {
    path:'/visa/settlement/vss900s',name:<FormattedMessage id="VSS 900" defaultMessage = "VSS 900"/>,exact:true,component:AllVss900
  },
  {
    path:'/visa/settlement/:date/vss900s/details',name:<FormattedMessage id="VSS 900 Details" defaultMessage="VSS 900 Details"/>,exact:true,component:VSS900DailySummary
  },
  {
    path:'/visa/settlement/:date/vss110/details',name:<FormattedMessage id="VSS 110 Details" defaultMessage="VSS 110 Details"/>,exact:true,component:Vss110DailySummary 
  },
  // {path:'/visa/settlement/issuer/:date/transactions',name:<FormattedMessage id="Issuer Transactions" defaultMessage="Issuer Transactions"/>,exact:true,component:VisaIssuerTransactions},
  {path:'/interAffiliate/settlement/acquirer/:date/transactions',name:<FormattedMessage id="Acquirer Transactions" defaultMessage="Acquirer Transactions"/>,exact:true,component:InterAffiliateAcquirerTransactions},

  {
    path:'/interAffiliate/settlement/issuer/:date/transactions',name:<FormattedMessage id="Issuer Transactions" defaultMessage="Issuer Transactions"/>,exact:true,component:InterAffiliateIssuerTransactions
  },{
    path:'/visa/settlement/acquirer/:date/transactions',name:<FormattedMessage id="Acquirer Transactions" defaultMessage="Acquirer Transactions" />,exact:true,component:VisaAcquirerTransactions
  },{
    path:'/visa/settlement/issuer/:date/transactions',name:<FormattedMessage id="Issuer Transactions" defaultMessage="Issuer Transactions"/>, exact:true,component:VisaIssuerTransactions
  },{
    path:'/interAffiliate/settlement/summary/:date/transactions',name:<FormattedMessage id="Summary Transactions" defaultMessage="Summary Transactions"/>,exact:true,component:InterAffiliateSummaryTransactions
  },
  {
    path:'/interAffiliate/settlement/:date/summary',name:<FormattedMessage id="InterAffiliate Summary" defaultMessage="InterAffiliate Summary"/>,exact:true,component:InterAffiliateSummary
  },
  {
    path:'/visa/settlement/:date/posting',name:<FormattedMessage id="Visa Summary" defaultMessage="Visa Summary"/>,exact:true,component:VisaSummary
  },
  {
    path:'/visa/settlement/acquirers/:date/summary',name:<FormattedMessage id="Visa Acquirer Summary" defaultMessage="Visa Acquirer Summary"/>,exact:true,component:VisaAcquirerSummary
  },{
    path:'/visa/settlement/issuers/:date/summary',name:<FormattedMessage id="Visa Issuer Summary" defaultMessage="Visa Issuer Summary"/>,exact:true,component:VisaIssuerSummary
  },
  {path:'/user-management',name:<FormattedMessage id='User Management' defaultMessage='User Management'/>,exact:true,component:UserManagement}
  
];

export default routes;
