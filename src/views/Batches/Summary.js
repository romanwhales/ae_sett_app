import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button, Alert} from 'reactstrap';
import {fetchBatchesSummary,postAllTransactions,postTransaction} from '../../actions/batches';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";

import './datepicker.css';


import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';


import 'react-dates/initialize';
import {  SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import {FormattedMessage,FormattedNumber} from 'react-intl';



class Summary extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1,
            date: new Date(),
            startDate: moment(),
            setDate:false,
            // startDate:'',
            postAllStatusAlertVisible:true,
            postOneStatusAlertVisible:true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitDate = this.submitDate.bind(this);
    }

    componentWillMount(){
        // let date = moment(new Date()).format();
        // if(date.includes("T")){
        //     let extract = date.split("T");
        //     date = extract[0];
        //  }
       this.props.fetchBatchesSummary(null);
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
            // console.log(moment(this.state.startDate).format());
            var date = moment(this.state.startDate).toDate();
            // console.log(date.toISOString());
            // console.log('Date Sent to server is ',new Date(this.state.startDate).toISOString());
          this.props.fetchBatchesSummary(moment(this.state.startDate).format());
          this.setState({setDate:true});
      }

      postAll = () =>{
          let date_postAll = moment(this.state.startDate).format().split("T")[0];
          let payload ={localDate:date_postAll};
          this.props.postAllTransactions(payload);
      }
      onDismissCreateSuccessAlert=()=> {
        this.setState({ postAllStatusAlertVisible: false });
    }
    onDismissCreateOneBatchSuccessAlert=() => {
        this.setState({ postOneStatusAlertVisible: false });
    }
    postTransactions =(id) => {
        let filteredOutBatch =this.props.batchesSummary.data.filter(item => item.entityId == id)[0].postedOn = true;
        const switchData = this.state.switchData;
        let date_postOne = moment(this.state.startDate).format().split("T")[0];
        let payload ={localDate:date_postOne,accountId:id};
        this.props.postTransaction(payload);
        this.setState({
            switchData
        });

    }
    
    
    render(){
        console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                 <Row>
                    <Col md={{ size: 3}} >
                        <Button color="primary" onClick={this.postAll}><FormattedMessage id="Post All" defaultMessage="Post All"/></Button>
                     </Col>
                    <Col md={{ size: 4, offset: 5}} xs={{ size: 9}} style={{'paddingBottom':'20px','display':'flex','justifyContent':'flex-end'}}>
                    <div>
                        {/* <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange} className="form-control" placeholderText="Select Start Date" dateFormat="LL"
                        />
                        <span className="fa fa-calendar" style={{'position':'absolute','top':'10px','left':'260px'}}></span> */}
                        <SingleDatePicker
                            showDefaultInputIcon={true}
                            date={this.state.startDate} // momentPropTypes.momentObj or null
                            onDateChange={startDate => this.setState({ startDate })} // PropTypes.func.isRequired
                            focused={this.state.focused} // PropTypes.bool
                            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                            id="your_unique_id" // PropTypes.string.isRequired,
                            isOutsideRange={() => false}
                            numberOfMonths={1}
                            />
                            <Button type="submit" size="sm" className="btn" onClick={this.submitDate} color="primary" style={{fontSize:'15px',marginLeft:'10px',padding:'11px'}}> <FormattedMessage id="app.submit" defaultMessage="Submit"/></Button>
                    </div>
                    </Col>
                    {/* <Flatpickr data-enable-time value={props.date} onChange={props.change}/> */}
                    {/* <Col xs={{ size: 1}} style={{'paddingLeft':'0px'}}>
                    
                    </Col> */}
                </Row>
                <Row>
                    <Col xs="12">
                        {this.props.postAllStatus ?[
                            this.props.postAllStatus.status == 200?<Alert color="success" isOpen={this.state.postAllStatusAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                            Batches Posted Successfully
                        </Alert>:null
                            ]:['']
                        }
                    </Col>
                    <Col xs="12">
                        {this.props.postOnebatch ?[
                            this.props.postOnebatch.status == 200?<Alert color="success" isOpen={this.state.postOneStatusAlertVisible} toggle={this.onDismissCreateOneBatchSuccessAlert}>
                            Batches Posted Successfully
                        </Alert>:null
                            ]:['']
                        }
                    </Col>
                    <Col xs="12">
                        {this.props.postOnebatch ?[
                            this.props.postOnebatch.status == 202?<Alert color="warning" isOpen={this.state.postOneStatusAlertVisible} toggle={this.onDismissCreateOneBatchSuccessAlert}>
                            {this.props.postOnebatch.data.message}
                        </Alert>:null
                            ]:['']
                        }
                    </Col>
                    <Col xs="12">
                        {this.props.postOneError ?[
                            this.props.postOneError.response ?<Alert color="danger" isOpen={this.state.postOneStatusAlertVisible} toggle={this.onDismissCreateOneBatchSuccessAlert}>
                            {this.props.postOneError.response.data.message}
                        </Alert>:null
                            ]:['']
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i><FormattedMessage id="Batch Summary" defaultMessage="Batch Summary"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    
                                    <th>
                                        <FormattedMessage id="app.subgroup" defaultMessage="SubGroup"/>
                                    </th>
                                    <th>
                                        
                                        <FormattedMessage id="app.product" defaultMessage="Product"/>
                                    </th>
                                    
                                    <th>
                                        <FormattedMessage id="Rows Processed" defaultMessage="Rows Processed"/>
                                        
                                    </th>
                                    <th>
                                        <FormattedMessage id="Amount" defaultMessage="Amount"/>
                                        
                                    </th>
                                    {this.state.setDate?<th>
                                        <FormattedMessage id="app.actions" defaultMessage="Action"/>
                                    </th>:null}
                                </tr>
                            </thead>
                            <tbody>
                            {  this.props.batchesSummary
                                    ? [
                                        this.props.batchesSummary.data.length > 0 ? this.props.batchesSummary.data ? this.props.batchesSummary.data.map((item,index) => (
                                            <tr key={index+1}>
                                                
                                                <td>{item.subgroup}</td>
                                                <td> 
                                                    {item.product}
                                                </td>
                                                <td><FormattedNumber value={item.count}/></td>
                                                <td><FormattedNumber value={item.amount}/></td>
                                                {this.state.setDate?<td>
                                                    {item.postedOn? <Badge className="mr-1" color="success">Posted</Badge>: <Button color="primary"  size="sm" onClick={(e) => this.postTransactions(item.entityId)}>Post</Button> }
                                                </td>:null}
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">No Summary for this date</p></td></tr>:<tr><td colSpan="6"><p className="text-center text-danger">No Summary for this date</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                                
                            </tbody>
                            </Table>
                        
                            {this.props.batchTransactionData?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.batchTransactionData?this.props.batchTransactionData.data.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                            </nav>:'' }
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
        postAllStatus:state.batches.postAllTransactionStatus,
        postOnebatch:state.batches.postTransactionStatus,
        postOneError:state.batches.postTransactionError,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBatchesSummary,
        postAllTransactions,
        postTransaction
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Summary);