import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert,CardColumns} from 'reactstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";
import PropTypes from 'prop-types';
import '../Batches/datepicker.css';
import {fetchDailyProcessorSubGroupSummaryProductsAccounts} from '../../actions/batches';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import BarChart from './BarChart';
import PieChart from './PieChart';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as qs from 'query-string';
import 'react-datepicker/dist/react-datepicker.css';


class DailySummarySubGroupsProductsAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
            date: new Date(),
            startDate: moment(),
            paramsEndDate:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitDate = this.submitDate.bind(this);
    }

    componentWillMount(){
        let searchdate = qs.parse(this.props.location.search).date;
        let endDate = qs.parse(this.props.location.search).endDate;
        if(searchdate&& endDate){
            this.setState({paramsDate:searchdate,startDate:moment(searchdate),paramsEndDate:endDate});
            this.props.fetchDailyProcessorSubGroupSummaryProductsAccounts(this.props.match.params.id,searchdate,endDate);
        }else{
            let today = moment(new Date()).format();
            if(today.includes("T")){
                let extract = today.split("T");
                today = extract[0];
                this.setState({paramsDate:today,startDate:moment(today)});
                this.props.fetchDailyProcessorSubGroupSummaryProductsAccounts(this.props.match.params.id,today);
            }
        }
    }
    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchBatchesTransactions(this.props.match.params.id,pageNumberParam);
        this.setState({activePage: pageNumber});
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
        // console.log(new Date(this.state.startDate).toISOString());
      }

      submitDate(){
        var date1 = moment(this.state.startDate).format();
        if(date1.includes("T")){
            let extract = date1.split("T");
            date1 = extract[0];
            this.setState({paramsDate:date1});
        }
        this.props.fetchDailyProcessorSubGroupSummaryProductsAccounts(this.props.match.params.id,date1);
      }
    
    
    render(){
        // console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                 <Row>
                    <Col md={{ size: 3, offset: 8}} xs={{ size: 10}} style={{'paddingBottom':'20px'}}>
                    <div>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange} className="form-control" placeholderText="Select Date"
                        dateFormat="LL"
                    />
                    </div>
                    </Col>
                    {/* <Flatpickr data-enable-time value={props.date} onChange={props.change}/> */}
                    <Col xs={{ size: 1}} style={{'paddingLeft':'0px'}}>
                    <Button type="submit" size="sm" className="btn btn-block" onClick={this.submitDate}color="primary" style={{'padding':'0.45rem 0.5rem'}}> Submit</Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" >
                        <div className="chart-wrapper">
                            <BarChart dailyProcessorSubGroupProductsAccounts = {this.props.dailyProcessorSubGroupProductsAccounts} title="Daily SubGroup Distribution"  borderColor = "rgba(255,99,132,1)" backgroundColor="rgba(255,99,132,0.2)" hoverBackgroundColor="rgba(255,99,132,0.4)" hoverBorderColor="rgba(255,99,132,1)" />
                        </div>
                    </Col>
                    <Col xs="6">
                        <PieChart dailyProcessorSubGroupProductsAccounts = {this.props.dailyProcessorSubGroupProductsAccounts} title="Daily SubGroup Distribution" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i>Products Accounts
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Product</th>
                                    <th>SubGroup</th>
                                    <th>Account</th>
                                    <th>Processor</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.dailyProcessorSubGroupProductsAccounts?this.props.dailyProcessorSubGroupProductsAccounts.data.map((item,index) => (
                                    <tr key={index+1}>
                                        <td>{index+1}</td>
                                        <td>{item.product}</td>
                                        <td>{item.subgroup}</td>
                                        <td>{item.account}</td>
                                        <td>{item.processor}</td>
                                        <td> 
                                            {item.amount.toLocaleString()}
                                        </td>
                                    </tr>
                                )):null}
                                
                            </tbody>
                            </Table>
                        </CardBody>
                        </Card>
                    </Col>
                    </Row>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log('State is ',state)
    return {
        dailyProcessorSubGroupProductsAccounts:state.batches.dailyProcessorSubGroupSummaryProductsAccounts,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchDailyProcessorSubGroupSummaryProductsAccounts
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(DailySummarySubGroupsProductsAccount);