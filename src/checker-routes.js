import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}



// const Cards = Loadable({
//   loader: () => import('./views/Base/Cards'),
//   loading: Loading,
// });

// const Carousels = Loadable({
//   loader: () => import('./views/Base/Carousels'),
//   loading: Loading,
// });

// const Collapses = Loadable({
//   loader: () => import('./views/Base/Collapses'),
//   loading: Loading,
// });

// const Dropdowns = Loadable({
//   loader: () => import('./views/Base/Dropdowns'),
//   loading: Loading,
// });

// const Forms = Loadable({
//   loader: () => import('./views/Base/Forms'),
//   loading: Loading,
// });

// const Jumbotrons = Loadable({
//   loader: () => import('./views/Base/Jumbotrons'),
//   loading: Loading,
// });

// const ListGroups = Loadable({
//   loader: () => import('./views/Base/ListGroups'),
//   loading: Loading,
// });

// const Navbars = Loadable({
//   loader: () => import('./views/Base/Navbars'),
//   loading: Loading,
// });

// const Navs = Loadable({
//   loader: () => import('./views/Base/Navs'),
//   loading: Loading,
// });

// const Paginations = Loadable({
//   loader: () => import('./views/Base/Paginations'),
//   loading: Loading,
// });

// const Popovers = Loadable({
//   loader: () => import('./views/Base/Popovers'),
//   loading: Loading,
// });

// const ProgressBar = Loadable({
//   loader: () => import('./views/Base/ProgressBar'),
//   loading: Loading,
// });

// const Switches = Loadable({
//   loader: () => import('./views/Base/Switches'),
//   loading: Loading,
// });

// const Tables = Loadable({
//   loader: () => import('./views/Base/Tables'),
//   loading: Loading,
// });

// const Tabs = Loadable({
//   loader: () => import('./views/Base/Tabs'),
//   loading: Loading,
// });

// const Tooltips = Loadable({
//   loader: () => import('./views/Base/Tooltips'),
//   loading: Loading,
// });

// const BrandButtons = Loadable({
//   loader: () => import('./views/Buttons/BrandButtons'),
//   loading: Loading,
// });

// const ButtonDropdowns = Loadable({
//   loader: () => import('./views/Buttons/ButtonDropdowns'),
//   loading: Loading,
// });

// const ButtonGroups = Loadable({
//   loader: () => import('./views/Buttons/ButtonGroups'),
//   loading: Loading,
// });

// const Buttons = Loadable({
//   loader: () => import('./views/Buttons/Buttons'),
//   loading: Loading,
// });

// const Charts = Loadable({
//   loader: () => import('./views/Charts'),
//   loading: Loading,
// });

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

// const CoreUIIcons = Loadable({
//   loader: () => import('./views/Icons/CoreUIIcons'),
//   loading: Loading,
// });

// const Flags = Loadable({
//   loader: () => import('./views/Icons/Flags'),
//   loading: Loading,
// });

// const FontAwesome = Loadable({
//   loader: () => import('./views/Icons/FontAwesome'),
//   loading: Loading,
// });

// const SimpleLineIcons = Loadable({
//   loader: () => import('./views/Icons/SimpleLineIcons'),
//   loading: Loading,
// });

// const Alerts = Loadable({
//   loader: () => import('./views/Notifications/Alerts'),
//   loading: Loading,
// });

// const Badges = Loadable({
//   loader: () => import('./views/Notifications/Badges'),
//   loading: Loading,
// });

// const Modals = Loadable({
//   loader: () => import('./views/Notifications/Modals'),
//   loading: Loading,
// });

// const Colors = Loadable({
//   loader: () => import('./views/Theme/Colors'),
//   loading: Loading,
// });

// const Typography = Loadable({
//   loader: () => import('./views/Theme/Typography'),
//   loading: Loading,
// });

// const Widgets = Loadable({
//   loader: () => import('./views/Widgets/Widgets'),
//   loading: Loading,
// });

// const Users = Loadable({
//   loader: () => import('./views/Users/Users'),
//   loading: Loading,
// });

// const User = Loadable({
//   loader: () => import('./views/Users/User'),
//   loading: Loading,
// });

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

