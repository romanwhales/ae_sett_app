import React, { Component } from 'react';
import { Col, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label ,FormFeedback} from 'reactstrap';
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
const AddBinComponent = (props) => {
    
    const { handleSubmit, pristine, reset, submitting ,onSubmit} = props
    return (

            <Modal isOpen={props.showModal} toggle={props.toggle} >
            
            {console.log(props)}
            
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <ModalHeader toggle={props.toggle}><FormattedMessage 
                    id="Add Bin" defaultMessage="Add Bin"/></ModalHeader>
            <ModalBody>
                

                {/* <Row>
                    <Col xs="12">
                        <Field name="bank" label="Bank" component={renderSelectField} validate={required}>
                            <option value="">Select Bank</option>
                            { props.banks.bankList?props.banks.bankList.data.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                        </Field>
                    </Col>
                </Row> */}
                <Field name="value" type="text" component={renderField} label="Digits" validate={required} />
                <Row>
                    <Col xs="12">
                        <Field name="startIndex" label="Start Index" component={renderSelectField} validate={required}>
                            <option value="">Select Substring StartIndex</option>
                            { props.numbers?props.numbers.map((item,index) => <option value={item.code} key={index}>{item.name}</option>):'' }
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Field name="take" label="Length of Characters" component={renderSelectField} validate={required}>
                            <option value="">Length Of Characters</option>
                            { props.numbers?props.numbers.map((item,index) => <option value={item.code} key={index}>{item.name}</option>):'' }
                        </Field>
                    </Col>
                </Row>
                
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

AddBinComponent.propTypes = {
    onSubmit:PropTypes.func.isRequired,
    closeModal:PropTypes.func.isRequired,
};

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('addBinForm')
);

const validate = (values) =>{
    console.log('Values are ',values)
}
export default reduxForm({
    form:'addBinForm',
    validate,
    onSubmitSuccess: afterSubmit,
    
})(AddBinComponent)