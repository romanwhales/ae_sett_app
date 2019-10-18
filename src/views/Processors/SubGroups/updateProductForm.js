import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label ,Alert,FormFeedback} from 'reactstrap';
import {Field,reduxForm,reset} from 'redux-form';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';
// import { invalid } from '../../../../../Library/Caches/typescript/3.0/node_modules/moment/moment';
const required = value => (value || typeof value == 'string' ? undefined : 'Required')
const renderSelectField = ({input,label,meta:{touched,error},children }) => (
    <FormGroup >
        <Label>{label}</Label>
        <Input type="select" {...input}>
            {children}
        </Input>
        {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
    </FormGroup>
)
const UpdateProduct = (props) => {
    const { handleSubmit, pristine, reset, submitting ,onFocus} = props
    return (
        
            <Modal isOpen={props.showUpdateModal} toggle={props.toggle} >
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <ModalHeader toggle={props.toggle}><FormattedMessage id="Update Product" defaultMessage="Update Product"/></ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label htmlFor="processor_name"><FormattedMessage id="Product Name" defaultMessage="Product Name"/></Label>
                    <Field name="name" component="input" type="text" className="form-control" placeholder="Enter Product Name" validate={required}/>
                </FormGroup>
                {props.terminalStatus?<Alert color="success">
                  
                  <FormattedMessage id="Product Updated Successfully!" defaultMessage="Product Updated Successfully!"/>
                </Alert>:null}
                {props.terminalError?<Alert color="danger">
                  Oops - An error occured while updating product.
                </Alert>:null}
            </ModalBody>
            <ModalFooter>
                <Button type="submit" color="primary" disabled={pristine || submitting}><FormattedMessage 
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