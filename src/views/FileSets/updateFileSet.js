import React, { Component } from 'react';
import { Button, Col, Input, Modal,ModalHeader,ModalBody,FormGroup,Label,ModalFooter,FormFeedback,Row} from 'reactstrap';
import {Field,reduxForm,reset} from 'redux-form';
import {FormattedMessage} from 'react-intl';



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
const renderSelectField = ({input,label,meta:{touched,error},children }) => (
    <FormGroup >
        <Label><FormattedMessage id={label} defaultMessage={label}/></Label>
        <Input type="select" {...input}>
            {children}
        </Input>
        {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
    </FormGroup>
)
const UpdateFileSet = (props) => {
    
    const { handleSubmit, pristine, reset, submitting  } = props;
     console.log('Here we have fileset ',props);
    //     let id = props.match.params.id;
     /**
      * Redux Form Fields Declaration
      */
    //  const required = value => (value || typeof value === 'number' ? undefined : 'Required')
   
    
   
    return (
        <Modal isOpen={props.showUpdateModal} toggle={this.toggleUpdate} >
        
        
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <ModalHeader toggle={props.toggle}>
                    <FormattedMessage 
                    id="Update FileSet" defaultMessage = "Update FileSet"/>
                </ModalHeader>
                <ModalBody>
                <FormGroup>
                    <Field name="name" component={renderField} type="text" placeholder="Enter your Fileset Name" label="Fileset Name" validate={required}/>
                </FormGroup>  
                <Row>
                    <Col xs="12">
                        <Field name="processor.id" label="Processor" component={renderSelectField} validate={required}>
                            <option value="" >Select Processor</option>
                            { props.processors.processors?props.processors.processors.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                        </Field>
                    </Col>
                </Row>
                <FormGroup>
                    <Field name="description" component={renderField} type="text" placeholder="Enter your Description" label="Description" validate={required}/>
                </FormGroup>  
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit" disabled={pristine || submitting}>Submit</Button>{' '}
                    <Button color="secondary" type="button" onClick={props.closeModal}>Cancel</Button>
                </ModalFooter>
                    

                
            </form>
        </Modal>
    );
}

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('updateFileSetForm')
);

const validate = (values) =>{
    console.log('Values are ',values);
}
export default reduxForm({
    form:'updateFileSetForm',
    validate,
    onSubmitSuccess: afterSubmit,
})(UpdateFileSet)