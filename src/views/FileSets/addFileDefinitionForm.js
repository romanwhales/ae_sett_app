import React from 'react';
import { Field, FieldArray, reduxForm ,reset} from 'redux-form';
import { Card, CardBody, CardHeader, Col, Row, Button, FormGroup, Input, Label ,FormFeedback} from 'reactstrap';

import {
    FormattedMessage
  } from 'react-intl';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const requiredBoolean = value => (value || typeof value === 'boolean' ? undefined : 'Required')
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

const renderRadioButton = ({input,label,meta:{touched,error},children,options}) => (
    <FormGroup row>
        <Col md="2">
            <Label><FormattedMessage id={label} defaultMessage={label}/></Label>
        </Col>
        
        <Col xs="12" md="10">
            <FormGroup check inline>
            {options.map(o => <Input type="radio" {...input}>
                {children}
            </Input>)}
            {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
            </FormGroup>
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
 * Render Array of Accounts 
 */

const renderAccounts = ({ fields,getSubGroup,getMapping, mappingToView,currencyList,operatorList,accountOptions,fileDefinitionList,productList,amountDirectionOptions,requiredOptions,match,meta: { error, submitFailed } }) => (
    <div>
        
        {console.log('Match is ',match)}
        {
            fields.map((account,index)=>(
                        
                        <Card>
                            <CardHeader>
                                <strong>New File Definition {index + 1}</strong>
                            </CardHeader>
                            <CardBody>
                                
                                    {/* <Row>
                                        <Col xs="12">
                                            <Field
                                                name={`${account}.name`}                                            
                                                type="text"
                                                component={renderField}
                                                label="Name"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row> */} 

                                    <Row>
                                        <Col xs="12">
                                            <Field name={`${account}.definition.id`} label="File Definition" component={renderSelectField} validate={required}>
                                                <option value="">Select File Definition</option>
                                                { fileDefinitionList?fileDefinitionList.data.map((item,index) => <option value={item.id} key={index}>{item.channelFileName}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name={`${account}.requiredBoolean`} label="Required" component={renderSelectField} validate={required} normalize={normalizeBoolean}>
                                                <option value="">Required</option>
                                                { requiredOptions?requiredOptions.map((item,index) => <option value={item.value} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    {index >= 1 ?<Row>
                                        <Col xs="12" style={{'textAlign':'right'}}>
                                        <Button type="button" size="md" color="danger" onClick={() => fields.remove(index)}><i class="fa fa-trash-o" aria-hidden="true"></i></Button> 
                                        </Col>
                                    </Row>:null}
                                    {/* <Row>
                                        <Col xs="12">
                                            <FormGroup row>
                                                <Col md="2">
                                                <Label><FormattedMessage id="Required" defaultMessage="Required"/></Label>
                                                </Col>
                                                <Col md="10">
                                                <FormGroup check inline>
                                                <Field
                                                    name={`${account}.required`}
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
                                                        name={`${account}.required`}
                                                        component="input"
                                                        type="radio"
                                                        className="form-check-input"
                                                        
                                                        id={`false ${index}`}
                                                        value={false}
                                                        parse={val => val === false}
                                                        />{' '}
                                                        <Label className="form-check-label" check htmlFor={`false ${index}`}><FormattedMessage id="False" defaultMessage="False"/></Label>
                                                        
                                                </FormGroup>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                    </Row> */}
                                    
                            </CardBody>
                        </Card>
                    
                
            ))
        }
        <Row>
            <Col xs="6" style={{'marginBottom':'10px'}}>
                
                <Button type="button" size="md" color="success" onClick={() => fields.push({})}><FormattedMessage id="Add File Definition" defaultMessage="Add File Definition"/></Button>
            </Col>
        </Row>
    </div>
)

const AddFileDefinitionForm = props => {
    const {handleSubmit,pristine,reset,submitting,invalid} = props;
    // console.log('Props is ',props);
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
  dispatch(reset('addFileDefinitionForm'));


export default reduxForm({
  form: 'addFileDefinitionForm', // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  validate,
  initialValues:{ 
      accounts: [ {definition: {}, required:'true' }],
    }
})(AddFileDefinitionForm);