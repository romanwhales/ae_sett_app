import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Button,Alert,Table} from 'reactstrap';
// import {getProcessor,createProcessor,deleteProcessor,getOneProcessor,updateProcessor} from '../../actions/processor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';
import {fetchVss300Summary} from '../../../../../actions/filesets';
import Pagination2 from "react-js-pagination";


class Vss300DailySummary extends Component{
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
        
        this.props.fetchVss300Summary(this.props.match.params.date,0)
        
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
        this.props.fetchVss300Summary(this.props.match.params.date,pageNumberParam)
        
        this.setState({activePage: pageNumber});
        
    }

    onDismissVss115SummaryErrorVisibleAlert = () => {
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
                    
                        {this.props.fileSets.vss300SummaryError?<Alert color="danger" isOpen={this.state.vss300SummaryErrorVisible} toggle={this.onDismissVss300SummaryErrorVisibleAlert}>
                            Error!: {this.props.fileSets.vss300SummaryError.data.message}
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            <FormattedMessage id="VSS 300" defaultMessage="VSS 300"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="Interchange Count" defaultMessage="Interchange Count"/></th>
                                <th><FormattedMessage id="Interchange Value" defaultMessage="Interchange Value"/></th>
                                <th><FormattedMessage id="Reimbursement Fees" defaultMessage="Reimbursement Fees"/></th>
                                <th><FormattedMessage id="Settlement Amount" defaultMessage="Settlement Amount"/></th>
                                <th><FormattedMessage id="Visa Charges" defaultMessage="Visa Charges"/></th>
                                {/* <th><FormattedMessage id="Visa Charges" defaultMessage="Visa Charges"/></th> */}
                                <th><FormattedMessage id="Total Type" defaultMessage="Total Type"/></th>
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.fileSets.vss300Summary
                                    ? [
                                        this.props.fileSets.vss300Summary.data.content.length > 0 ? this.props.fileSets.vss300Summary.data? this.props.fileSets.vss300Summary.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.interchange_count}</td>
                                                <td> 
                                                    {item.interchange_value}
                                                    
                                                </td>
                                                <td>
                                                    {item.reimbursement_fees}
                                                </td>
                                                <td>
                                                    {item.settlement_amount}
                                                </td>
                                                <td>
                                                    {item.visa_charges}
                                                </td>
                                                <td>
                                                    {item.total_type}
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
                                {this.props.fileSets.vss300Summary?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.fileSets.vss300Summary?this.props.fileSets.vss300Summary.data.totalElements:null}
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
        fetchVss300Summary
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Vss300DailySummary );