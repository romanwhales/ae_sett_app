import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader,FormGroup,FormFeedback} from 'reactstrap';
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
const UpdateBankComponent = (props) => {
    

    const { handleSubmit, pristine, reset, submitting ,onSubmit} = props
    return (

            <Modal isOpen={props.showUpdateModal} toggle={props.toggle} >
            
            {console.log(props)}
            
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <ModalHeader toggle={props.toggle}><FormattedMessage 
                    id="Add Bank" defaultMessage="Update Bank"/></ModalHeader>
            <ModalBody>
                <Field name="name" type="text" component={renderField} label="Bank Name" validate={required} />
                <Field name="code" type="text" component={renderField} label="Bank Code" validate={required} />
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

UpdateBankComponent.propTypes = {
    onSubmit:PropTypes.func.isRequired,
    closeModal:PropTypes.func.isRequired,
};

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('updateBankForm')
);

const validate = (values) =>{
    console.log('Values are ',values)
}
export default reduxForm({
    form:'updateBankForm',
    validate,
    onSubmitSuccess: afterSubmit,
    enableReinitialize: true
    
})(UpdateBankComponent)