import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader,  FormGroup, Input, Label ,FormFeedback} from 'reactstrap';
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
    const renderSelectField = ({input,label,meta:{touched,error},children }) => (
    <FormGroup >
        <Label><FormattedMessage id={label} defaultMessage={label}/></Label>
        <Input type="select" {...input}>
            {children}
        </Input>
        {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
    </FormGroup>
)
const UpdateSreComponent = (props) => {
     
    const { handleSubmit, pristine, reset, submitting ,onSubmit} = props
    return (

            <Modal isOpen={props.showUpdateModal} toggle={props.toggle} >
            
            {console.log(props)}
            
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <ModalHeader toggle={props.toggle}><FormattedMessage 
                    id="Add Card" defaultMessage="Add Sre"/></ModalHeader>
            <ModalBody>
                <Field name="code" type="text" component={renderField} label="Sre Code" validate={required} />
                <Field name="description" type="text" component={renderField} label="Description" validate={required} />
                {/* <Row>
                    <Col xs="12">
                        <Field name="affiliate.id" label="Affiliate" component={renderSelectField} validate={required}>
                            <option value="">Select Affiliate</option>
                            { props.affiliates.affiliateList?props.affiliates.affiliateList.data.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                        </Field>
                    </Col>
                </Row> */}
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

UpdateSreComponent.propTypes = {
    onSubmit:PropTypes.func.isRequired,
    closeModal:PropTypes.func.isRequired,
};

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('updateSreForm')
);

const validate = (values) =>{
    console.log('Values are ',values)
}
export default reduxForm({
    form:'updateSreForm',
    validate,
    onSubmitSuccess: afterSubmit,
    enableReinitialize:true
    
})(UpdateSreComponent)