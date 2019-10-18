import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert,CardColumns} from 'reactstrap';
import {fetchBatchesSummary,fetchDailyProcessorSubGroupSummary} from '../../actions/batches';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";
import PropTypes from 'prop-types';
import '../Batches/datepicker.css';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import BarChart from './BarChart';
import PieChart from './PieChart';
import * as qs from 'query-string';


import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';


class DailySummarySubGroups extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
            date: new Date(),
            startDate:moment(),
            endDate:'',
            paramsDate:'',
            paramsEndDate:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitDate = this.submitDate.bind(this);
    }

    componentWillMount(){
        // console.log('Query Params ',qs.parse(this.props.location.search));
        let searchdate = qs.parse(this.props.location.search).date;
        let endDate = qs.parse(this.props.location.search).endDate;
        if(searchdate && endDate){
            this.setState({paramsDate:searchdate,startDate:moment(searchdate),paramsEndDate:endDate,endDate:moment(endDate)});
            this.props.fetchDailyProcessorSubGroupSummary(this.props.match.params.id,searchdate,endDate); 
        }else{
            let today = moment(new Date()).format();
            if(today.includes("T")){
                let extract = today.split("T");
                today = extract[0];
                this.setState({paramsDate:today,startDate:moment(today)});
            }
            this.props.fetchDailyProcessorSubGroupSummary(this.props.match.params.id,today);
        }

    }

    handleChangeEndDate=(date)=>{
        this.setState({
            endDate: date
          });
      }
    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchBatchesTransactions(this.props.match.params.id,pageNumberParam);
        this.setState({activePage: pageNumber});
        // this.props.fetchOffices(pageNumber);
        // this.setState({activePage: pageNumber});
    }

    handleChange(date) {
        this.setState({
          startDate: date
        });
        // console.log(new Date(this.state.startDate).toISOString());
      }

      submitDate(){
            let date1 = moment(this.state.startDate).format();
            let date2 = moment(this.state.endDate).format();
            if(date1.includes("T")){
                let extract = date1.split("T");
                date1 = extract[0];
                let extractEndDate = date2.split("T");
                date2 = extractEndDate[0];
                this.setState({paramsDate:date1,paramsEndDate:date2});
            }
            this.props.fetchDailyProcessorSubGroupSummary(this.props.match.params.id,date1,date2);
      }
    
    
    render(){
        // console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                
                <Form inline style={{'justifyContent':'flex-end','marginBottom':'20px'}}>
                  <FormGroup className="pr-1">
                    {/* <Label htmlFor="exampleInputName2" className="pr-1">Name</Label> */}
                   
                    <DatePicker
                        selected={this.state.startDate}
                        selectsStart
                        onChange={this.handleChange} className="form-control" placeholderText="Select Date" 
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        dateFormat="LL" 
                        
                    />
                  </FormGroup>
                  <FormGroup className="pr-1">
                    {/* <Label htmlFor="exampleInputEmail2" className="pr-1">Email</Label> */}
                    <DatePicker
                            selected={this.state.endDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeEndDate} className="form-control" placeholderText="Select End  Date" dateFormat="LL" selectsEnd  
                        />
                  </FormGroup>
                  <FormGroup>
                    <Button size="sm" className="btn btn-block" onClick={this.submitDate}color="primary" style={{'padding':'0.45rem 0.5rem'}}> Submit</Button>
                  </FormGroup>
                </Form>
                <Row>
                    <Col xs="6" >
                        <div className="chart-wrapper">
                            <BarChart dailySummarySubGroup = {this.props.dailyProcessorSubGroup} title="Daily SubGroup Distribution"  borderColor = "rgba(255,99,132,1)" backgroundColor="rgba(255,99,132,0.2)" hoverBackgroundColor="rgba(255,99,132,0.4)" hoverBorderColor="rgba(255,99,132,1)" />
                        </div>
                    </Col>
                    <Col xs="6">
                        <PieChart dailySummarySubGroup = {this.props.dailyProcessorSubGroup} title="Daily SubGroup Distribution" />
                    </Col>
                </Row>
                <Row style={{}}>
                    <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i>SubGroup
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-none d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>SubGroup</th>
                                    <th>Processor</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.dailyProcessorSubGroup?this.props.dailyProcessorSubGroup.data.map((item,index) => (
                                    <tr key={index+1}>
                                        <td>{index+1}</td>
                                        <td><a href={"#/daily-summary/" + item.entityId+ "/subgroups/products?date="+this.state.paramsDate+"&endDate="+this.state.paramsEndDate}>{item.subgroup}</a></td>
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
    console.log('State is ',state)
    return {
        batchesSummary:state.batches.batchSummary,
        dailyProcessorSubGroup:state.batches.dailyProcessorSubGroupSummary,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBatchesSummary,
        fetchDailyProcessorSubGroupSummary
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(DailySummarySubGroups);