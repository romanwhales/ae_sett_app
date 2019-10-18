import React from 'react';
import { Field, FieldArray, reduxForm ,reset} from 'redux-form';
import { Card, CardBody, CardHeader, Col, Row, Button, FormGroup, Input, Label ,FormFeedback} from 'reactstrap';

import {
    FormattedMessage
  } from 'react-intl';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const renderField = ({ input, label, type, meta: { touched, error,warning } }) => (
    <FormGroup row>
        <Col md="2">
            <Label htmlFor={label}><FormattedMessage id={label}/></Label>
        </Col>
        <Col md="10" xs="12">
            <input type={type} id={label} placeholder={label} required {...input} className="form-control"/>
            {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
               
        </Col>
  </FormGroup>
)

const renderFilterField = ({ input, label, type, meta: { touched, error,warning } }) => (
    <FormGroup row>
        
        <Col md="10" xs="12">
            <input type={type} id={label} placeholder={label} required {...input} className="form-control"/>
            {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
               
        </Col>
  </FormGroup>
)


const renderSelectFieldRules = ({input,label,type,meta:{touched,error},children }) => (
    <Input type="select" {...input}>
        {children}
    </Input>
    
)

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

const normalizeBoolean = value => {
    if (value === "true") {
        return true;
    }

    if (value === "false") {
        return false;
    }

    return value;
};


/**
 * Render Add Rules
 */


const addRules = ({ fields,data,state3, utils,mappingToView,indexCarriedOver,operatorList,meta: { error } }) => (
    
    <Row>
        {/* {state} */}
       
        <Col style={{ 'textAlign': 'right' }} xs="12">
            <Button style={{ 'marginTop': '20px','marginBottom': '20px' }} color="success" onClick={() => fields.push({})}><i className="fa fa-plus"></i>&nbsp;Add Rule</Button>
        </Col>
       
        {fields.map((product,indexRule,array) => (
            <Col xs="12" key={indexRule}>  
                <FormGroup row>
                    {console.log('Rules mapping is ',mappingToView,'and index Rule is  ',indexRule,'and product is ',product,'and fields is ',indexCarriedOver,'and Rule ',operatorList)}
                    <Col md="2">
                        <Field name={`${product}.logicalOp`} component="select" className="form-control" validate={required}>
                            <option value="">Select Logical Operator</option>
                            <option value="and">AND</option>
                            <option value="or">OR</option>
                        </Field> 
                    </Col>
                    <Col md="3">
                        <Field name={`${product}.column`} component={renderSelectFieldRules} label="Mapped Field" validate={required}>
                            
                            <option value="" disabled={!mappingToView.length && indexCarriedOver}>Select Mapping Column </option>
                                { mappingToView[indexCarriedOver]?mappingToView[indexCarriedOver].map((item,index2) => <option value={index2}  key={index2}>{item}</option>):'' }
                        </Field>
                    </Col>
                    <Col md="3">
                        
                        <Field name={`${product}.operator`} component={renderSelectFieldRules} label="Operator" validate={required}>
                            <option value="">Select Operator</option>
                            { operatorList?operatorList.data.map((option,index) => <option value={option} key={index}>{option}</option>):null }
                        </Field>
                    </Col>
                    
                    <Col md="3">
                        <Field
                            name={`${product}.value`}
                            type="text"
                            component={renderFilterField}
                            label="Value"
                            validate={required}
                        />
                    </Col>
                    <Col md="1">
                        <FormGroup className="form-actions">
                            <Button type="submit" size="md" color="danger" onClick={() => fields.remove(indexRule)}>Delete</Button>
                        </FormGroup>
                    </Col>
                </FormGroup>
                    
            </Col>
        ))}
    </Row>
)

/**
 * Render Array of Accounts 
 */

const renderAccounts = ({ fields,getSubGroup,getMapping, mappingToView,currencyList,operatorList,accountOptions,fileDefinitionList,productList,amountDirectionOptions,match,meta: { error, submitFailed } }) => (
    <div>
        
        {console.log('Match is ',match)}
        {
            fields.map((account,index)=>(
                        
                        <Card>
                            <CardHeader>
                                <strong>New Account{index + 1}</strong>
                            </CardHeader>
                            <CardBody>
                                
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name={`${account}.name`}                                            
                                                type="text"
                                                component={renderField}
                                                label="Name"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name={`${account}.accountNo`}                                        
                                                type="text"
                                                component={renderField}
                                                label="Account Number"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name={`${account}.doubleEntryAccountNo`}                         
                                                type="text"
                                                component={renderField}
                                                label="Double Entry Account Number"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name={`${account}.currencyId`} label="Currency" component={renderSelectField} validate={required}>
                                                <option value="">Select Currency</option>
                                                { currencyList?currencyList.data.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name={`${account}.treatAs`} label="Amount Direction" component={renderSelectField} validate={required}>
                                                <option value="">Select Amount Direction</option>
                                                { amountDirectionOptions?amountDirectionOptions.map((item,index) => <option value={item.alias} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs="12">
                                            <FormGroup row>
                                                <Col md="2">
                                                <Label><FormattedMessage id="Allow Manual Posting" defaultMessage="Allow Manual Posting"/></Label>
                                                </Col>
                                                <Col md="10">
                                                <FormGroup check inline>
                                                <Field
                                                    name={`${account}.allowManual`}
                                                    component="input"
                                                    type="radio"
                                                    className="form-check-input"
                                                    
                                                    id={`true ${index}`}
                                                    value={true}
                                                    parse={val => val === "true"}
                                                    />{' '}
                                                    <Label className="form-check-label" check htmlFor={`true ${index}`}><FormattedMessage id="True" defaultMessage="True"/></Label>
                                                    
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <Field
                                                        name={`${account}.allowManual`}
                                                        component="input"
                                                        type="radio"
                                                        className="form-check-input"
                                                        
                                                        id={`false ${index}`}
                                                        value={false}
                                                        parse={val => val === false}
                                                        />{' '}
                                                        <Label className="form-check-label" check htmlFor={`false ${index}`}><FormattedMessage id="False" defaultMessage="False"/></Label>
                                                        {/* <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                                                        <Label className="form-check-label" check htmlFor="inline-radio1">One</Label> */}
                                                </FormGroup>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <FormGroup row>
                                                <Col md="2">
                                                <Label><FormattedMessage id="Sign" defaultMessage="Sign"/></Label>
                                                </Col>
                                                <Col md="10">
                                                <FormGroup check inline>
                                                <Field
                                                    name={`${account}.sign`}
                                                    component="input"
                                                    type="radio"
                                                    className="form-check-input"
                                                    value="+"
                                                    id={`signpos ${index}`}
                                                    
                                                    />{' '}
                                                    <Label className="form-check-label" check htmlFor={`signpos ${index}`}> Plus(+)</Label>
                                                    
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <Field
                                                        name={`${account}.sign`}
                                                        component="input"
                                                        type="radio"
                                                        className="form-check-input"
                                                        value="-"
                                                        
                                                        id={`signneg ${index}`}
                                                        />{' '}
                                                        <Label className="form-check-label" check htmlFor={`signneg ${index}`}>Negative (-)</Label>
                                                        {/* <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                                                        <Label className="form-check-label" check htmlFor="inline-radio1">One</Label> */}
                                                </FormGroup>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name={`${account}.accountType`} label="Account Type" component={renderSelectField} validate={required}>
                                                <option value="">Select Account Type</option>
                                                { accountOptions?accountOptions.map((item,index) => <option value={item} key={index}>{item}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    {index == 0 && !match.params.productId?
                                    <Row>
                                        <Col xs="12">
                                            <Field name={`${account}.productId`} label="Product" component={renderSelectField} validate={required}>
                                                <option value="">Select Product</option>
                                                { productList?productList.data.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>:null
                                    }
                                    {index >= 1 ?<Row>
                                        <Col xs="12" style={{'textAlign':'right'}}>
                                        <Button type="button" size="md" color="danger" onClick={() => fields.remove(index)}><i class="fa fa-trash-o" aria-hidden="true"></i></Button> 
                                        </Col>
                                    </Row>:null}
                                    {/* To move to Account Definition Page */}
                                    {/* <Row>
                                        <Col xs="12">
                                            <Field name={`${account}.fileDefinitionId`} label="File Definition" component={renderSelectField} validate={required} onChange={event => {getMapping(event.target.value,index)} }>
                                                <option value="">Select File Defiition</option>
                                                { fileDefinitionList?fileDefinitionList.data.map((item,index) => <option value={item.id} key={index} >{item.mapping.fileName}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                       
                                        <Col xs="12">
                                            <Field name={`${account}.columnIndex`} label="Map Column" component={renderSelectField} validate={required}>
                                                <option value="" disabled={!mappingToView.length && index}>Select Mapping Column </option>
                                                { mappingToView[index]?mappingToView[index].map((item,index2) => <option value={index2}  key={index2}>{item}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    
                                    
                                    <FieldArray name={`${account}.filters`} component={addRules} mappingToView={mappingToView} indexCarriedOver={index} operatorList={operatorList}/> */}
                                    {/* Commented out Previously */}
                                    {/* {!props.match.params.productId?<Row>
                                        <Col xs="12">
                                            <Field name="product_id" label="Product" component={renderSelectField} validate={required}>
                                                <option value="">Select Product</option>
                                                { props.productList?props.productList.data.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>:null} */}
                                     
                                    
                                    {/* <FormGroup className="form-actions">
                                        <Button type="submit" size="md" color="success" disabled={pristine || submitting||invalid }>Submit</Button>
                                    </FormGroup> */}
                                
                            </CardBody>
                        </Card>
                    
                
            ))
        }
        <Row>
            <Col xs="6" style={{'marginBottom':'10px'}}>
                <Button type="button" size="md" color="success" onClick={() => fields.push({})}><FormattedMessage id="Add Account" defaultMessage="Add Account"/></Button>
            </Col>
        </Row>
    </div>
)

const AddAccountForm = props => {
    const {handleSubmit,pristine,reset,submitting,invalid} = props;
    console.log('Props is ',props);
    // const handleChange =(event) => {
    //     debugger;
    // }
    return(
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <FieldArray name="accounts" component={renderAccounts} {...props}/>
                    </Col>
                </Row>
                <Row style={{marginTop:'-45px'}}>
                    <Col md={{ size: 6, offset: 6}} style={{'marginBottom':'20px',textAlign:'right'}}>
                        <Button type="submit" size="md" color="success" disabled={pristine || submitting || invalid} ><FormattedMessage id="app.submit" defaultMessage="Submit"/></Button>
                    </Col>
                </Row>
            </div>
        </form>
    )
}

const validate = (values) =>{
    // Boolean(values.allowManual);
    // values.allowManual = Boolean(values.allowManual);
    console.log('Values are ',values);
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('addAccountForm'));


export default reduxForm({
  form: 'addAccountForm', // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  validate,
  initialValues:{ 
      accounts: [ {name: '', filters: [{}] }],
    }
})(AddAccountForm);