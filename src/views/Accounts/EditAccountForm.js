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

const EditAccountForm = props => {
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
                                <strong>Edit Account</strong>
                            </CardHeader>
                            <CardBody>
                                
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="name"                                           
                                                 type="text"
                                                component={renderField}
                                                label="Name"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="accountNo"                                          
                                                type="text"
                                                component={renderField}
                                                label="Account Number"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="doubleEntryAccountNo"                        
                                                type="text"
                                                component={renderField}
                                                label="Double Entry Account Number"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name="currencyId" label="Currency" component={renderSelectField} >
                                                <option value="">Select Currency</option>
                                                { props.currencyList?props.currencyList.data.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                                            </Field>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name="treatAs" label="Amount Direction" component={renderSelectField} validate={required}>
                                                <option value="">Select Amount Direction</option>
                                                { props.amountDirectionOptions?props.amountDirectionOptions.map((item,index) => <option value={item.alias} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name="accountType" label="Account Type" component={renderSelectField} validate={required}>
                                                <option value="">Select Account Type</option>
                                                { props.accountType?props.accountType.map((item,index) => <option value={item} key={index}>{item}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name="product_id" label="Product" component={renderSelectField} validate={required}>
                                                <option value="">Select Product</option>
                                                { props.productList?props.productList.data.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col md="2">
                                        <Label htmlFor="allow-manual"><FormattedMessage id="Allow Manual Posting" defaultMessage="Allow Manual Posting"/></Label>
                                    </Col>
                                        <Col xs="10">
                                            <FormGroup check inline>
                                                <Field
                                                    name="allowManual"
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
                                                    name="allowManual"
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
  form: 'editAccountDetailsForm', // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  enableReinitialize: true,
})(EditAccountForm);