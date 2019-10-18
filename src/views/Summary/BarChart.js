import React from 'react';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { Bar, Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
const BarChart = (props) => {
    console.log('Props bar chart is ',props);
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
    if(props.bottomContributorsData){
        props.bottomContributorsData.data.forEach(item=>labels.push(item.key));
        props.bottomContributorsData.data.forEach((item,index)=>data.push(item.value));
    }
    if(props.dailyProcessorSubGroupProducts){
        props.dailyProcessorSubGroupProducts.data.forEach(item=>labels.push(item.product));
        props.dailyProcessorSubGroupProducts.data.forEach((item,index)=>data.push(item.amount));
    }
    if(props.dailyProcessorSubGroupProductsAccounts){
        props.dailyProcessorSubGroupProductsAccounts.data.forEach(item=>labels.push(item.account));
        props.dailyProcessorSubGroupProductsAccounts.data.forEach((item,index)=>data.push(item.amount));
    }

    // console.log('Data is ',data);
    const bar = {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels:labels,
        datasets: [
          {
            label: title,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
            hoverBackgroundColor: hoverBackgroundColor,
            hoverBorderColor: hoverBorderColor,
            // data: [65, 59, 80, 81, 56, 55, 40],
            data:data,
          },
        ],
      };
    const options = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips
        },
        maintainAspectRatio:true,
        responsive: true,

    }
    

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
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>
       
    )
}

export default BarChart;