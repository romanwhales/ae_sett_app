import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader,FormGroup, Label } from 'reactstrap';
import {Field,reduxForm,reset} from 'redux-form';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
const UpdateSubGroupComponent = (props) => {
    // console.log('props is ',props);
    
    // console.log(props.atms.atmList[0]);
    this.handleChange=(value)=>{
        props.sendSelectValue(value)
    }
   
    const { handleSubmit, pristine,submitting} = props
    return (
        
            <Modal isOpen={props.showUpdateModal} toggle={props.toggleUpdate} >
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <ModalHeader toggle={props.toggle}><FormattedMessage 
                    id="Update SubGroup"/></ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label htmlFor="SubGroup Name"> <FormattedMessage id="SubGroup Name" /></Label>
                    <Field name="name" component="input" type="text" className="form-control" placeholder="Enter SubGroup Name" required/>
                </FormGroup>
                
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

UpdateSubGroupComponent.propTypes = {
    onSubmit:PropTypes.func.isRequired,
    closeUpdateModal:PropTypes.func.isRequired,
};

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('UpdateProcessorForm')
);

const validate = (values) =>{
    console.log('Values are ',values)
}
export default reduxForm({
    form:'UpdateProcessorForm',
    validate,
    enableReinitialize: true,
    onSubmitSuccess:afterSubmit,
})(UpdateSubGroupComponent)