import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert,Table as Table2} from 'reactstrap';

import {fetchBankCards,fetchOneBank} from '../../actions/banks';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Pagination2 from "react-js-pagination";
// import AddSubGroup from './addSubGroup';


import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';




class BankCards extends Component{
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
            cardType:[
                {name:'Debit',value:'Debit'},
                {name:'Credit',value:'Credit'}
            ]
        }
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
        this.onDismissUpdateProcessorErrorAlert = this.onDismissUpdateProcessorErrorAlert.bind(this);
        this.onDismisscreateProcessorErrorAlert = this.onDismisscreateProcessorErrorAlert.bind(this);
        

    }
    local=''
    componentWillMount=()=>{
       this.props.fetchBankCards(this.props.match.params.id,0);
       this.props.fetchOneBank(this.props.match.params.id);
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
        this.props.createCard(values);
        this.closeModal();
    }

    updateCard = (id) => {
        this.clearNotifications();
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.fetchCard(id);
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
       this.props.updateCard(values)
        this.closeUpdateModal();
    }
    toggle = () => {
        
        this.props.history.push(`/configuration/banks/${this.props.match.params.id}/cards/addCards`)
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    deleteProcessor = (id) => {
        this.props.deleteProcessor(id);
    }

    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchBankCards(this.props.match.params.id,pageNumberParam);
        this.setState({activePage: pageNumber});
        
    }
    
    render(){
        console.log('Props here is ',this.props ,'and local is ',this.local);
        
       
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Card To Bank" defaultMessage="Add Card To Bank"/></Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {/* {this.props.cards.cardCreated?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Card Added Successfully!" defaultMessage="Success: Card Added Successfully!"/>
                    </Alert>:null}
                    
                    {this.props.cards.cardUpdated?<Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Card Updated Successfully!" defaultMessage="Success: Card Updated Successfully!"/>
                    </Alert>:null} */}
                    {/*{this.props.processorData.updateProcessorError?<Alert color="danger" isOpen={this.state.updateProcessorErrorAlertVisible} toggle={this.onDismissUpdateProcessorErrorAlert}>
                        {this.props.processorData.updateProcessorError.response.data.message}
                    </Alert>:null}
                    {this.props.processorData.createProcessorError?<Alert color="danger" isOpen={this.state.createProcessorErrorAlertVisible} toggle={this.onDismisscreateProcessorErrorAlert}>
                        {this.props.processorData.createProcessorError.response.data.message}
                    </Alert>:null} */}
                    
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            {this.props.banks.bank? this.props.banks.bank.name:'N/A'}
                            <FormattedMessage id=" Cards" defaultMessage=" Cards"/>
                        </CardHeader>
                        <CardBody>
                            <Table2 hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                <th><FormattedMessage id="app.name" defaultMessage="Name"/></th>
                                <th><FormattedMessage id="Card Type" defaultMessage="Card Type"/></th>
                                {/* <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th> */}
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.banks.bankCards
                                    ? [
                                        this.props.banks.bankCards.content.length > 0 ? this.props.banks.bankCards.content? this.props.banks.bankCards.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.type}</td>
                                            
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger">There are no cards created attached to the bank at the moment.</p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger">There are no cards attached to the bank at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table2>                   
                                {this.props.banks.bankCards?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.banks.bankCards?this.props.banks.bankCards.meta.totalElements:null}
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
        banks:state.banks,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBankCards,
        fetchOneBank
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(BankCards);