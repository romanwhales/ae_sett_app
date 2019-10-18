import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table as Table2,Alert,CardGroup,CardColumns } from 'reactstrap';
import {connect} from 'react-redux';
import { Line } from 'react-chartjs-2';
import {bindActionCreators} from 'redux';
import {FormattedMessage,} from 'react-intl';
import Widget04 from '../../../Utils/Widgets04';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import './css/reports.css';

const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Issuer',
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
        data: [65, 59, 80, 81, 56, 55, 40,60,80],
      },
    ],
  };
  const line2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September'],
    datasets: [
      {
        label: 'Acquirer',
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
        data: [65, 59, 80, 81, 56, 55, 40,89,34],
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

class InterAffiliateReports extends Component {
    constructor(props){
        super(props);
        this.state ={
            
        }
    }
    render(){
        return(
            <div className="animated fadeIn">
                <CardColumns className="cols-2">
                    <Card>
                        <CardHeader>
                        Issuer Commission Trends
                        <div className="card-header-actions">
                            <a href="http://www.chartjs.org" className="card-header-action">
                            {/* <small className="text-muted">docs</small> */}
                            </a>
                        </div>
                        </CardHeader>
                        <CardBody>
                        <div className="chart-wrapper">
                            <Line data={line} options={options} />
                        </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                        Acquirer Charges Trends
                        <div className="card-header-actions">
                            <a href="http://www.chartjs.org" className="card-header-action">
                            {/* <small className="text-muted">docs</small> */}
                            </a>
                        </div>
                        </CardHeader>
                        <CardBody>
                        <div className="chart-wrapper">
                            <Line data={line2} options={options} />
                        </div>
                        </CardBody>
                    </Card>
                </CardColumns>
                <Card>
                    <CardHeader>
                        <strong> <FormattedMessage id="InterAfilliate" defaultMessage="InterAffiliate"/></strong>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm="6" md="4">
                            
                                <a href="#/interAffiliate/reports/posting"><Widget04 icon="icon-calculator"  header="Posting Report" value="25" invert color="primary">Posting Reports</Widget04></a>
                            </Col>
                            <Col sm="6" md="4">
                                <a href="#/interAffiliate/reports/acquirer"><Widget04 icon="icon-calculator"  header="Acquirer Posting Reports" value="25" invert color="primary">Acquirer Posting Reports</Widget04></a>
                            </Col>
                            <Col sm="6" md="4">
                                <a href="#/mastercard/reports/t464"><Widget04 icon="icon-calculator"  header="Advisement" value="25" invert color="primary">Summary</Widget04></a>
                            </Col>
                            <Col sm="6" md="4">
                                <a href="#/mastercard/reports/t112"><Widget04 icon="icon-calculator"  header="Issuer MultiAffiliate Reports" value="25" invert color="primary">Issuer MultiAffiliate Reports</Widget04></a>
                            </Col>
                            <Col sm="6" md="4">
                                <a href="#/mastercard/reports/t464"><Widget04 icon="icon-calculator"  header="Acquirer MultiAffiliate Reports" value="25" invert color="primary">Acquirer MultiAffiliate Reports</Widget04></a>
                            </Col>
                            <Col sm="6" md="4">
                                <a href="#/mastercard/reports/t464"><Widget04 icon="icon-calculator"  header="Advisement" value="25" invert color="primary">Advisement</Widget04></a>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                
                {/* <Card>
                    <CardHeader>
                        <strong> <FormattedMessage id="Visa" defaultMessage="Visa"/></strong>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm="6" md="4">
                                <Widget04 icon="icon-people"  header="87.500" value="25" invert>T112</Widget04>
                            </Col>
                            <Col sm="6" md="4">
                                <Widget04 icon="icon-people"  header="87.500" value="25" invert>T464</Widget04>
                            </Col>
                            <Col sm="6" md="4">
                                <Widget04 icon="icon-people"  header="87.500" value="25" invert>T460</Widget04>
                            </Col>
                        </Row>
                    </CardBody>
                </Card> */}
                {/* <Card>
                    <CardHeader>
                        <strong> <FormattedMessage id="InterAffiliates" defaultMessage="InterAffiliates"/></strong>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm="6" md="4">
                                <Widget04 icon="icon-people"  header="87.500" value="25" invert>T112</Widget04>
                            </Col>
                            <Col sm="6" md="4">
                                <Widget04 icon="icon-people"  header="87.500" value="25" invert>T464</Widget04>
                            </Col>
                            <Col sm="6" md="4">
                                <Widget04 icon="icon-people"  header="87.500" value="25" invert>T460</Widget04>
                            </Col>
                        </Row>
                    </CardBody>
                </Card> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
  
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
      
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(InterAffiliateReports);