import React from 'react';
import { Field, reduxForm ,reset} from 'redux-form';
import { Badge, Card, CardBody, CardHeader, Col, Row, Button, FormGroup, Input, Label ,FormFeedback} from 'reactstrap';
import {
    FormattedMessage
  } from 'react-intl';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <FormGroup row>
        <Col md="2">
            <Label htmlFor={label}><FormattedMessage id={label}/></Label>
        </Col>
        <Col md="10" xs="12">
            <input type={type} id={label} placeholder={label} required {...input} className="form-control"/>
        </Col>
  </FormGroup>
    // <div>
    //     <div>
    //     <input {...input} type={type} placeholder={label} className="form-control"/>
    //     {touched && error && <span>{error}</span>}
    //     </div>
    // </div>
)

const required = value => value ? undefined : 'Required';

const normalizeBoolean = value => {
    
    if (value === "true") {
        return true;
    }

    if (value === "false") {
        return false;
    }

    return value;
};

const renderSelectField = ({input,label,meta:{touched,error},children }) => (
    <FormGroup row>
        <Col md="2">
            <Label><FormattedMessage id={label} defaultMessage={label}/></Label>
        </Col>
        <Col xs="12" md="10">
            <Input type="select" {...input}>
                {children}
            </Input>
            {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
        </Col>
    </FormGroup>
)

const EditAffiliateForm = props => {
    const {handleSubmit,pristine,reset,submitting,invalid} = props;
    console.log('Props is ',props);
    // const handleChange =(event) => {
    //     debugger;
    // }
    return(
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                {props.initialValues?<strong>Edit {props.initialValues.name}</strong>:''}
                            </CardHeader>
                            <CardBody>
                                
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="alpha3code"                                           
                                                type="text"
                                                component={renderField}
                                                label="Alpha Code"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="code"                                          
                                                type="text"
                                                component={renderField}
                                                label="Code"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="currencyCode"                        
                                                type="text"
                                                component={renderField}
                                                label="Currency Code"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="currencyNumber"                        
                                                type="text"
                                                component={renderField}
                                                label="Currency Number"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="currencyUnit"                        
                                                type="text"
                                                component={renderField}
                                                label="Currency Unit"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="htmlCurrencyCode"                        
                                                type="text"
                                                component={renderField}
                                                label="HTML Currency Code"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="masterAcqInstId"                        
                                                type="text"
                                                component={renderField}
                                                label="Master Acquisition Id"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="masterMemberId"                        
                                                type="text"
                                                component={renderField}
                                                label="Master Member Id"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="numericCode"                        
                                                type="text"
                                                component={renderField}
                                                label="Numeric Code"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="shortCode"                        
                                                type="text"
                                                component={renderField}
                                                label="Short Code Code"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col md="2">
                                        <Label htmlFor="McDualMessageT112"><FormattedMessage id="mcDualMessageT112" defaultMessage="McDualMessageT112"/></Label>
                                    </Col>
                                        <Col xs="10">
                                            <FormGroup check inline>
                                                <Field
                                                    name="mcDualMessageT112"
                                                    component="input"
                                                    type="radio"
                                                    value={true}
                                                    className="form-check-input"
                                                    id="inline-radio3"
                                                    
                                                    normalize={normalizeBoolean}
                                                    />{' '}
                                                    <Label className="form-check-label" check htmlFor="inline-radio3">Yes</Label> 
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Field
                                                    name="mcDualMessageT112"
                                                    component="input"
                                                    type="radio"
                                                    value={false}
                                                    className="form-check-input"
                                                    id="inline-radio4"
                                                    
                                                    normalize={normalizeBoolean}
                                                    />{' '}
                                                    <Label className="form-check-label" check htmlFor="inline-radio4">No</Label> 
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col md="2">
                                        <Label htmlFor="autoPost"><FormattedMessage id="autoPost" defaultMessage="Auto Post"/></Label>
                                    </Col>
                                        <Col xs="10">
                                            <FormGroup check inline>
                                                <Field
                                                    name="autoPost"
                                                    component="input"
                                                    type="radio"
                                                    value={true}
                                                    className="form-check-input"
                                                    id="inline-radio5"
                                                    
                                                    normalize={normalizeBoolean}
                                                    />{' '}
                                                    <Label className="form-check-label" check htmlFor="inline-radio5">Yes</Label> 
                                            </FormGroup>
                                            <FormGroup check inline>
                                                <Field
                                                    name="autoPost"
                                                    component="input"
                                                    type="radio"
                                                    value={false}
                                                    className="form-check-input"
                                                    id="inline-radio6"
                                                    
                                                    normalize={normalizeBoolean}
                                                    />{' '}
                                                    <Label className="form-check-label" check htmlFor="inline-radio6">No</Label> 
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <FormGroup className="form-actions">
                                        <Button type="submit" size="md" color="success" disabled={pristine || submitting || invalid} ><FormattedMessage id="app.submit" defaultMessage="Submit"/></Button>
                                    </FormGroup>
                                    
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </form>
    )
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('editAccountDetailsForm'));

export default reduxForm({
  form: 'editAffiliateForm', // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  enableReinitialize: true,
})(EditAffiliateForm);