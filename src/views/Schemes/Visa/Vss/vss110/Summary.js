import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col,  Row, Button,Alert,Table} from 'reactstrap';
// import {getProcessor,createProcessor,deleteProcessor,getOneProcessor,updateProcessor} from '../../actions/processor';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormattedMessage} from 'react-intl';
import {fetchVss110Summary} from '../../../../../actions/filesets';
import Pagination2 from "react-js-pagination";


class Vss110DailySummary extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            createSuccessAlertVisible:true,
            updateSuccessAlertVisible:true,
            updateProcessorErrorAlertVisible:true,
            createProcessorErrorAlertVisible:true,
            hasError:false,
            activePage:1,
        }
    }
    local=''
    componentWillMount=()=>{
        
        this.props.fetchVss110Summary(this.props.match.params.date,0)
        
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
        this.props.fetchVss110Summary(this.props.match.params.date,pageNumberParam)
        
        this.setState({activePage: pageNumber});
        
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
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            <FormattedMessage id="VSS 110" defaultMessage="VSS 110"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="Credit Amount" defaultMessage="Credit Amount"/></th>
                                <th><FormattedMessage id="Debit Amount" defaultMessage="Debit Amount"/></th>
                                <th><FormattedMessage id="Fee Type" defaultMessage="Fee Type"/></th>
                                <th><FormattedMessage id="Total Amount" defaultMessage="Total Amount"/></th>
                                <th><FormattedMessage id="Total Type" defaultMessage="Total Type"/></th>
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.fileSets.vss110Summary
                                    ? [
                                        this.props.fileSets.vss110Summary.data.content.length > 0 ? this.props.fileSets.vss110Summary.data? this.props.fileSets.vss110Summary.data.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.credit_amount}</td>
                                                <td> 
                                                    {item.debit_amount}
                                                    
                                                </td>
                                                <td>
                                                    {item.fee_type}
                                                </td>
                                                <td>
                                                    {item.total_amount}
                                                </td>
                                                <td>
                                                    {item.total_type}
                                                </td>
                                                
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no batches at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no processors at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table>                     
                                {this.props.fileSets.vss110Summary?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.fileSets.vss110Summary?this.props.fileSets.vss110Summary.data.totalElements:null}
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
        fetchVss110Summary
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Vss110DailySummary );