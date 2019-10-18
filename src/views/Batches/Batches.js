import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,} from 'reactstrap';
import {fetchBatches,fetchBatchesForProductName} from '../../actions/batches';
import {fetchProducts} from '../../actions/products';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SearchBatchesFormComponent from './searchBatchesForm';
import Pagination2 from "react-js-pagination";
import {FormattedMessage,FormattedDate, FormattedNumber} from 'react-intl';



class Batches extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            date :new Date(),
            activePage:1,
        }
        this.handlePageChange = this.handlePageChange.bind(this);

    }
    componentWillMount(){
       this.props.fetchBatches(null);
       this.props.fetchProducts();
    }
    onSubmit = (values) =>{
        this.props.fetchBatchesForProductName(values.product.label);
    }
    change=(date)=>{
        this.setState({date});
    }
    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchBatches(pageNumberParam);
        // this.props.fetchBatchesTransactions(this.props.match.params.id,pageNumberParam);
        this.setState({activePage: pageNumber});
        
    }
    render(){
        // console.log('Props in Transaction Batches ',this.props);
        return(
            <div className="animated fadeIn">
                <SearchBatchesFormComponent {...this.props} onSubmit = {this.onSubmit} {...this.state} change={this.change}/>
                <Row>    
                    <Col>
                        <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i><FormattedMessage id="Transaction Batches" defaultMessage="Transaction Batches"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th><FormattedMessage id="Date" defaultMessage="Date"/></th>
                                    <th><FormattedMessage id="File Name" defaultMessage="File Name"/></th>
                                    <th><FormattedMessage id="Amount" defaultMessage="Amount"/></th>
                                    <th><FormattedMessage id="Channel FileName" defaultMessage="Channel FileName"/></th>
                                    <th><FormattedMessage id="Transactions" defaultMessage="Transactions"/></th>
                                    
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.batchesData
                                    ? [
                                        this.props.batchesData.data.content.length > 0 ? this.props.batchesData? this.props.batchesData.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>
                                                   {/* <Moment>{item.processedOn * 1000}</Moment> */}
                                                   
                                                   {item.processedOn?<FormattedDate value={new Date(item.processedOn*1000)} year='numeric' month='long' day='numeric' weekday='long'/>:null}
                                                </td>
                                                <td>
                                                    
                                                    {item.fileName?item.fileName:'N/A'}
                                                </td>
                                                <td>
                                                    <FormattedNumber value={item.amount}/> 
                                                    {/* {item.amount.toLocaleString()} */}
                                                </td>
                                                <td>
                                                    {item.channelFileName?item.channelFileName:'N/A'}
                                                </td>
                                                <td>
                                                    <FormattedNumber value={item.transactionCount}/> 
                                                    
                                                </td>
                                            </tr>
                                        )):<tr><td colSpan="6"><p className="text-center text-danger">There are no batches at the moment.</p></td></tr>:<tr><td colSpan="6"><p className="text-center text-danger">There are no batches at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            </tbody>
                            </Table>
                        
                            {this.props.batchesData?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.batchesData?this.props.batchesData.data.totalElements:null}
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
        productsData:state.products.products,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBatches,
        fetchProducts,
        fetchBatchesForProductName
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Batches);