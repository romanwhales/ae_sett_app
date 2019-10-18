import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader,Alert,FormFeedback,Col,FormGroup} from 'reactstrap';
import {Field,reduxForm,reset} from 'redux-form';
import PropTypes from 'prop-types';
import {
    FormattedMessage
  } from 'react-intl';
const required = value => value ? undefined : ' a Required Field'

    const renderField = ({
        input,
        label,
        type,
        autoFocus,
        meta: { touched, error, warning,active }
      }) => (
        
        <div>
            {console.log('Field is ',active=true)}
          {/* <label>{label}</label> */}
          <label><FormattedMessage 
                    id={label}/></label>
          <div>
            <input {...input} placeholder={label} type={type} className="form-control" autofocus="autofocus" />
            {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>{label} is required</FormFeedback></span>}
          </div>
        </div>
       
      )
const AddProcessorComponent = (props) => {
    
    this.handleChange=(value)=>{
        props.sendSelectValue(value)
    }

    
    
    const { handleSubmit, pristine,submitting } = props
    return (

            <Modal isOpen={props.showModal} toggle={props.toggle} >
            
            {console.log(props)}
            
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <ModalHeader toggle={props.toggle}><FormattedMessage 
                    id="Add Processor"/></ModalHeader>
            <ModalBody>
                
                {/* <FormGroup>
                    <Label htmlFor="processor_name">Processor Name</Label>
                    <Field name="name" component="input" type="text" className="form-control" placeholder="Enter Processor Name" />
                    
                </FormGroup> */}
                <FormGroup>
                <Field name="name" type="text" component={renderField} label="Processor Name" validate={required} />
                </FormGroup>
                <FormGroup>
                  <label>Select Scheme Type</label>
                    <Field name="schemeType" component="select" className="form-control" validate={required}>
                        <option value="">Select Scheme Type</option>
                        <option value="MASTERCARD">MasterCard</option>
                        <option value="VISA">Visa</option>
                        <option value="INTER_AFFILIATE">Inter Affiliate</option>
                    </Field> 
               
                </FormGroup>
                {props.terminalStatus?<Alert color="success">
                  Terminal Created Successfully!
                </Alert>:null}
                {props.terminalError?<Alert color="danger">
                  Oops - An error occured while creating terminal.
                </Alert>:null}
            </ModalBody>
            <ModalFooter>
                <Button type="submit" color="primary" disabled={pristine || submitting}><FormattedMessage 
                    id="app.submit" defaultMessage="Submit"/></Button>{' '}
                <Button color="secondary" type="button" onClick={props.closeModal}><FormattedMessage 
                    id="app.cancel" defaultMessage="Cancel"/></Button>
            </ModalFooter>
            </form>
            </Modal>
       
    );
}

AddProcessorComponent.propTypes = {
    onSubmit:PropTypes.func.isRequired,
    closeModal:PropTypes.func.isRequired,
};

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('addAtmForm')
);

const validate = (values) =>{
    console.log('Values are ',values)
}
export default reduxForm({
    form:'addAtmForm',
    validate,
    onSubmitSuccess: afterSubmit,
    
})(AddProcessorComponent)

