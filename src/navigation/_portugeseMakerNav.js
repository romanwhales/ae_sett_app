export default {
    items: [
      {
        name: 'painel de controle',
        url: '/dashboard',
        icon: 'icon-speedometer',
        
      },
      {
        name:'Configuração',
        url:'#',
        icon:'icon-settings',
        children:[
          {
            name:'Processadores',
            url:'/processors',
            icon:'fa fa-money'
          },
          {
            name:'Produtos',
            url:'/products',
            icon:'fa fa-tv'
          },
          {
            name:'Contas',
            url:'/accounts',
            icon:'fa fa-archive'
          },
          {
            name:'Exceções',
            url:'/exceptions/definitions',
            icon:'fa fa-exclamation-triangle'
          }
        ]
      },
      {
        name:'Transações',
        url:'',
        icon:'fa fa fa-list',
        children:[
          {
            name:'Postagem Diária',
            url:'/summary',
            icon:'fa fa-table'
          },
          {
            name:'Conselhos Diários',
            url:'/daily-posting',
            icon:'fa fa-line-chart'
          },
          {
            name:'Lotes',
            url:'/batches',
            icon:'fa fa-sliders'
          },
          {
            name:'Publicação manual',
            url:'/manualPostings',
            icon:'fa fa-pencil-square'
          },
          {
            name:'Exceções',
            url:'/exceptions',
            icon:'fa fa-exclamation-triangle'
          }
  
        ]
      },
      {
        name:'Relatórios',
        url:'#',
        icon:'fa fa-navicon',
        children:[
          {
            name:'Relatórios de conta',
            url:'/reports/accounts',
            icon:'fa fa-file-pdf-o'
          },{
            name:'Relatórios de Canal',
            url:'/reports/channels',
            icon:'fa fa-file-pdf-o'
          },{
            name:'Reportagens diárias',
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
            name:'Logs de Processamento',
            url:'/admin/logs',
            icon:'fa fa-align-left'
          }
          ,{
            name:'Arquivos processados',
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
        name:'Avançado',
        url:'#',
        icon:'fa fa-navicon',
        children:[
          {
            name:'Modelos de arquivos',
            url:'/file/templates',
            icon:'fa fa-sticky-note'
          },
          {
            name:'Definições de arquivo',
            url:'/file-definitions',
            icon:'fa fa-file'
          },
          {
            name:'Definições',
            url:'/settings',
            icon:'fa fa-cog'
          }
        ]
      },
      {
        name:'To-Do\'s',
        url:'/authorizations',
        icon:'fa fa-navicon',
      }
    ],
};
  