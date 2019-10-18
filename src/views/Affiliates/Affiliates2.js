import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label, Alert, Table as Table2 } from 'reactstrap';
import { fetchAffiliatesPaginated, fetchAffiliate, updateAffiliate, createAffiliate,fetchAffiliates } from '../../actions/affiliates';
import { fetchBanks } from '../../actions/banks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddAffiliateComponent from './addAffiliate';
import UpdateAffiliateComponent from './updateAffiliate';
import PropTypes from 'prop-types';
import Pagination2 from "react-js-pagination";
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
// import AddSubGroup from './addSubGroup';


import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';

class Affiliates2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            processorCreated: false,
            showUpdateModal: false,
            createSuccessAlertVisible: true,
            updateSuccessAlertVisible: true,
            updateProcessorErrorAlertVisible: true,
            createProcessorErrorAlertVisible: true,
            activePage: 1,
            hasError: false,
            defaultHiddenColumnNames: ['sex', 'car'],
            cardType: [
                { name: 'Debit', value: 'Debit' },
                { name: 'Credit', value: 'Credit' }
            ]
        }
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
        this.onDismissUpdateProcessorErrorAlert = this.onDismissUpdateProcessorErrorAlert.bind(this);
        this.onDismisscreateProcessorErrorAlert = this.onDismisscreateProcessorErrorAlert.bind(this);


    }
    local = ''
    componentWillMount = () => {
        this.props.fetchAffiliates();
        this.props.fetchAffiliatesPaginated(0);
        
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications = () => {
        // this.props.banks.bankCreated = null;
        // this.props.banks.bankUpdated = null;
        this.props.affiliates.affiliateCreated = null;
        this.props.affiliates.affiliateUpdated = null;

        
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

    onDismissUpdateProcessorErrorAlert() {
        this.setState({ updateProcessorErrorAlertVisible: false });
    }

    onDismisscreateProcessorErrorAlert() {

    }
    onSubmit = (values) => {
        this.props.createAffiliate(values);
        this.closeModal();
    }

    updateAffiliate = (id) => {
        this.clearNotifications();
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.fetchAffiliate(id);
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
        this.props.updateAffiliate(values);
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
        this.props.fetchAffiliatesPaginated(pageNumberParam)
        this.setState({ activePage: pageNumber });

    }

    render() {
        console.log('Props here is ', this.props, 'and local is ', this.local);


        return (
            <div className="animated fadeIn">
                {/* <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                        <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Affiliate" defaultMessage="Add Affiliate" /></Button>
                    </Col>
                </Row> */}
                
                <Row>
                    <Col>

                        {this.props.affiliates.affiliateCreated ? <Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>

                            <FormattedMessage id="Success: Affiliate Added Successfully!" defaultMessage="Success: Affiliate Added Successfully!" />
                        </Alert> : null}

                        {this.props.affiliates.affiliateUpdated ? <Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>

                            <FormattedMessage id="Success: Affiliate Updated Successfully!" defaultMessage="Success: Affiliate Updated Successfully!" />
                        </Alert> : null}
                        {/*{this.props.processorData.updateProcessorError?<Alert color="danger" isOpen={this.state.updateProcessorErrorAlertVisible} toggle={this.onDismissUpdateProcessorErrorAlert}>
                        {this.props.processorData.updateProcessorError.response.data.message}
                    </Alert>:null}
                    {this.props.processorData.createProcessorError?<Alert color="danger" isOpen={this.state.createProcessorErrorAlertVisible} toggle={this.onDismisscreateProcessorErrorAlert}>
                        {this.props.processorData.createProcessorError.response.data.message}
                    </Alert>:null} */}

                        <Card>
                            <CardHeader>
                                
                                <FormattedMessage id="Affiliates" defaultMessage="Affiliates" /> 
                                <Button className={'float-right mb-0'} style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Affiliate" defaultMessage="Add Affiliate" /></Button>
                            </CardHeader>
                            <CardBody>
                            
                                <Row >
                                {this.props.affiliates.affiliateListUnPaginated
                                            ? [
                                                this.props.affiliates.affiliateListUnPaginated.length > 0 ? this.props.affiliates.affiliateListUnPaginated ? this.props.affiliates.affiliateListUnPaginated.map((item, index) => (
                                                    <Col style={{display:'flex',flexDirection:'column'}} md="2">
                                                        <i className={"flag-icon flag-icon-"+item.code.toLowerCase()} title="al" id="al" style={{fontSize:'7.5rem'}}></i>
                                                        
                                                        <a style={{cursor:'pointer'}}href={"#/configuration/affiliates/" + item.code + "/details"}><h6 style={{textAlign:'center',paddingTop:'10px'}}>{item.name.toUpperCase()}</h6></a>
                                                        <h6 style={{textAlign:'center'}}>CODE: {item.code.toUpperCase()}</h6>
                                                        </Col>
                                                    
                                                )) : <tr key="1"><td colSpan="4"><p className="text-center text-danger"><FormattedMessage id="There are no affiliates created at the moment" defaultMessage="There are no affiliates created at the moment." /></p></td></tr> : <tr key="1"><td colSpan="4"><p className="text-center text-danger"><FormattedMessage id="There are no affiliates created at the moment" defaultMessage="There are no affiliates created at the moment." /></p></td></tr>
                                            ]
                                            : [
                                                ''
                                            ]
                                        }
                                    {/* <Col style={{display:'flex',flexDirection:'column'}} md="2">
                                    <i className="flag-icon flag-icon-ng" title="al" id="al" style={{fontSize:'7.5rem'}}></i>
                                    <h6 style={{textAlign:'center',paddingTop:'10px'}}>NIGERIA</h6>
                                    <h6 style={{textAlign:'center'}}>CODE: NG</h6>
                                    </Col>
                                    <Col style={{display:'flex',flexDirection:'column'}} md="2">
                                    <i className="flag-icon flag-icon-td" title="al" id="al" style={{fontSize:'7.5rem'}}></i>
                                    <h6 style={{textAlign:'center',paddingTop:'10px'}}>Nigeria</h6>
                                    </Col>
                                    <Col style={{display:'flex',flexDirection:'column'}} md="2">
                                    <i className="flag-icon flag-icon-gh" title="al" id="al" style={{fontSize:'7.5rem'}}></i>
                                    <h6 style={{textAlign:'center',paddingTop:'10px'}}>Nigeria</h6>
                                    </Col> */}
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <AddAffiliateComponent {...this.state} {...this.toggle} onSubmit={this.onSubmit} closeModal={this.closeModal} {...this.props} />
                <UpdateAffiliateComponent {...this.state} {...this.updateToggle} closeUpdateModal={this.closeUpdateModal} onSubmit={this.onSubmitUpdate} {...this.props} />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ', state);
    return {
        // cards:state.cards,
        // banks:state.banks,
        affiliates: state.affiliates,
        initialValues: state.affiliates.affiliate
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchAffiliate,
        createAffiliate,
        updateAffiliate,
        fetchAffiliates,
        fetchAffiliatesPaginated
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Affiliates2);