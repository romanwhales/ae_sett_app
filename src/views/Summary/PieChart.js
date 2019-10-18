import React from 'react';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { Pie} from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
const PieChart = (props) => {
    
    console.log(props.title);
    let labels = [];
    let data =[];
    let labelsBottom = [];
    let dataBottom =[];
    let title = props.title;
    let backgroundColor = props.backgroundColor;
    let borderColor = props.borderColor;
    let hoverBackgroundColor = props.hoverBackgroundColor;
    let hoverBorderColor = props.hoverBorderColor;
    if(props.dailySummary ){
        props.dailySummary.data.forEach(item=>labels.push(item.processor));
        props.dailySummary.data.forEach((item,index)=>data.push(item.amount));
    }
    if(props.dailySummarySubGroup){
        props.dailySummarySubGroup.data.forEach(item=>labels.push(item.subgroup));
        props.dailySummarySubGroup.data.forEach((item,index)=>data.push(item.amount));
    }
    if(props.dailyProcessorSubGroupProducts){
        props.dailyProcessorSubGroupProducts.data.forEach(item=>labels.push(item.product));
        props.dailyProcessorSubGroupProducts.data.forEach((item,index)=>data.push(item.amount));
    }
    if(props.dailyProcessorSubGroupProductsAccounts){
        props.dailyProcessorSubGroupProductsAccounts.data.forEach(item=>labels.push(item.account));
        props.dailyProcessorSubGroupProductsAccounts.data.forEach((item,index)=>data.push(item.amount));
    }

  
    const options = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips
        },
        maintainAspectRatio: false
    }
    const pie = {
        
        labels:labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#8AC25D',
              '#054684',
              '#4AC0C0'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#8AC25D',
              '#054684',
              '#4AC0C0',
            ],
          }],
      };
    

    return(
        <Card>
            <CardHeader>
              {title}
              {/* <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div> */}
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>
       
    )
}

export default PieChart;