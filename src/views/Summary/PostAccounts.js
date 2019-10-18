import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Table, Button} from 'reactstrap';
import {fetchBatchesSummary} from '../../actions/batches';
import {fetchDailyProcessorsSummary,fetchDailyProcessorPostingAccounts} from '../../actions/stats';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as qs from 'query-string';


import moment from 'moment';

class DailyPostingAccounts extends Component{
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
        }
    }

    componentWillMount(){
        let searchdate = qs.parse(this.props.location.search).date;
        console.log('Processor id ',this.props.match.params.id,'and search date is ',searchdate);
        this.props.fetchDailyProcessorPostingAccounts(this.props.match.params.id,searchdate);
    //    this.props.fetchDailyProcessorsSummary(today);
    }


    
    
    
    render(){
        console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" style={{marginBottom:'20px'}}>
                        <Button color="primary"  size="md" >Post To Core Banking</Button> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i>Daily Posting Accounts
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
                                    <th>Account</th>
                                    <th>Subgroup</th>
                                    <th>Product</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.dailyProcessorAccountList
                                    ? [
                                        this.props.dailyProcessorAccountList.data.length > 0 ? this.props.dailyProcessorAccountList.data ? this.props.dailyProcessorAccountList.data.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td >{item.processor}</td>
                                                <td> 
                                                   {item.amount.toLocaleString()}
                                                </td>
                                                <td>{item.account}</td>
                                                <td>{item.subgroup}</td>
                                                <td>{item.product}</td>
                                                {/* <td>
                                                {item.posted? <Badge className="mr-1" href="#" color="success">Posted</Badge>: <Button color="primary"  size="sm" onClick={(e) => this.postTransactions(index)}>Post</Button> }
                                                </td> */}
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There is no summary for the specified date.</p></td></tr>:<tr><td colSpan="5"><p className="text-center text-danger">There is no account for the processor selected.</p></td></tr>
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
    console.log('State is ',state);
    return {
        
        dailyProcessorAccountList:state.stats.dailyProcesorAccount,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBatchesSummary,
        fetchDailyProcessorsSummary,
        fetchDailyProcessorPostingAccounts
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(DailyPostingAccounts);