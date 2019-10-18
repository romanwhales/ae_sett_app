export default {
  items: [
    {
      name: 'Tablero',
      url: '/dashboard',
      icon: 'icon-speedometer',
      
    },
    {
      name:'Preparar',
      url:'#',
      icon:'icon-settings',
      children:[
        {
          name:'Procesadores',
          url:'/processors',
          icon:'fa fa-money'
        },
        {
          name:'Productos',
          url:'/products',
          icon:'fa fa-tv'
        },
        {
          name:'Cuentas',
          url:'/accounts',
          icon:'fa fa-archive'
        },
        {
          name:'Excepciones',
          url:'/exceptions/definitions',
          icon:'fa fa-exclamation-triangle'
        }
      ]
    },
    {
      name:'Actas',
      url:'',
      icon:'fa fa fa-list',
      children:[
        {
          name:'Publicación diaria',
          url:'/summary',
          icon:'fa fa-table'
        },
        {
          name:'Consejos diarios',
          url:'/daily-posting',
          icon:'fa fa-line-chart'
        },
        {
          name:'Lotes',
          url:'/batches',
          icon:'fa fa-sliders'
        },
        {
          name:'Publicación manual',
          url:'/manualPostings',
          icon:'fa fa-pencil-square'
        },
        {
          name:'Excepciones',
          url:'/exceptions',
          icon:'fa fa-exclamation-triangle'
        }

      ]
    },
    {
      name:'Informes',
      url:'#',
      icon:'fa fa-navicon',
      children:[
        {
          name:'Informes de cuenta',
          url:'/reports/accounts',
          icon:'fa fa-file-pdf-o'
        },{
          name:'Informes de canal',
          url:'/reports/channels',
          icon:'fa fa-file-pdf-o'
        },{
          name:'Reportes diarios',
          url:'/reports/daily',
          icon:'fa fa-file-pdf-o'

        }
      ]
    },
    {
      name:'Troncos',
      url:'#',
      icon:'fa fa-tasks',
      children:[
        {
          name:'Procesando Registros',
          url:'/admin/logs',
          icon:'fa fa-align-left'
        }
        ,{
          name:'Archivos procesados',
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
      name:'Avanzado',
      url:'#',
      icon:'fa fa-navicon',
      children:[
        {
          name:'Plantillas de archivo',
          url:'/file/templates',
          icon:'fa fa-sticky-note'
        },
        {
          name:'Definiciones de archivos',
          url:'/file-definitions',
          icon:'fa fa-file'
        },
        {
          name:'Ajustes',
          url:'/settings',
          icon:'fa fa-cog'
        }
      ]
    },
    {
      name:'Para hacer',
      url:'/authorizations',
      icon:'fa fa-navicon',
    }
  ],
};
