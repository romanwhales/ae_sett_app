import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import * as qs from 'query-string';
import CryptoJS from "crypto-js";
import Pagination2 from "react-js-pagination";

/**
 * Importing the charts
 */

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from 'reactstrap';
// import Widget03 from '../../views/Widgets/Widget03'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import {fetchAllInterswitchComputations} from '../../actions/filesets'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Moment from 'react-moment';


import Widget04 from '../../Utils/Widgets04';

// import 'moment/locale/pt';
// import 'moment/locale/es';
// import 'moment/locale/fr';

// import 'moment/locale/en-gb';
import {
 
  FormattedMessage
} from 'react-intl';




const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart




// sparkline charts





// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class InterswitchSettlement extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
    
    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      startDate: moment(),
      endDate:moment(),
      activePage:1,
      bottomContributorAlertVisible:true,
    };
  }

  onDismissCreateSuccessAlert(){
    this.setState({bottomContributorAlertVisible:false});
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  componentWillMount(){
    // console.log(window.location.href);
    
    
  let today = moment(this.state.startDate).format();
    if(today.includes("T")){
      let extract = today.split("T");
      today = extract[0];
    }
    this.props.fetchAllInterswitchComputations(null,null,0);
    // moment.locale('es');
    // console.log('Today is ',today);
    // this.props.getProcessorbyDateRange(today);
    // this.props.fetchProductsbyDateRange(today);
    // this.props.getSubGroupsbyDateRange(today);
    // this.props.getAccountsbyDateRange(today);
  //   if(today.includes("T")){
  //     let extract = today.split("T");
  //     today = extract[0];
  //     this.setState({paramsDate:today});
  //  }
    // this.props.getProcessor();
    // this.props.fetchProducts();
    // this.props.fetchTopContributors();
    // this.props.fetchBottomContributors();
    // this.props.getLoggedInUser();
    // this.props.fetchChannelLogs();
    // this.props.fetchSubGroups();
  }

  submitDate=()=>{
    // console.log(moment(this.state.startDate).format());
    let date1 = moment(this.state.startDate).format();
    let date2 = moment(this.state.endDate).format();
    if(date1.includes("T")){
        let extract = date1.split("T");
        date1 = extract[0];
        let extractEndDate = date2.split("T");
        date2 = extractEndDate[0];
        
     }
     this.props.fetchAllInterswitchComputations(date1,date2,0);
  }

  handlePageChange = (pageNumber) => {
    let pageNumberParam = pageNumber - 1;
    this.props.fetchAllInterswitchComputations(null,null,pageNumberParam);
    this.setState({activePage: pageNumber});
    // this.props.fetchOffices(pageNumber);
    // this.setState({activePage: pageNumber});
}

  render() {
    console.log('This props',this.props);
    console.log('Locale is ',moment.locale());

    
    // console.log('Language is ',navigator.language);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col style={{'marginBottom':'20px','paddingLeft':'0px','textAlign':'right'}}>
                  <DateRangePicker
                    showDefaultInputIcon="true"
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    isOutsideRange={() => false}
                    displayFormat={() => moment.localeData('es').longDateFormat('L')}
                    />
                    <Button size="sm" className="btn " onClick={this.submitDate} color="primary" style={{marginLeft:'10px',padding:'11px',fontSize:'15px'}}> <FormattedMessage defaultMessage="Submit"
                    id="app.submit"
                /></Button>
            {/* <FormGroup>
              <Label htmlFor="ccmonth">Period</Label>
              <Input type="select" name="ccmonth" id="ccmonth">
                <option value="1">Today</option>
                <option value="2">This Week</option>
                <option value="3">This Month</option>
                <option value="4">This Quarter</option>
                <option value="5">This Year</option>
              </Input>
            </FormGroup> */}
          </Col>
          <Col xs="12">
              {this.props.bottomContributorsError?<Alert color="danger" className="text-center" isOpen={this.state.bottomContributorAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                {this.props.bottomContributorsError.data.message}
              </Alert>:null}
          </Col>
        </Row>
        <Row>
            <Col>
                {/* {this.props.banks.bankCreated ? <Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>

                    <FormattedMessage id="Success: Bank Added Successfully!" defaultMessage="Success: Bank Added Successfully!" />
                </Alert> : null}

                {this.props.banks.bankUpdated ? <Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>

                    <FormattedMessage id="Success: Bank Updated Successfully!" defaultMessage="Success: Bank Updated Successfully!" />
                </Alert> : null} */}
                <Card>
                    <CardHeader>

                        {this.props.fileSets.interSwitchComputations?
                        <FormattedMessage id="Interswitch Daily Computations" defaultMessage="Interswitch Daily Computations" />:''}
                    </CardHeader>
                    <CardBody>
                        <Table hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                    <th>
                                        #
                        </th>
                                    <th><FormattedMessage id="Date" defaultMessage="Date" /></th>
                                    <th><FormattedMessage id="Channel Name" defaultMessage="Channel Name" /></th>
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name" /></th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.fileSets.interSwitchComputations
                                    ? [
                                        this.props.fileSets.interSwitchComputations.data.content.length > 0 ? this.props.fileSets.interSwitchComputations.data.content ? this.props.fileSets.interSwitchComputations.data.content.map((item, index) => (
                                            <tr key={index + 1}>
                                                <td>{index + 1}</td>
                                                <td><a href={"#/interswitch/settlement/" + item.id + "/summary"}><Moment format="ll">{item['batchDate']}</Moment></a></td>
                                                <td>{item.channelName}</td>
                                                <td>
                                                   {item.filename}

                                                </td>
                                            </tr>
                                        )) : <tr><td colSpan="3"><p className="text-center text-danger"><FormattedMessage id="There are no interswitch files parsed for the selected date" defaultMessage="There are no interswitch files parsed for the selected date" /></p></td></tr> : <tr><td colSpan="4"><p className="text-center text-danger"><FormattedMessage id="There are no interswitch files parsed for the selected date" defaultMessage="There are no interswitch files parsed for the selected date" /></p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }


                            </tbody>
                        </Table>
                        {this.props.fileSets.interSwitchComputations ? <nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={20}
                                totalItemsCount={this.props.fileSets.interSwitchComputations.data.content.length > 0 ? this.props.fileSets.interSwitchComputations.data.totalElements : null}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange}
                            />
                        </nav> : ''}
                    </CardBody>
                </Card>
            </Col>
        </Row>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('State is ',state);
  return {
    fileSets:state.fileSets
  }
}

const mapDispatchToProps= (dispatch) => {
  return bindActionCreators({
    fetchAllInterswitchComputations
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(InterswitchSettlement);
