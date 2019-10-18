export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      
    },
    {
      name:'Set Up',
      url:'#',
      icon:'icon-settings',
      children:[
        {
          name:'Processors',
          url:'/processors',
          icon:'fa fa-money'
        },
        {
          name:'Products',
          url:'/products',
          icon:'fa fa-tv'
        },
        {
          name:'Accounts',
          url:'/accounts',
          icon:'fa fa-archive'
        },
        {
          name:'Exceptions',
          url:'/exceptions/definitions',
          icon:'fa fa-exclamation-triangle'
        }
      ]
    },
    // {
    //   name:'Transactions',
    //   url:'',
    //   icon:'fa fa fa-list',
    //   children:[
    //     {
    //       name:'Daily Posting',
    //       url:'/summary',
    //       icon:'fa fa-table'
    //     },
    //     {
    //       name:'Daily Advice',
    //       url:'/daily-posting',
    //       icon:'fa fa-line-chart'
    //     },
    //     {
    //       name:'Batches',
    //       url:'/batches',
    //       icon:'fa fa-sliders'
    //     },
    //     {
    //       name:'Manual Posting',
    //       url:'/manualPostings',
    //       icon:'fa fa-pencil-square'
    //     },
    //     {
    //       name:'Exceptions',
    //       url:'/exceptions',
    //       icon:'fa fa-exclamation-triangle'
    //     }

    //   ]
    // },
    {
      name:'Reports',
      url:'#',
      icon:'fa fa-navicon',
      children:[
        {
          name:'Account Reports',
          url:'/reports/accounts',
          icon:'fa fa-file-pdf-o'
        },{
          name:'Channel Reports',
          url:'/reports/channels',
          icon:'fa fa-file-pdf-o'
        },{
          name:'Daily Reports',
          url:'/reports/daily',
          icon:'fa fa-file-pdf-o'

        }
      ]
    },
    {
      name:'Logs',
      url:'#',
      icon:'fa fa-tasks',
      children:[
        {
          name:'Processing Logs',
          url:'/admin/logs',
          icon:'fa fa-align-left'
        }
        ,{
          name:'Processed Files',
          url:'/channel/logs',
          icon:'fa fa-file-zip-o'
        },
        // {
        //   name:'Processed Files',
        //   url:'/channel/logs',
        //   icon:'fa fa-file-zip-o'
        // }
      ]
    },
    {
      name:'Advanced',
      url:'#',
      icon:'fa fa-navicon',
      children:[
        {
          name:'File Templates',
          url:'/file/templates',
          icon:'fa fa-sticky-note'
        },
        {
          name: 'File Sets',
          url:'/filesets',
          icon:'fa fa-file'
        },
        {
          name:'File Definitions',
          url:'/file-definitions',
          icon:'fa fa-file'
        },
        {
          name:'Settings',
          url:'/settings',
          icon:'fa fa-cog'
        },{
          name:'Users Management',
          url:'/user-management',
          icon:'fa fa-users'
        }
      ]
    },
    {
      name: 'Configuration',
      url:'#',
      icon: 'fa fa-cog',
      children:[
        {
          name:'Cards',
          url:'/configuration/cards',
          icon:'fa fa-credit-card'
        },{
          name:'Banks',
          url:'/configuration/banks',
          icon:'fa fa-institution'
        },{
          name:'Bins',
          url:'/configuration/bins',
          icon:'fa fa-file-code-o'
        },{
          name:'Affiliates',
          url:'/configuration/affiliates',
          icon:'fa fa-flag'
        },{
          name:'Sres',
          url:'/configuration/sres',
          icon:'fa fa-key'
        }
      ]
    },
    {
      name:'Scheme',
      url:'#',
      icon:'fa fa-file-pdf-o',
      children:[
        {
          name:'Mastercard',
          url:'/mastercard/settlement',
          icon:'fa fa-credit-card-alt'
        },
        {
          name:'InterAffiliate',
          url:'/interAffiliate/settlement',
          icon:'fa fa-credit-card-alt'
        },{
          name:'Visa',
          url:'/visa/settlement',
          icon:'fa fa-credit-card-alt'
        },
      ]
    },
    // {
    //   name:'To-Do\'s',
    //   url:'/authorizations',
    //   icon:'fa fa-navicon',
    // }
    //Menu Icons Updated
    // {
    //   name:'Transactions',
    //   url:'/transactions',
    //   icon:'fa fa-list'
    // },
    // {
    //   name:'Daily Posting',
    //   url:'/daily-posting',
    //   icon:'fa fa-line-chart'
    // },
    // {
    //   name:'Batches',
    //   url:'',
    //   icon:'fa fa-navicon',
    //   children:[
    //     {
    //       name:'Summary',
    //       url:'/summary',
    //       icon:'fa fa-table'
    //     },
    //     {
    //       name:'Transaction Batches',
    //       url:'/batches',
    //       icon:'fa fa-sliders'
    //     },
    //     {
    //       name:'Daily Summary',
    //       url:'/daily-summary',
    //       icon:'fa fa-area-chart'
    //     },
    //   ]
    // },
    
  ],
};
