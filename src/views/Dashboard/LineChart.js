import React from 'react';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { Bar, Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
const LineChart = (props) => {
    console.log('Props is ',props);
    let labels = [];
    let data =[];
    if(props.topContributorsData){
        
        props.topContributorsData.data.forEach(item=>labels.push(item.key));
        props.topContributorsData.data.forEach((item,index)=>data.push(item.value));
    }
    // console.log('Data is ',data);
    const line = {
        labels: labels,
        datasets: [
          {
            label: 'Top Contributors By Commission',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
          },
        ],
      };
    const options = {
        tooltips: {
            enabled: false,
            custom: CustomTooltips
        },
        maintainAspectRatio: false
    }
    

    return(
        <Card>
            <CardHeader>
              Top Contributors by Commission
              {/* <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div> */}
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={line} options={options} />
              </div>
            </CardBody>
          </Card>
       
    )
}

export default LineChart;