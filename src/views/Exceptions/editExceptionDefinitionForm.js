import React from 'react';
import { Field,reduxForm,reset} from 'redux-form';
import {FormattedMessage} from 'react-intl';

import { Col,  Row,  Button, FormGroup, Input, Label ,FormFeedback} from 'reactstrap';
const required = value => (value || typeof value === 'string' ? undefined : 'Required')

const normalizeBoolean = value => {
    if (value === "true") {
        return true;
    }

    if (value === "false") {
        return false;
    }

    return value;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <div>
        <input {...input} type={type} placeholder={label} className="form-control"/>
        {touched && error && <span>{error}</span>}
        </div>
        {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
    </div>
)

const renderSelectFieldRules = ({input,label,type,meta:{touched,error},children }) => (
   
    <Input type="select" {...input}>
        {children}
    </Input>
    
)

const renderSelectField = ({input,label,type,meta:{touched,error},children }) => (
    
        <Row>
            <Col md="3">
                <Label><FormattedMessage 
                    id={label}/></Label>
            </Col>
            <Col xs="12" md="9">
                <FormGroup >
                    <Input type="select" {...input}>
                        {children}
                    </Input>
                    {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
                </FormGroup>
            </Col>
        </Row>
    
    
)

const EditExceptionDefinitionForm = (props) => {
    const {handleSubmit,pristine,reset,submitting,invalid} = props;
    console.log('Props is ',props);
    return(
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="animated fadeIn">
                <Row>
                    <Col md="3">
                        <Label htmlFor="file-input"><FormattedMessage 
                    id="Has Header" defaultMessage="Has Header"/></Label>
                    </Col>
                    <Col md="9">
                        <FormGroup check inline>
                        <Field
                            name="hasHeader"
                            component="input"
                            type="radio"
                            value={true}
                            className="form-check-input"
                            id="inline-radio1"
                            normalize={normalizeBoolean}
                            />{' '}
                            <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label> 
                        </FormGroup>
                        <FormGroup check inline>
                            <Field
                                name="hasHeader"
                                component="input"
                                type="radio"
                                value={false}
                                className="form-check-input"
                                id="inline-radio2"
                                normalize={normalizeBoolean}
                                />{' '}
                            <Label className="form-check-label" check htmlFor="inline-radio2">No</Label> 
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="3">
                        <Label htmlFor="date-format"><FormattedMessage 
                    id="Date Format" defaultMessage="Date Format"/></Label>
                    </Col>
                    <Col md="9">
                        <FormGroup>
                            <Field name="dateFormat" component="select" className="form-control" validate={required}>
                                <option value="">Select Date Format</option>
                                <option value="MMddyyyy">MM-dd-yyyy</option>
                                <option value="ddMMyyyy">dd-MM-yyyy</option>
                                <option value="yyyyMMdd">yyyy-MM-dd</option>
                                <option value="yyyyddMM">yyyy-MM-dd</option>
                            </Field> 
                        </FormGroup>
                    </Col>
                </Row>   
                
                <Field name="refNoIndex" component={renderSelectField} label="Map Reference Number Field" validate={required}>
                    <option value="">Select Field</option>
                        { props.state.mappedFields?props.state.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>):null }
                </Field>
                <Field name="panIndex" component={renderSelectField} label="Map Pan Field" validate={required}>
                    <option value="">Select Field</option>
                        { props.state.mappedFields?props.state.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>):null }
                </Field>
                <Field name="dateIndex" component={renderSelectField} label="Map Date Field" validate={required}>
                    <option value="">Select Field</option>
                        { props.state.mappedFields?props.state.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>):null }
                </Field>
                <Field name="amountIndex" component={renderSelectField} label="Map Amount Field" validate={required}>
                    <option value="">Select Field</option>
                        { props.state.mappedFields?props.state.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>):null }
                </Field>
                <Field name="descriptionIndex" component={renderSelectField} label="Map Description Field" validate={required}>
                    <option value="">Select Field</option>
                        { props.state.mappedFields?props.state.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>):null }
                </Field>
                
                <FormGroup className="form-actions">
                    <Button type="submit" size="md" color="success" disabled={pristine || submitting || invalid} ><FormattedMessage id="app.submit" defaultMessage="Submit" /></Button>
                    
                </FormGroup>
            </div>
        </form>
    )

}

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('editExceptionDefinitionForm')
);

const validate = (values) =>{
    console.log('Values are ',values)
}

export default reduxForm({
    form: 'editExceptionDefinitionForm', // a unique identifier for this form
    onSubmitSuccess: afterSubmit,
    validate,
  })(EditExceptionDefinitionForm);