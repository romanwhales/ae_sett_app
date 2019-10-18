import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert} from 'reactstrap';
import {getProcessor,createProcessor,deleteProcessor,getOneProcessor,updateProcessor} from '../../actions/processor';
import {fetchPendingAuthorizations,approveAuthorization} from '../../actions/utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import AddProcessorComponent from './addProcessor';
// import UpdateProcessorComponent from './updateProcessor';
import Moment from 'react-moment';


import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';


class CheckerAuthorizations extends Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false,
            processorCreated:false,
            showUpdateModal:false,
            deleteModal:false,
            createSuccessAlertVisible:true,
            updateSuccessAlertVisible:true,
            updateProcessorErrorAlertVisible:true,
            createProcessorErrorAlertVisible:true,
            confirmPostingErrorAlertVisible:true,
            hasError:false,
        }
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
        this.onDismissUpdateProcessorErrorAlert = this.onDismissUpdateProcessorErrorAlert.bind(this);this.onDismissPostingError = this.onDismissPostingError.bind(this);
        

    }
    componentWillMount=()=>{
          this.props.fetchPendingAuthorizations();
    }
    id="";
    action="";

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }

    componentWillUnmount(){
        
        
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

    //   onDismisscreateProcessorErrorAlert(){
    //     this.setState({confirmPostingErrorAlertVisible:false});
    //   }
    onSubmit = (values) =>{
        this.props.createProcessor(values);
       this.closeModal();
    }

    updateProcessor = (id) => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.getOneProcessor(id);
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
        this.props.updateProcessor(values);
        this.closeUpdateModal();
    }
    toggle = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    deleteProcessor = (id) => {
        this.props.deleteProcessor(id);
    }

    approveRequest = (id,action) => {
        this.action = action;
        this.id = id;
        this.setState({deleteModal:!this.state.deleteModal});
        
    }

    confirm = ()=>{
        this.props.approveAuthorization(this.id,this.action);
        this.setState({ deleteModal: !this.state.deleteModal });
    }

    toggleConfirm = () =>{
        this.setState({ deleteModal: !this.state.deleteModal });
    }

    onDismissPostingError =() => {
        this.setState({confirmPostingErrorAlertVisible:false});
    }
    
    render(){
        console.log('Props here is ',this.props);
        // if (this.state.hasError) {
        //     // You can render any custom fallback UI
        //     return <h1>Something went wrong.</h1>;
        //   }
        return(
            <div className="animated fadeIn">
                {/* <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Pending Authorizations" defaultMessage="Pending Authorizations"/></Button>
                    </Col>
                </Row> */}
                
                <Row>
                    <Col>
                        {this.props.pendingAuthorizationsError?<Alert color="danger" isOpen={this.state.confirmPostingErrorAlertVisible} toggle={this.onDismissPostingError}>
                        {this.props.pendingAuthorizationsError.message}
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.authorizationStatus?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                        Success: Authorized Successfully!
                        </Alert>:null}
                    </Col>
                </Row>
                <Row>

                    <Col>
                    
                        <Card>
                        <CardHeader>
                            {/* <i className="fa fa-credit-card-alt"></i> */}
                            <i class="fa fa-cog fa-spin"></i><FormattedMessage id="Pending Authorizations" defaultMessage="Pending Authorizations"/>
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm" className="table-outline mb-0 d-sm-table">
                            <thead className="thead-light">
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        <FormattedMessage id="Entity" defaultMessage="Entity"/>
                                    </th>
                                    <th>
                                        <FormattedMessage id="Amount" defaultMessage="Amount"/>
                                    </th>
                                    <th>
                                        <FormattedMessage id="Created By" defaultMessage="Created By"/>
                                    </th>
                                    <th><FormattedMessage id="Date" defaultMessage="Date "/></th>
                                    <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.pendingAuthorizations
                                    ? [
                                        this.props.pendingAuthorizations.payload.length > 0 ? this.props.pendingAuthorizations.payload ? this.props.pendingAuthorizations.payload.map((item,index) => {
                                            var parsedPayload = JSON.parse(item.payload);
                                            return(
                                                <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.action}</td>
                                                
                                                <td>{parsedPayload.amount}</td>
                                                <td>{item.maker}</td>
                                                <td>
                                                    {/* <Moment>{item.at}</Moment> */}
                                                    {item.at.toString()}
                                                </td>
                                                <td><Button className="btn btn-success" size="sm" onClick={e=>this.approveRequest(item.id,item.action)}> <i class="fa fa-check-circle" aria-hidden="true"></i>&nbsp;Approve</Button> &nbsp;&nbsp;<Button className="btn btn-danger" size="sm"> <i class="fa fa-ban" aria-hidden="true"></i>&nbsp;Decline</Button></td>
                                                {/* <td> 
                                                    <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateProcessor(item.id)}></i>
                                                </td> */}
                                            </tr>
                                            )
                                            
                                        }):<tr><td colSpan="6"><p className="text-center text-danger">There are no batches at the moment.</p></td></tr>:<tr><td colSpan="6"><p className="text-center text-danger">There are no pending authorizations moment.</p></td></tr>
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
                        <ModalHeader toggle={this.toggleConfirm}>Authorization</ModalHeader>
                        <ModalBody>
                            Are you sure you want to approve this resource? 
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.confirm}>Approve</Button>{' '}
                            <Button color="secondary" onClick={this.toggleConfirm}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {/* <AddProcessorComponent {...this.state} {...this.toggle} onSubmit = {this.onSubmit} closeModal={this.closeModal} />
                    <UpdateProcessorComponent {...this.state} {...this.updateToggle} closeUpdateModal ={this.closeUpdateModal} onSubmit={this.onSubmitUpdate} {...this.props}/> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
       pendingAuthorizations:state.utils.pendingAuthorizations,
       authorizationStatus:state.utils.authorizationApproved,
       pendingAuthorizationsError:state.utils.authorizationApprovedError,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchPendingAuthorizations,
        approveAuthorization
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(CheckerAuthorizations);