import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert,Table as Table2} from 'reactstrap';
import {fetchSre,updateSre,createSre,fetchSresPaginated} from '../../actions/sres';
import {fetchAffiliates} from '../../actions/affiliates'
import {fetchBanks} from '../../actions/banks';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddSreComponent from './addSre';
import UpdateSreComponent from './updateSre';
import PropTypes from 'prop-types';
import Pagination2 from "react-js-pagination";
// import AddSubGroup from './addSubGroup';


import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';


class Sres extends Component{
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
            sreCreatedErrorAlertVisible:true,
            hasError:false,
            activePage:1,
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
       this.props.fetchAffiliates();
       this.props.fetchSresPaginated(0)
      
    }

    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchSresPaginated(pageNumberParam)
        this.setState({activePage: pageNumber});
        
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications=()=>{
        this.props.sres.sreCreated = null;
        this.props.sres.sreUpdated = null;
        this.props.sres.sreCreatedError = null;
        
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
        this.props.createSre(values);
        this.closeModal();
    }

    onDismissSreCreatedErrorAlert = ()=> {
        this.setState({
            sreCreatedErrorAlertVisible:false
        })
    }

    updateAffiliate = (id) => {
        this.clearNotifications();
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.fetchSre(id);
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
       this.props.updateSre(values)
        this.closeUpdateModal();
    }
    toggle = () => {
        this.setState({ showModal: !this.state.showModal });
        this.clearNotifications();
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    deleteProcessor = (id) => {
        this.props.deleteProcessor(id);
    }
    
    render(){
        console.log('Props here is ',this.props ,'and local is ',this.local);
        
       
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Sre" defaultMessage="Add Sre"/></Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                   {this.props.sres.sreCreated?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Sre Added Successfully!" defaultMessage="Success: Sre Added Successfully!"/>
                    </Alert>:null}
                    
                    {this.props.sres.sreUpdated?<Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Sre Updated Successfully!" defaultMessage="Success: Sre Updated Successfully!"/>
                    </Alert>:null}
                     {this.props.sres.sreCreatedError?<Alert color="danger" isOpen={this.state.sreCreatedErrorAlertVisible} toggle={this.onDismissSreCreatedErrorAlert}>
                        {this.props.sres.sreCreatedError.data.message}
                    </Alert>:null}
                    {/*{this.props.processorData.createProcessorError?<Alert color="danger" isOpen={this.state.createProcessorErrorAlertVisible} toggle={this.onDismisscreateProcessorErrorAlert}>
                        {this.props.processorData.createProcessorError.response.data.message}
                    </Alert>:null} */}
                    
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            <FormattedMessage id="Sres" defaultMessage="Sres"/>
                        </CardHeader>
                        <CardBody>
                            <Table2 hover bordered striped responsive size="sm" >
                            <thead>
                                <tr>
                                <th>
                                    #
                                </th>
                                {/* <th><FormattedMessage id="app.name" defaultMessage="Name"/></th> */}
                                <th><FormattedMessage id="Code" defaultMessage="Code"/></th>
                                <th><FormattedMessage id="Description" defaultMessage="Description"/></th>
                                <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.props.sres.sreList
                                    ? [
                                        this.props.sres.sreList.content.length > 0 ? this.props.sres.sreList.content? this.props.sres.sreList.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                {/* <td>{item.name}</td> */}
                                                <td>{item.code}</td>
                                                <td>{item.description}</td>
                                                
                                                <td> 
                                                    <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateAffiliate(item.code)}></i> &nbsp; &nbsp;
                                                    
                                                </td>
                                            </tr>
                                        )):<tr key="1"><td colSpan="3"><p className="text-center text-danger"><FormattedMessage id="There are no sres created at the moment" defaultMessage="There are no sres created at the moment."/></p></td></tr>:<tr key="1"><td colSpan="4"><p className="text-center text-danger"><FormattedMessage id="There are no sres created at the moment" defaultMessage="There are no sres created at the moment."/></p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            </tbody>
                            </Table2>                   
                                {this.props.sres.sreList?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.sres.sreList?this.props.sres.sreList.meta.totalElements:null}
                                    pageRangeDisplayed={5} 
                                    onChange={this.handlePageChange}
                                />
                                </nav>:'' }
                        </CardBody>
                        </Card>
                    </Col>
                    </Row>
                    
                     <AddSreComponent {...this.state} {...this.toggle} onSubmit = {this.onSubmit} closeModal={this.closeModal} {...this.props}/>
                    <UpdateSreComponent {...this.state} {...this.updateToggle} closeUpdateModal ={this.closeUpdateModal} onSubmit={this.onSubmitUpdate} {...this.props}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
        sres:state.sres,
        // banks:state.banks,
        affiliates:state.affiliates,
        initialValues:state.sres.sre
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchAffiliates,
        fetchSre,
        createSre,
        updateSre,
        fetchSresPaginated
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Sres);