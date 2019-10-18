import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader,FormGroup,Label ,FormFeedback} from 'reactstrap';
import {Field,reduxForm,reset} from 'redux-form';
import {
    FormattedMessage
  } from 'react-intl';

const required = value => (value || typeof value === 'number' ? undefined :<Label>Required</Label>);
const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <FormGroup>
      <Label><FormattedMessage id={label} default="Subgroup Name"/></Label>
      <input {...input} placeholder={label} type={type} className="form-control"/>
        {touched &&
          ((error && <FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback>) ||
            (warning && <span>{warning}</span>))}
    </FormGroup>
  )

const AddSubGroupComponent = (props) => {
    // console.log('props is ',props);
    // var newOfficeList =[];
    // console.log(props.atms.atmList[0]);
    this.handleChange=(value)=>{
        props.sendSelectValue(value)
    }
    
    const { handleSubmit, pristine, submitting  } = props
    return (
        
            <Modal isOpen={props.showSubGroupModal} toggle={props.toggle} >
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <ModalHeader toggle={props.toggle}><FormattedMessage id="Add Subgroup" default="Add SubGroup"/></ModalHeader>
            <ModalBody>
                
                <FormGroup>
                {/* <Label htmlFor="office_name">Office Name</Label> */}
                <Field name="name" component={renderField} type="text" placeholder="Enter your Subgroup Name" label="SubGroup Name" validate={required}/>
            </FormGroup> 
            </ModalBody>
            <ModalFooter>
                <Button type="submit" color="primary" disabled={pristine || submitting}><FormattedMessage id="app.submit" defaultMessage="Submit"/></Button>{' '}
                <Button color="secondary" type="button" onClick={props.closeModal}><FormattedMessage id="app.cancel" defaultMessage="Cancel"/></Button>
            </ModalFooter>
            </form>
            </Modal>
       
    );
}

const validate = (values) =>{
    console.log('Values are ',values)
}

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('addSubGroupForm')
);
export default reduxForm({
    form:'addSubGroupForm',
    validate,
    onSubmitSuccess:afterSubmit,
})(AddSubGroupComponent)