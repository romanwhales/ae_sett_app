import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert,Table as Table2} from 'reactstrap';
import {fetchCardsPaginated,createCard,fetchCard,updateCard} from '../../actions/cards';
import {fetchBanks} from '../../actions/banks';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddCardComponent from './addCard';
import UpdateCardComponent from './editCard';
import PropTypes from 'prop-types';
import Pagination2 from "react-js-pagination";
// import AddSubGroup from './addSubGroup';


import {FormattedMessage,FormattedDate, FormattedTime} from 'react-intl';




class Cards extends Component{
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
        this.props.fetchCardsPaginated(0)
        this.props.fetchBanks();
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications=()=>{
        
        this.props.cards.cardCreated = null;
        this.props.cards.cardUpdated = null;

        
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
        this.setState({ showModal: !this.state.showModal });
        this.clearNotifications();
    }
    closeModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    deleteProcessor = (id) => {
        this.props.deleteProcessor(id);
    }

    handlePageChange = (pageNumber) => {
        let pageNumberParam = pageNumber - 1;
        this.props.fetchCardsPaginated(pageNumberParam);
        this.setState({activePage: pageNumber});
        
    }
    
    render(){
        console.log('Props here is ',this.props ,'and local is ',this.local);
        
       
        return(
            <div className="animated fadeIn">
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                    <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Bank" defaultMessage="Add Card"/></Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {this.props.cards.cardCreated?<Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Card Added Successfully!" defaultMessage="Success: Card Added Successfully!"/>
                    </Alert>:null}
                    
                    {this.props.cards.cardUpdated?<Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>
                        
                        <FormattedMessage id="Success: Card Updated Successfully!" defaultMessage="Success: Card Updated Successfully!"/>
                    </Alert>:null}
                    {/*{this.props.processorData.updateProcessorError?<Alert color="danger" isOpen={this.state.updateProcessorErrorAlertVisible} toggle={this.onDismissUpdateProcessorErrorAlert}>
                        {this.props.processorData.updateProcessorError.response.data.message}
                    </Alert>:null}
                    {this.props.processorData.createProcessorError?<Alert color="danger" isOpen={this.state.createProcessorErrorAlertVisible} toggle={this.onDismisscreateProcessorErrorAlert}>
                        {this.props.processorData.createProcessorError.response.data.message}
                    </Alert>:null} */}
                    
                        <Card>
                        <CardHeader>
                           
                            {/* <i class="fa fa-cog fa-spin"></i> */}
                            <FormattedMessage id="Cards" defaultMessage="Cards"/>
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
                                <th><FormattedMessage id="app.actions" defaultMessage="Actions"/></th>
                                </tr>
                            </thead>
                            <tbody>

                                {  this.props.cards.cardList
                                    ? [
                                        this.props.cards.cardList.content.length > 0 ? this.props.cards.cardList.content? this.props.cards.cardList.content.map((item,index) => (
                                            <tr key={index+1}>
                                                <td>{index+1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.type}</td>
                                                
                                                <td> 
                                                    <i className="fa fa-edit fa-lg text-center" style={{color:'blue'}} onClick={(e)=>this.updateCard(item.id)}></i> &nbsp; &nbsp;
                                                    
                                                </td>
                                            </tr>
                                        )):<tr><td colSpan="3"><p className="text-center text-danger"><FormattedMessage id="There are no cards created at the moment" defaultMessage="There are no cards created at the moment."/></p></td></tr>:<tr><td colSpan="4"><p className="text-center text-danger"><FormattedMessage id="There are no cards created at the moment" defaultMessage="There are no cards created at the moment."/></p></td></tr>
                                    ]
                                    : [
                                        ''
                                    ]
                                }
                            

                            </tbody>
                            </Table2>                   
                                {this.props.cards.cardList?<nav>
                                <Pagination2
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={20}
                                    totalItemsCount={this.props.cards.cardList.content.length > 0?this.props.cards.cardList.meta.totalElements:null}
                                    pageRangeDisplayed={5} 
                                    onChange={this.handlePageChange}
                                />
                                </nav>:'' }
                        </CardBody>
                        </Card>
                    </Col>
                    </Row>
                    
                     <AddCardComponent {...this.state} {...this.toggle} onSubmit = {this.onSubmit} closeModal={this.closeModal} {...this.props}/>
                    <UpdateCardComponent {...this.state} {...this.updateToggle} closeUpdateModal ={this.closeUpdateModal} onSubmit={this.onSubmitUpdate} {...this.props}/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ',state);
    return {
        cards:state.cards,
        banks:state.banks,
        initialValues:state.cards.card,
    }
  }
  
  const mapDispatchToProps= (dispatch) => {
    return bindActionCreators({
        fetchBanks,
        createCard,
        fetchCard,
        updateCard,
        fetchCardsPaginated
    },dispatch)
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Cards);