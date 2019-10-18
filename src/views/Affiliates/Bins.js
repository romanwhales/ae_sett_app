import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert,Table as Table2} from 'reactstrap';
import {fetchAffiliateBins,fetchAffiliate} from '../../actions/affiliates'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Pagination2 from "react-js-pagination";

import PropTypes from 'prop-types';
// import AddSubGroup from './addSubGroup';


import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';




class Bins extends Component{
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
            defaultHiddenColumnNames: ['sex', 'car'],
            numbers:[
                {name:'1',value:1},
                {name:'2',value:2},
                {name:'3',value:3},
                {name:'4',value:4},
                {name:'5',value:5},
                {name:'6',value:6},
                {name:'7',value:7},
                {name:'8',value:8},
                {name:'9',value:9},
                {name:'10',value:10},
            ],
            activePage:1
        }
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
        this.onDismissUpdateProcessorErrorAlert = this.onDismissUpdateProcessorErrorAlert.bind(this);
        this.onDismisscreateProcessorErrorAlert = this.onDismisscreateProcessorErrorAlert.bind(this);
        

    }
    local=''
    componentWillMount=()=>{
        let id = this.props.match.params.id
        
        this.props.fetchAffiliateBins(id,0);
        this.props.fetchAffiliate(id)
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications=()=>{
        // this.props.banks.bankCreated = null;
        // this.props.banks.bankUpdated = null;
        
      }
    componentWillUnmount(){
        this.clearNotifications();   
    }

    onDismissCreateSuccessAlert() {
        this.setState({ createSuccessAlertVisible: false });
      }

      onDismissUpdateSuccessAlert() {
          
        this.setState({ updateSuccessAlertVisible: false });
       
      }

      onDismissUpdateProcessorErrorAlert(){
        this.setState({ updateProcessorErrorAlertVisible: false });
      }

      onDismisscreateProcessorErrorAlert(){

      }
    onSubmit = (values) =>{
        this.props.createBin(values);
        this.closeModal();
    }

    updateBin = (id) => {
        this.clearNotifications();
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.fetchBin(id)
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
       this.props.updateBin(values);
        this.closeUpdateModal();
    }
    toggle = () => {
        
        this.props.history.push(`/configuration/affiliates/${this.props.match.params.id}/bins/addbin`)
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    deleteProcessor = (id) => {
        this.props.deleteProcessor(id);
    }

    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchAffiliateBins(this.props.match.params.id,pageNumberParam)
        this.setState({activePage: pageNumber});
        
    }
    
    render(){
        console.log('Props here is ',this.props ,'and local is ',this.local);
        
       
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Bin To Affiliate" defaultMessage="Add Bin To Affiliate"/></Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                   {/* {this.props.bins.binCreated?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Bin Added Successfully!" defaultMessage="Success: Bin Added Successfully!"/>
                    </Alert>:null}
                    
                     {this.props.bins.binUpdated?<Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Bin Updated Successfully!" defaultMessage="Success: Bin Updated Successfully!"/>
                    </Alert>:null} */}
                    {/*{{this.props.processorData.updateProcessorError?<Alert color="danger" isOpen={this.state.updateProcessorErrorAlertVisible} toggle={this.onDismissUpdateProcessorErrorAlert}>
                        {this.props.processorData.updateProcessorError.response.data.message}
                    </Alert>:null}
                    {this.props.processorData.createProcessorError?<Alert color="danger" isOpen={this.state.createProcessorErrorAlertVisible} toggle={this.onDismisscreateProcessorErrorAlert}>
                        {this.props.processorData.createProcessorError.response.data.message}
                    </Alert>:null} */}
                    
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                           {this.props.affiliates.affiliate? this.props.affiliates.affiliate.name: 'N/A'}'s <FormattedMessage id="Bins" defaultMessage="Bins"/>
                        </CardHeader>
                        <CardBody>
                            <Table2 hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="Start Index" defaultMessage="Start Index"/></th>
                                <th><FormattedMessage id="Length" defaultMessage="Length"/></th>
                                <th><FormattedMessage id="Value" defaultMessage="Value"/></th>
                                {/* <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th> */}
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.affiliates.affiliateBinList
                                    ? [
                                        this.props.affiliates.affiliateBinList.content.length > 0 ? this.props.affiliates.affiliateBinList? this.props.affiliates.affiliateBinList.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.startIndex}</td>
                                                <td>{item.take}</td>
                                                <td>{item.value}</td>
                                                {/* <td> 
                                                    <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateBin(item.value)}></i> &nbsp; &nbsp;
                                                    
                                                </td> */}
                                            </tr>
                                        )):<tr><td colSpan="5"><p className="text-center text-danger">There are no bins attached to the affiliate at the moment.</p></td></tr>:<tr><td colSpan="5"><p className="text-center text-danger">There are no bins attached to the affiliate at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table2>                   
                                {this.props.affiliates.affiliateBinList?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.affiliates.affiliateBinList?this.props.affiliates.affiliateBinList.meta.totalElements:null}
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
    console.log('State is ',state);
    return {
        affiliates:state.affiliates
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchAffiliateBins,
        fetchAffiliate
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Bins);