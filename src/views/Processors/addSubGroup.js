import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, Modal,ModalHeader,ModalBody,FormGroup,Label,ModalFooter,Alert,FormFeedback} from 'reactstrap';
import {Field,reduxForm,reset} from 'redux-form';



const required = value => (value || typeof value === 'number' ? undefined :<Label>Required</Label>);
const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <FormGroup>
      <Label>{label}</Label>
      <input {...input} placeholder={label} type={type} className="form-control"/>
        {touched &&
          ((error && <FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback>) ||
            (warning && <span>{warning}</span>))}
    </FormGroup>
  )
const AddSubGroup = (props) => {
    
    const { handleSubmit, pristine, reset, submitting  } = props;
    //  console.log('Here we have office ',props);
    //     let id = props.match.params.id;
     /**
      * Redux Form Fields Declaration
      */
    //  const required = value => (value || typeof value === 'number' ? undefined : 'Required')
   
    
   
    return (
        // <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        
        
        <form onSubmit={handleSubmit(props.onSubmit)}>
        <FormGroup>
            {/* <Label htmlFor="office_name">Office Name</Label> */}
            <Field name="name" component={renderField} type="text" placeholder="Enter your Subgroup Name" label="SubGroup Name" validate={required}/>
          </FormGroup>      
          {props.officeCreatedError?<Alert color="danger">
              Error!: {props.officeCreatedError.message}
            </Alert>:null}
            <Button color="primary" type="submit" disabled={pristine || submitting}>Submit</Button>{' '}
          <Button color="secondary" type="button" onClick={props.closeModal}>Cancel</Button>
        </form>
    );
}

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('addSubGroupFor')
);

const validate = (values) =>{
    console.log('Values are ',values);
}
export default reduxForm({
    form:'addSubGroupFor',
    validate,
    onSubmitSuccess: afterSubmit,
})(AddSubGroup)