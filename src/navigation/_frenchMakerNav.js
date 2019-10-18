export default {
    items: [
      {
        name: 'Tableau de bord',
        url: '/dashboard',
        icon: 'icon-speedometer',
        
      },{
        name:'Installer',
        url:'#',
        icon:'icon-settings',
        children:[
          {
            name:'Processeurs',
            url:'/processors',
            icon:'fa fa-money'
          },
          {
            name:'Des produits',
            url:'/products',
            icon:'fa fa-tv'
          },
          {
            name:'Comptes',
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
      {
        name:'Transactions',
        url:'',
        icon:'fa fa fa-list',
        children:[
          {
            name:'Affichage quotidien',
            url:'/summary',
            icon:'fa fa-table'
          },
          {
            name:'Conseils quotidiens',
            url:'/daily-posting',
            icon:'fa fa-line-chart'
          },
          {
            name:'Des lots',
            url:'/batches',
            icon:'fa fa-sliders'
          },
          {
            name:'Affichage manuel',
            url:'/manualPostings',
            icon:'fa fa-pencil-square'
          },
          {
            name:'Exceptions',
            url:'/exceptions',
            icon:'fa fa-exclamation-triangle'
          }
  
        ]
      },
      {
        name:'Rapports',
        url:'#',
        icon:'fa fa-navicon',
        children:[
          {
            name:'Rapports de compte',
            url:'/reports/accounts',
            icon:'fa fa-file-pdf-o'
          },{
            name:'Rapports de chaîne',
            url:'/reports/channels',
            icon:'fa fa-file-pdf-o'
          },{
            name:'Rapports quotidiens',
            url:'/reports/daily',
            icon:'fa fa-file-pdf-o'
  
          }
        ]
      },
      {
        name:'Les journaux',
        url:'#',
        icon:'fa fa-tasks',
        children:[
          {
            name:'Traitement des journaux',
            url:'/admin/logs',
            icon:'fa fa-align-left'
          },{
            name:'Fichiers traités',
            url:'/channel/logs',
            icon:'fa fa-file-zip-o'
          },
        ]
      },
      {
        name:'Avancée',
        url:'#',
        icon:'fa fa-navicon',
        children:[
          {
            name:'Modèles de fichiers',
            url:'/file/templates',
            icon:'fa fa-sticky-note'
          },
          {
            name:'Définitions de fichier',
            url:'/file-definitions',
            icon:'fa fa-file'
          },
          {
            name: 'Ensembles de fichiers',
            url:'/filesets',
            icon:'fa fa-file'
          },
          {
            name:'Réglages',
            url:'/settings',
            icon:'fa fa-cog'
          }
        ]
      },
      {
        name:'À faire',
        url:'/authorizations',
        icon:'fa fa-navicon',
      }
    ],
  };
  