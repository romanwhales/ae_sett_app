import React, { Component } from 'react';
import {  Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup,FormFeedback} from 'reactstrap';
import {Field,reduxForm,reset} from 'redux-form';
import PropTypes from 'prop-types';
import {
    FormattedMessage
  } from 'react-intl';
const required = value => value ? undefined : ' a Required Field'
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength2 = maxLength(2);

    const renderField = ({
        input,
        label,
        type,
        autoFocus,
        meta: { touched, error, warning,active }
      }) => (
        
        <FormGroup>
            {console.log('Field is ',active=true)}
          {/* <label>{label}</label> */}
          <label><FormattedMessage 
                    id={label}/></label>
          <div>
            <input {...input} placeholder={label} type={type} className="form-control" autofocus="autofocus" />
            {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>{label} is required</FormFeedback></span>}
          </div>
        </FormGroup>
       
      )
const AddAffiliateComponent = (props) => { 
    const { handleSubmit, pristine, reset, submitting ,onSubmit,invalid} = props
    
    return (

            <Modal isOpen={props.showModal} toggle={props.toggle} >
            
            {console.log(props)}
            
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <ModalHeader toggle={props.toggle}><FormattedMessage 
                    id="Add Bank" defaultMessage="Add Affiliate"/></ModalHeader>
            <ModalBody>
                
                {/* <FormGroup>
                    <Label htmlFor="processor_name">Processor Name</Label>
                    <Field name="name" component="input" type="text" className="form-control" placeholder="Enter Processor Name" />
                    
                </FormGroup> */}
                <Field name="name" type="text" component={renderField} label="Affiliate Name" validate={required} />
                <Field name="code" type="text" component={renderField} label="Affiliate Code" validate={[required,maxLength2]} />
            </ModalBody>
            <ModalFooter>
                <Button type="submit" color="primary" disabled={invalid}><FormattedMessage 
                    id="app.submit" defaultMessage="Submit"/></Button>{' '}
                <Button color="secondary" type="button" onClick={props.closeModal}><FormattedMessage 
                    id="app.cancel" defaultMessage="Cancel"/></Button>
            </ModalFooter>
            </form>
            </Modal>
       
    );
}

AddAffiliateComponent.propTypes = {
    onSubmit:PropTypes.func.isRequired,
    closeModal:PropTypes.func.isRequired,
};

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('addAffiliateForm')
);

// const validate = (values) =>{
//     console.log('Values are ',values)
// }
export default reduxForm({
    form:'addAffiliateForm',
    // validate,
    // onSubmitSuccess: afterSubmit,
    // enableReinitialize:true
    
})(AddAffiliateComponent)