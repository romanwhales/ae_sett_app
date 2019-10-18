import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Button,Alert,Table} from 'reactstrap';
// import {getProcessor,createProcessor,deleteProcessor,getOneProcessor,updateProcessor} from '../../actions/processor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';
import {fetchVss900Summary} from '../../../../../actions/filesets';
import Pagination2 from "react-js-pagination";


class Vss900DailySummary extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            createSuccessAlertVisible:true,
            updateSuccessAlertVisible:true,
            updateProcessorErrorAlertVisible:true,
            vss115SummaryErrorVisible:true,
            hasError:false,
            activePage:1,
        }
    }
    local=''
    componentWillMount=()=>{
        
        this.props.fetchVss900Summary(this.props.match.params.date,0)
        
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications=()=>{
        
      }
    componentWillUnmount(){
        this.clearNotifications();   
    } 
    
    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchVss900Summary(this.props.match.params.date,pageNumberParam)
        
        this.setState({activePage: pageNumber});
        
    }

    onDismissVss900SummaryErrorVisibleAlert = () => {
        this.setState({
            vss115SummaryErrorVisible:false
        })
    }
    render(){
        console.log('Props here is ',this.props );
        
        return(
            <div className="animated fadeIn">
                {/* <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Processor" defaultMessage="Add Processor"/></Button>
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                    
                        {this.props.fileSets.vss900SummaryError?<Alert color="danger" isOpen={this.state.vss900SummaryErrorVisible} toggle={this.onDismissVss900SummaryErrorVisibleAlert}>
                            Error!: {this.props.fileSets.vss900SummaryError.data.message}
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            <FormattedMessage id="VSS 900" defaultMessage="VSS 900"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="Clearing Amount" defaultMessage="Clearing Amount"/></th>
                                <th><FormattedMessage id="Total Clearing Amount" defaultMessage="Total Clearing Amount"/></th>
                                <th><FormattedMessage id="Financial Transaction" defaultMessage="Financial Transaction"/></th>
                                <th><FormattedMessage id="Clearing Currency" defaultMessage="Clearing Currency"/></th>
                                <th><FormattedMessage id="Total Type" defaultMessage="Total Type"/></th>
                                <th><FormattedMessage id="Transaction" defaultMessage="Transaction"/></th>
                                
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.fileSets.vss900Summary
                                    ? [
                                        this.props.fileSets.vss900Summary.data.content.length > 0 ? this.props.fileSets.vss900Summary.data? this.props.fileSets.vss900Summary.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.clearing_amount}</td>
                                                <td> 
                                                    {item.total_clearing_amount}
                                                    
                                                </td>
                                                <td>
                                                    {item.financial_transaction}
                                                </td>
                                                <td>
                                                    {item.clearing_currency}
                                                </td>
                                                <td>
                                                    {item.total_type}
                                                </td>
                                                <td>
                                                    {item.transaction}
                                                </td>
                                                
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no Vss 300 at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no Vss 300 at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table>                     
                                {this.props.fileSets.vss900Summary?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.fileSets.vss900Summary?this.props.fileSets.vss900Summary.data.totalElements:null}
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
    return {
        fileSets:state.fileSets,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchVss900Summary
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Vss900DailySummary);