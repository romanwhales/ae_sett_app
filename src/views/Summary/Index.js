import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col,  Row, Table, Button} from 'reactstrap';
import {fetchBatchesSummary} from '../../actions/batches';
import {fetchDailyProcessorsSummary} from '../../actions/stats';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import '../Batches/datepicker.css';

import BarChart from './BarChart';
import PieChart from './PieChart';

import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';

import 'react-dates/initialize';
import { DateRangePicker,} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


class DailySummary extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
            date: new Date(),
            startDate: moment(),
            endDate:moment(),
            paramsDate:'',
            paramsEndDate:'',
            switchData:[{name:'Interswitch',amount:100023400,adviceAmount:130023400,posted:false},{name:'Unified Payments',amount:301267423,adviceAmount:401267423,posted:false},{name:'Etranzact',amount:122234556,adviceAmount:145234556,posted:false},{name:'Mastercard',amount:32222555,adviceAmount:42222555,posted:false},{name:'Visa',amount:86777445,adviceAmount:44777445,posted:false},{name:'Nibss',amount:32222555,adviceAmount:32552555,posted:false}]
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitDate = this.submitDate.bind(this);
    }

    componentWillMount(){
        
        let today = moment(new Date()).format();
        if(today.includes("T")){
            let extract = today.split("T");
            today = extract[0];
            this.setState({paramsDate:today});
         }
        // console.log('Date is ',date);
       this.props.fetchDailyProcessorsSummary(today);
    }
    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchBatchesTransactions(this.props.match.params.id,pageNumberParam);
        this.setState({activePage: pageNumber});
    }

    handleChange=(date) => {
        this.setState({
          startDate: date
        });
        // console.log(new Date(this.state.startDate).toISOString());
      }
      handleChangeEndDate=(date)=>{
        this.setState({
            endDate: date
          });
      }

        submitDate(){
            // console.log(moment(this.state.startDate).format());
            let date1 = moment(this.state.startDate).format();
            let date2 = moment(this.state.endDate).format();
            if(date1.includes("T")){
                let extract = date1.split("T");
                date1 = extract[0];
                let extractEndDate = date2.split("T");
                date2 = extractEndDate[0];
                this.setState({paramsDate:date1,paramsEndDate:date2});
             }
            this.props.fetchDailyProcessorsSummary(date1,date2);
        }

        postTransactions(index){
            return false;
        }

    
    
    
    render(){
        // console.log('Props here is ',this.props,this.state);
        return(
            <div className="animated fadeIn">
                {/* <Row>
                    <Col md={{ size: 3, offset: 8}} xs={{ size: 10}} style={{'paddingBottom':'20px'}}>
                    <div>
                        

                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange} className="form-control" placeholderText="Select Date" dateFormat="LL"
                            
                        />
                        <span className="fa fa-calendar" style={{'position':'absolute','top':'10px','left':'260px'}}>
                        </span>
                    </div>
                    </Col>
                   
                    <Col xs={{ size: 1}} style={{'paddingLeft':'0px'}}>
                    <Button type="submit" size="sm" className="btn btn-block" onClick={this.submitDate}color="primary" style={{'padding':'0.45rem 0.5rem'}}> Submit</Button>
                    </Col>
                </Row> */}
                <div style={{'marginBottom':'20px','display':'flex',justifyContent:'flex-end'}}>
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
                    />
                    <Button size="sm" className="btn " onClick={this.submitDate} color="primary" style={{fontSize:'15px',marginLeft:'10px'}}> Submit</Button>
                </div>
                
                {/* <Form inline style={{'justifyContent':'flex-end','marginBottom':'20px'}}>
                  <FormGroup className="pr-1">
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
                    <DatePicker
                            selected={this.state.endDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeEndDate} className="form-control" placeholderText="Select Date" dateFormat="LL" selectsEnd  
                        />
                  </FormGroup>
                  <FormGroup>
                    <Button size="sm" className="btn btn-block" onClick={this.submitDate}color="primary" style={{'padding':'0.45rem 0.5rem'}}> Submit</Button>
                  </FormGroup>
                </Form> */}
                <Row>
                    <Col xs="12" md="6">
                        <div className="chart-wrapper" style={{'height':'270px'}}>
                            <BarChart dailySummary = {this.props.dailySummary} title="Daily Switch Advice Distribution"  borderColor = "rgba(255,99,132,1)" backgroundColor="rgba(255,99,132,0.2)" hoverBackgroundColor="rgba(255,99,132,0.4)" hoverBorderColor="rgba(255,99,132,1)" />
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <PieChart dailySummary = {this.props.dailySummary} title="Daily Switch Advice Distribution" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i>Daily Switch Advice
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Switch</th>
                                    <th>Amount</th>
                                    <th>Advice Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {  this.props.dailySummary
                                    ? [
                                        this.props.dailySummary.data.length > 0 ? this.props.dailySummary.data ? this.props.dailySummary.data.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td ><a href={"#/daily-summary/"+item.entityId+"/subgroups?date="+this.state.paramsDate+"&endDate="+this.state.paramsEndDate}>{item.processor}</a></td>
                                                <td> 
                                                   {item.amount.toLocaleString()}
                                                </td>
                                                <td>N/A</td>
                                                <td>
                                                {item.posted? <Badge className="mr-1" href="#" color="success">Posted</Badge>: <Button color="primary"  size="sm" onClick={(e) => this.postTransactions(index)}>Post</Button> }
                                                </td>
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There is no summary for the specified date.</p></td></tr>:<tr><td colSpan="5"><p className="text-center text-danger">There is no summary for the specified date.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            </tbody>
                            </Table>
                        
                            {/* {this.props.batchTransactionData?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.batchTransactionData?this.props.batchTransactionData.data.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                            </nav>:'' } */}
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
        dailySummary:state.stats.dailyProcessorSummary,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBatchesSummary,
        fetchDailyProcessorsSummary
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(DailySummary);