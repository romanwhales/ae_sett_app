import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader,Alert} from 'reactstrap';
import {fetchAccounts,deleteAccount} from '../../actions/accounts';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import AddProcessorComponent from './addProcessor';
// import UpdateProcessorComponent from './updateProcessor';

import {
    FormattedMessage
  } from 'react-intl';

class Accounts extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            deleteModal:false,
            createSuccessAlertVisible:true,
            deletedSuccessAlertVisible:true,
            updateSuccessAlertVisible:true,
            updatedSuccessAlertVisible:true,
            accountListErrorAlertVisible:true
        }
        this.onDismissCreateSuccessAlert= this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissDeletedSuccessAlert = this.onDismissDeletedSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
    }
    id=''
    local=''

    onDismissCreateSuccessAlert(){
        this.setState({ createSuccessAlertVisible: false });
    }

    onDismissDeletedSuccessAlert(){
        this.setState({ deletedSuccessAlertVisible: false });
    }

    onDismissUpdateSuccessAlert(){
        this.setState({ updateSuccessAlertVisible: false });
    }
    componentWillMount(){
        this.props.fetchAccounts();
        this.local = JSON.parse(localStorage.decodedToken).authorities[0];
    }

    setUpProductMapping =(id) => {
        this.props.history.push(`/products/setup/${id}`);
    }

    updateAccount = (id) => {
        this.props.history.push(`/accounts/${id}/edit`);
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }
    addAccount = () => {
        this.props.history.push('/accounts/addAccounts');
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
   
    toggleConfirm = () =>{
        this.setState({ deleteModal: !this.state.deleteModal });
    }
    confirm = ()=> {
        this.props.deleteAccount(this.id);
        this.setState({deleteModal:false});
    }

    onDismissAccountListErrorAlert = () => {
        this.setState({
            accountListErrorAlertVisible:false
        })
    }
    
    deleteAccount = (value) => {
        this.clearNotifications()
        this.setState({deleteModal:true});
        this.id = value;    
    }
    componentWillUnmount(){
        this.clearNotifications()
    }
    clearNotifications = () => {
        this.props.accounts.accountUpdated = null;
        this.props.accounts.accountUpdated = null;
    }
    
    render(){
        console.log('Props here is ',this.props);
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                        <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.addAccount}><i className="fa fa-plus"></i>&nbsp;<FormattedMessage id="Add Account" defaultMessage="Add Account"/></Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        {this.props.accounts.accountDeleted ?<Alert color="success" isOpen={this.state.deletedSuccessAlertVisible} toggle={this.onDismissDeletedSuccessAlert}>
                                Success: Account Deleted Successfully!
                            </Alert>:null}
                    </Col>
                    <Col xs="12">
                        {this.props.accounts.accountUpdated ?<Alert color="success" isOpen={this.state.updatedSuccessAlertVisible} toggle={this.onDismissUpdatedSuccessAlert}>
                                Success: Account Updated Successfully!
                            </Alert>:null}
                    </Col>
                    <Col>
                        {this.props.accounts.accountListError?<Alert color="danger" isOpen={this.state.accountListErrorAlertVisible} toggle={this.onDismissAccountListErrorAlert}>
                            Error: {this.props.accounts.accountListError.data.message}
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                        <Card>
                        <CardHeader>
                            {/* <i className="fa fa-credit-card-alt"></i>  */}
                            <FormattedMessage id="app.account" defaultMessage="Accounts"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                
                                <th>
                                    <FormattedMessage id="app.name" defaultMessage="Name"/>
                                </th>
                                <th>
                                    <FormattedMessage id="Product Name" defaultMessage="Product Name"/>
                                </th>
                                <th>
                                    <FormattedMessage id="app.currency" defaultMessage="Currency"/>
                                    
                                </th>
                                <th>
                                    <FormattedMessage id="app.accountType" defaultMessage="Account Type"/>
                                </th>
                                <th>
                                    <FormattedMessage id="app.accountNumber" defaultMessage="Account Number"/>
                                </th>
                                <th>
                                    <FormattedMessage id="Allow Manual Posting" defaultMessage="Allow Manual Posting"/>
                                    
                                </th>
                                <th>
                                <FormattedMessage id="Double Entry Account Number" defaultMessage="Double Entry Account Number"/>
                                </th>
                                <th>
                                <FormattedMessage id="Amount Direction" defaultMessage="Amount Direction"/>
                                </th>
                                <th>
                                    <FormattedMessage id="app.actions" defaultMessage="Actions"/>
                                </th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                
                                {this.props.accounts.accountList
                                    ? [
                                        this.props.accounts.accountList.data.length > 0 ?  this.props.accounts.accountList.data.map((item,index) => (
                                            <tr key={index+1}>
                                               
                                                <td><a href={"#/accounts/"+item.id+"/definitions"}>{item.name}</a></td>
                                                <td>{item.product}</td>
                                                <td>{item.currency}</td>
                                                <td>{item.accountType}</td>
                                               
                                                <td>{item.accountNo}</td>
                                                <td>{item.allowManual?'True':'False'}</td>
                                                <td>{item.doubleEntryAccountNo?item.doubleEntryAccountNo:'N/A'}</td>
                                                <td>{item.treatAs?item.treatAs:'N/A'}</td>
                                                <td><i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateAccount(item.id)}></i>  <i className="fa fa-trash fa-lg text-center" style={{color:'red'}} onClick={(e) => this.deleteAccount(item.id)}></i> </td>
                                            </tr>
                                        )):<tr><td colSpan="9"><p className="text-center text-danger">There are no accounts at the moment.</p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            </tbody>
                            </Table>
                        
                            {/* {this.props.atms.atmList?<nav>
                            <Pagination2
                                activePage={this.state.activePage}
                                itemsCountPerPage={20}
                                totalItemsCount={this.props.atms.atmList?this.props.atms.atmList.totalElements:null}
                                pageRangeDisplayed={5} 
                                onChange={this.handlePageChange}
                            />
                            </nav>:'' } */}
                        </CardBody>
                        </Card>
                    </Col>
                    </Row>
                    <Modal isOpen={this.state.deleteModal}  className={this.props.className}>
                        <ModalHeader toggle={this.toggleConfirm}><FormattedMessage id="Delete" defaultMessage="Delete" /></ModalHeader>
                        <ModalBody>
                            <FormattedMessage id="Are you sure you want to delete this account?" defaultMessage="Are you sure you want to delete this account?"/> 
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.confirm}><FormattedMessage id="Delete" defaultMessage="Delete" /></Button>{' '}
                            <Button color="secondary" onClick={this.toggleConfirm}><FormattedMessage id="app.cancel" defaultMessage="Cancel" /></Button>
                        </ModalFooter>
                    </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log('Products State is ',state);
    return {
        accounts:state.accounts
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchAccounts,
        deleteAccount
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Accounts);