const Settings = Loadable({
  loader:() => import('./views/Settings/Settings'),
  loading:Loading
})

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

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const checkerRoutes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path:'/settlement/products/:id',exact:true, name:'Product Set Up', component: Settlement},
  { path:'/settlement/products',name:'Product Set Up',component:Settlement,exact:true},
  {path:'/processors',name:'Processors',component:Processors,exact:true},
  {path:'/products',name:'Products',component:Products,exact:true},
  {path:'/products/addProducts',name:'Add Product',component:AddProducts,exact:true},
  {path:'/products/addProducts/:id',name:'Add Product',component:AddProducts,exact:true},
  {path:'/processors/:id/subgroups/:subgroupid/products',name:'Products',exact:true,component:ProcessorSubGroupsProducts},
  {path:'/processors/:id/subgroups/:subgroupid/products/addProduct',name:'Add Product',exact:true,component:ProcessorSubGroupsAddproduct},
  {path:'/processors/:id/subgroups/:subgroupid/products/:productid/accounts',name:'Accounts',exact:true,component:ProcessorSubGroupsProductsAccounts},
  {path:'/processors/:id/subgroups/:subgroupid/products/:productid/accounts/addAccount',name:'Add Account',exact:true,component:ProcessorSubGroupsProductsAddAccount},
  // {path:'/subgroups/:id/products',name:'View Products',component:SubGroupProducts,exact:true},
  {path:'/daily-summary',name:'Daily Summary',component:DailySummary,exact:true},
  {path:'/daily-summary/:id/subgroups',name:'SubGroups',component:DailySummarySubGroups,exact:true},
  {path:'/transactions',name:'Transactions',component:Transactions,exact:true},
  {path:'/reports',name:'Reports',component:Transactions,exact:true},
  {path:'/daily-summary/:id/subgroups/products',name:'Products',component:DailySummarySubGroupsProducts,exact:true},
  {path:'/daily-summary/:id/subgroups/products/accounts',name:'Account',component:DailySummarySubGroupsProductsAccount,exact:true},
  {path:'/daily-posting',name:'Daily Posting',component:DailyPosting,exact:true},

  {path:'/daily-posting/:id/accounts',name:'Daily Posting Accounts',component:DailyPostingAccounts,exact:true},
  {path:'/settings',name:'Settings',component:Settings,exact:true},
  {path:'/accounts',name:'Accounts',component:Accounts,exact:true},
  {path:'/accounts/addAccounts',name:'Add Account',component:AddAccount,exact:true},
  {path:'/products/addAccounts/:productId',name:'Add Account',component:AddAccount,exact:true},
  {path:'/accounts/:id/edit',name:'Edit Account',component:EditAccount,exact:true},
  {path:'/file-definitions',name:'File Definitions',component:FileDefinitions,exact:true},
  {path:'/file-definitions/add',name:'Add File Definitions',component:AddFileDefinitions,exact:true},
  {path:'/file-definitions/manualAddition',name:'Add File Definitions Manually',component:ManualAddFileDefinitions,exact:true},
  {path:'/file-definitions/:id/edit',name:'Edit File Definition',component:EditFileDefinition,exact:true},
  // {path:'/accounts/:id/details',name:'Account Details',component:},
  /**Real Bread Crumb */
  {path:'/accounts/:id/definitions',name:'Account Definitions',component:ProductDefinitions,exact:true},
  // {path:'/accounts/:id/definitions/manualPosting',name:'Manual Posting',component:AccountManualPosting,exact:true},
   {path:'/processors/:id/subgroups',name:'SubGroups',exact:true,component:ProcessorSubGroups},
   {path:'/processors/:id/subgroups/addProduct',name:'Add Product',component:AddProducts,exact:true},
  {path:'/accounts/:accountid/definitions/editdefinition/:id',name:'Edit Account Definition',component:ProductEditSetUp,exact:true},
  {path:'/products/:id/accounts',name:"Product's Account",component:ProductDetails,exact:true},
  {path:'/accounts/:id/definitions/setup',name:'Account Definition Set Up ',component:ProductSetUp,exact:true},
  {path:'/products/setup/:id',name:'Product Set Up',component:ProductSetUp,exact:true},
  {path:'/products/:id/update',name:'Update Product',component:UpdateProduct,exact:true},
  {path:'/products/:id/edit',name:'Edit Product',component:EditProduct,exact:true},
  {path:'/batches',name:'Batches',component:Batches,exact:true},
  {path:'/summary',name:'Batches Summary',component:Summary,exact:true},
  {path:'/batches/:id/transactions',name:'Batches Transactions',component:BatchesTransactions,exact:true},
  {path:'/admin/logs',name:'Admin Logs',component:AdminLogs,exact:true},
  {path:'/channel/logs',name:'Channel Logs',component:ChannelLogs,exact:true},
  {path:'/file/templates',name:'File Templates',component:FileTemplates,exact:true},
  {path:'/file/templates/addTemplate',name:'Add File Template',component:AddFileTemplate,exact:true},
  {path:'/file/templates/:id/update',name:'Edit Template',component:EditFileTemplate,exact:true},
  {path:'/manualPostings',name:'Manual Postings',component:ManualPostings,exact:true},
  {path:'/manualPostings/add',name:'Add Manual Posting',component:AccountManualPosting,exact:true},
  {path:'/exceptions',name:'Exception',component:Exceptions,exact:true},
  {path:'/exceptions/:id/rows',name:'Processor Channel Rows',component:ChannelRows,exact:true},
  {path:'/exceptions/definitions',name:'Processor Exception Definition',component:ExceptionDefinition,exact:true},
  {path:'/exceptions/:id/channels',name:'Processor Channel Summary',component:ProcessorChannelExceptionSummary,exact:true},
  {path:'/exceptions/:id/definitions/edit',name:'Edit Processor Exception Definiiton',component:EditProcessorExceptionDefinition,exact:true},
  {path:'/exceptions/definitions/addException',name:'Add Exception',component:AddException,exact:true},
  // {path:'/processor/:id',name:'Processor',exact:true,component:ProcessorDetails},
  {path:'/reports/accounts',name:'Account Reports',component:AccountReports,exact:true},
  {path:'/reports/channels',name:'Channel Reports',component:ChannelReports,exact:true},
  {path:'/reports/daily',name:'Daily Reports',component:DailyReports,exact:true},
  {path:'/checker-authorizations',name:'Checker Authorizations',component:CheckerAuthorizations,exact:true},
];

export default checkerRoutes;