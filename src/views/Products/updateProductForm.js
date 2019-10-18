import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label ,FormFeedback,Row,Col} from 'reactstrap';
import {Field,reduxForm,reset} from 'redux-form';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
// import { invalid } from '../../../../../Library/Caches/typescript/3.0/node_modules/moment/moment';
const required = value => (value || typeof value == 'string' ? undefined : 'Required')
const renderSelectField = ({input,label,meta:{touched,error},children }) => (
    <FormGroup >
        <Label><FormattedMessage id={label} defaultMessage={label}/></Label>
        <Input type="select" {...input}>
            {children}
        </Input>
        {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
    </FormGroup>
)
const UpdateProduct = (props) => {
    const { handleSubmit, pristine,  submitting ,invalid} = props
    return (
        
            <Modal isOpen={props.showUpdateModal} toggle={props.toggle} >
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <ModalHeader toggle={props.toggle}><FormattedMessage id="Update Product" defaultMessage="Update Product"/></ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label htmlFor="processor_name"><FormattedMessage id="Product Name" defaultMessage="Product Name"/></Label>
                    <Field name="name" component="input" type="text" className="form-control" placeholder="Enter Product Name" validate={required}/>
                </FormGroup>
                <Row>
                    <Col xs="12">
                        <Field name="processor" label="Processor" component={renderSelectField} onChange={event => {props.getSubGroup(event.target.value)} } validate={required}>
                            <option value="">Select Processor</option>
                            { props.processorData?props.processorData.map((item,index) => <option value={item.name} key={index}>{item.name}</option>):'' }
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Field name="subgroup" label="app.subgroup" component={renderSelectField} validate={required}>
                            <option value="" disabled={!props.subgroups.length}>Select SubGroup</option>
                            { props.subgroups?props.subgroups.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                        </Field>
                    </Col>
                </Row>
                
            </ModalBody>
            <ModalFooter>
                <Button type="submit" color="primary" disabled={pristine || submitting || invalid}><FormattedMessage 
                    id="app.submit" defaultMessage="Submit"/></Button>{' '}
                <Button color="secondary" type="button" onClick={props.closeUpdateModal}><FormattedMessage 
                    id="app.cancel" defaultMessage="Cancel"/></Button>
            </ModalFooter>
            </form>
            </Modal>
       
    );
}

UpdateProduct.propTypes = {
    onSubmit:PropTypes.func.isRequired,
    closeUpdateModal:PropTypes.func.isRequired,
};

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('UpdateProductForm')
);

const validate = (values) =>{
    console.log('Values are ',values)
}
export default reduxForm({
    form:'UpdateProductForm',
    validate,
    enableReinitialize: true,
    onSubmitSuccess:afterSubmit,
})(UpdateProduct)