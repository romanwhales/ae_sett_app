import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label, Alert, Table as Table2 } from 'reactstrap';
import { fetchBanksPaginated, createBank, fetchOneBank, updateBank } from '../../actions/banks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddBankComponent from './addBank';
import UpdateBankComponent from './updateBank';
import PropTypes from 'prop-types';
import Pagination2 from "react-js-pagination";
// import AddSubGroup from './addSubGroup';


import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';




class Banks extends Component {
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
            hasError: false,
            defaultHiddenColumnNames: ['sex', 'car'],
            activePage: 1
        }
        this.onDismissCreateSuccessAlert = this.onDismissCreateSuccessAlert.bind(this);
        this.onDismissUpdateSuccessAlert = this.onDismissUpdateSuccessAlert.bind(this);
        this.onDismissUpdateProcessorErrorAlert = this.onDismissUpdateProcessorErrorAlert.bind(this);
        this.onDismisscreateProcessorErrorAlert = this.onDismisscreateProcessorErrorAlert.bind(this);


    }
    local=''
    code = ''
    componentWillMount=()=>{
        this.props.fetchBanksPaginated(0)
        this.local = JSON.parse(localStorage.decodedToken).authorities[0];
        // /
    }

    // componentDidCatch(error,info){
    //     console.log('Error is ',info);
    //     // Display fallback UI
    //     this.setState({ hasError: true });
    // }
    clearNotifications = () => {
        this.props.banks.bankCreated = null;
        this.props.banks.bankUpdated = null;

    }
    componentWillUnmount() {
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
        this.props.createBank(values);
        this.closeModal();
    }

    updateBank = (id) => {
        this.clearNotifications();
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
        this.props.fetchOneBank(id)
        this.code = id;
    }

    closeUpdateModal = () => {
        this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }

    onSubmitUpdate = (values) => {
        this.props.updateBank(values,this.code);
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
        this.props.fetchBanksPaginated(pageNumberParam);

        this.setState({ activePage: pageNumber });

    }

    render() {
        console.log('Props here is ', this.props, 'and local is ', this.local);


        return (
            <div className="animated fadeIn">
                <Row>
                    <Col style={{ 'textAlign': 'right' }}>
                        <Button style={{ 'marginBottom': '20px' }} color="success" onClick={this.toggle}><i className="fa fa-plus"></i>&nbsp; <FormattedMessage id="Add Bank" defaultMessage="Add Bank" /></Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.props.banks.bankCreated ? <Alert color="success" isOpen={this.state.createSuccessAlertVisible} toggle={this.onDismissCreateSuccessAlert}>

                            <FormattedMessage id="Success: Bank Added Successfully!" defaultMessage="Success: Bank Added Successfully!" />
                        </Alert> : null}

                        {this.props.banks.bankUpdated ? <Alert color="success" isOpen={this.state.updateSuccessAlertVisible} toggle={this.onDismissUpdateSuccessAlert}>

                            <FormattedMessage id="Success: Bank Updated Successfully!" defaultMessage="Success: Bank Updated Successfully!" />
                        </Alert> : null}
                        {/*{this.props.processorData.updateProcessorError?<Alert color="danger" isOpen={this.state.updateProcessorErrorAlertVisible} toggle={this.onDismissUpdateProcessorErrorAlert}>
                        {this.props.processorData.updateProcessorError.response.data.message}
                    </Alert>:null}
                    {this.props.processorData.createProcessorError?<Alert color="danger" isOpen={this.state.createProcessorErrorAlertVisible} toggle={this.onDismisscreateProcessorErrorAlert}>
                        {this.props.processorData.createProcessorError.response.data.message}
                    </Alert>:null} */}

                        <Card>
                            <CardHeader>

                                {/* <i class="fa fa-cog fa-spin"></i> */}
                                <FormattedMessage id="Banks" defaultMessage="Banks" />
                            </CardHeader>
                            <CardBody>
                                <Table2 hover bordered striped responsive size="sm" >
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                </th>
                                            <th><FormattedMessage id="app.name" defaultMessage="Name" /></th>
                                            <th><FormattedMessage id="Code" defaultMessage="Code" /></th>
                                            <th><FormattedMessage id="app.actions" defaultMessage="Actions" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {this.props.banks.bankList
                                            ? [
                                                this.props.banks.bankList.content.length > 0 ? this.props.banks.bankList.content ? this.props.banks.bankList.content.map((item, index) => (
                                                    <tr key={index + 1}>
                                                        <td>{index + 1}</td>
                                                        <td><a href={"#/processors/" + item.id + "/subgroups"}>{item.name}</a></td>
                                                        <td>{item.code}</td>
                                                        <td>
                                                            <i className="fa fa-edit fa-lg text-center" style={{ color: 'blue' }} onClick={(e) => this.updateBank(item.code)}></i> &nbsp; &nbsp;
                                                    <a href={"#/configuration/banks/" + item.code + "/cards"}><FormattedMessage id="View Cards" defaultMessage="View Cards" /></a>

                                                        </td>
                                                    </tr>
                                                )) : <tr><td colSpan="3"><p className="text-center text-danger"><FormattedMessage id="There are no banks created at the moment" defaultMessage="There are no banks created at the moment." /></p></td></tr> : <tr><td colSpan="4"><p className="text-center text-danger"><FormattedMessage id="There are no banks created at the moment" defaultMessage="There are no banks created at the moment." /></p></td></tr>
                                            ]
                                            : [
                                                ''
                                            ]
                                        }


                                    </tbody>
                                </Table2>
                                {this.props.banks.bankList ? <nav>
                                    <Pagination2
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={20}
                                        totalItemsCount={this.props.banks.bankList.content.length > 0 ? this.props.banks.bankList.meta.totalElements : null}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                    />
                                </nav> : ''}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <AddBankComponent {...this.state} {...this.toggle} onSubmit={this.onSubmit} closeModal={this.closeModal} />
                <UpdateBankComponent {...this.state} {...this.updateToggle} closeUpdateModal={this.closeUpdateModal} onSubmit={this.onSubmitUpdate} {...this.props} />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('State is ', state);
    return {
        banks: state.banks,
        initialValues: state.banks.bank,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchBanksPaginated,
        createBank,
        fetchOneBank,
        updateBank
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Banks);