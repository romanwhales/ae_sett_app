import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col,  Row, Table,} from 'reactstrap';
import {fetchBatches,fetchBatchesTransactions} from '../../actions/batches';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";



class BatchesTransactions extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            activePage:1
        }
    }

    componentWillMount(){
       this.props.fetchBatches();
       this.props.fetchBatchesTransactions(this.props.match.params.id)
    }
    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchBatchesTransactions(this.props.match.params.id,pageNumberParam);
        this.setState({activePage: pageNumber});
        // this.props.fetchOffices(pageNumber);
        // this.setState({activePage: pageNumber});
    }
    
    render(){
        console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i>Transaction Batch Items
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Narration</th>
                                    <th>Payable</th>
                                    <th>Receivable</th>
                                    <th>Commission</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.batchTransactionData? this.props.batchTransactionData.data.content.map((item,index) => (
                                    <tr key={index+1}>
                                        <td>{index+1}</td>
                                        <td>
                                            {item.narration}
                                        </td>
                                        <td>
                                            {item.payable.toLocaleString()}
                                        </td>
                                        <td>
                                            {item.receivable.toLocaleString()}
                                        </td>
                                        {item.commission >= 0 ? <td className="text-success">
                                            {item.commission.toLocaleString()}
                                        </td>:<td className="text-danger">
                                            {item.commission.toLocaleString()}
                                        </td>}
                                       
                                        
                                    </tr>
                                )):'<p className="text-center">There are no line items at the moment.</p>'}
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
        batchesData:state.batches.batches,
        batchTransactionData:state.batches.batchTransactions,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBatches,
        fetchBatchesTransactions
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(BatchesTransactions);