import React from 'react';
import { Field, FieldArray, reduxForm,reset} from 'redux-form';
import {FormattedMessage,} from 'react-intl';

import { Col, Row, Button, FormGroup, Input, Label ,FormFeedback} from 'reactstrap';
const required = value => (value || typeof value === 'number' ? undefined : 'Required')


const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <div>
        <input {...input} type={type} placeholder={label} className="form-control"/>
        {touched && error && <span>{error}</span>}
        </div>
        {/* {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>} */}
    </div>
)

const renderSelectFieldRules = ({input,label,type,meta:{touched,error},children }) => (
   <div>
    <Input type="select" {...input}>
        {children}
    </Input>
    {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
   </div>
    
)

const renderSelectField = ({input,label,type,meta:{touched,error},children }) => (
    <FormGroup >
        <Row>
            <Col md="3">
                <Label><FormattedMessage 
                    id={label}/></Label>
            </Col>
            <Col xs="12" md="9">
                <Input type="select" {...input}>
                    {children}
                </Input>
                {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
            </Col>
        </Row>
    </FormGroup>
    
)

const addRules = ({ fields,data,state3, utils,meta: { error } }) => (
    
    <Row>
        {/* {state} */}
       
        <Col style={{ 'textAlign': 'right' }} xs="12">
            <Button style={{ 'marginTop': '20px','marginBottom': '20px' }} color="success" onClick={() => fields.push({})}><i className="fa fa-plus"></i>&nbsp;Add Rule</Button>
        </Col>
       
        {fields.map((product,index) => (
            <Col xs="12" key={index}>  
                <FormGroup row>
                    <Col md="2">
                        <Field name={`${product}.logicalOp`} component="select" className="form-control" validate={required}>
                            <option value="">Select Logical Operator</option>
                            <option value="and">AND</option>
                            <option value="or">OR</option>
                        </Field> 
                    </Col>
                    <Col md="3">
                        <Field name={`${product}.column`} component={renderSelectFieldRules} label="Mapped Field" validate={required}>
                            <option value="">Select Field</option>
                            { state3.map((option,index) => <option value={index} key={index}>{option}</option>) }
                        </Field>
                    </Col>
                    <Col md="3">
                        <Field name={`${product}.operator`} component={renderSelectFieldRules} label="Operator" validate={required}>
                            <option value="">Select Operator</option>
                            { utils.data.map((option,index) => <option value={option} key={index}>{option}</option>) }
                        </Field>
                    </Col>
                    
                    <Col md="3">
                        <Field
                            name={`${product}.value`}
                            type="text"
                            component={renderField}
                            label="Value"
                            validate={required}

                        />
                    </Col>

                    
                    <Col md="1">
                    <FormGroup className="form-actions">
                        <Button size="md" color="danger" onClick={() => fields.remove(index)}>Delete</Button>
                    </FormGroup>
                    </Col>
                </FormGroup>
                    
            </Col>
        ))}
    </Row>
)



const AddProductDefinitonForm = (props) => {
    const {handleSubmit,pristine,reset,submitting,getMapping,fileDefinitionList,invalid} = props;
    console.log('Props is ',props);
    return(
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="animated fadeIn">
                {/* <Row>
                    <Col md="3">
                        <Label htmlFor="file-input">Headers Included</Label>
                    </Col>
                    <Col md="9">
                        <FormGroup check inline>
                        <Field
                            name="hasHeader"
                            component="input"
                            type="radio"
                            value="true"
                            className="form-check-input"
                            id="inline-radio1"
                            validate={required}
                            />{' '}
                            <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label> 
                        </FormGroup>
                        <FormGroup check inline>
                            <Field
                                name="hasHeader"
                                component="input"
                                type="radio"
                                value="false"
                                className="form-check-input"
                                id="inline-radio2"
                                validate={required}
                                />{' '}
                            <Label className="form-check-label" check htmlFor="inline-radio2">No</Label> 
                        </FormGroup>
                    </Col>
                </Row> */}
                {/* <Row>
                    <Col md="3">
                        <Label htmlFor="file-input">Currency</Label>
                    </Col>
                    <Col md="9">
                        <FormGroup>
                            <Field name="format" component="select" className="form-control" validate={required}>
                                <option value="">Select Currency</option>
                                <option value="Naira">Naira/Dollars</option>
                                <option value="Kobo">Kobo/Cents</option>
                            </Field> 
                        </FormGroup>
                    </Col>
                </Row> */}
                <Row>
                    <Col md="3">
                        <Label htmlFor="file-input"><FormattedMessage id="Sign" defaultMessage="Sign"/></Label>
                    </Col>
                    <Col md="9">
                        <FormGroup>
                            <Field name="sign" component="select" className="form-control" validate={required}>
                                <option value="">Select Sign</option>
                                <option value="+">+</option>
                                <option value="-">-</option>
                            </Field> 
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Field name="fileDefinitionId" label="File Definitions" component={renderSelectField} validate={required} onChange={event => {getMapping(event.target.value)} }>
                            <option value="">Select File Definition</option>
                            { fileDefinitionList?fileDefinitionList.data.map((item,index) => <option value={item.id} key={index} >{item.channelFileName}</option>):'' }
                        </Field>
                    </Col>
                </Row>
                    <Field name="columnIndex" component={renderSelectField} label="Map Amount Field" validate={required}>
                        <option value="">Select Field</option>
                        {/* { props.state.mappingToView?props.state.mappingToView.map((option,index) => <option value={index} key={index}>{option}</option>):null } */}
                        { props.fileDefinition.fileDefinition?props.fileDefinition.fileDefinition.mapping.firstRow.map((option,index) => <option value={index} key={index}>{option}</option>):null }
                    </Field>
                {props.fileDefinition.fileDefinition?<FieldArray name="filters" component={addRules} state3={props.fileDefinition.fileDefinition.mapping.firstRow} utils={props.utilsList} />:null}
                <FormGroup className="form-actions">
                    <Button type="submit" size="md" color="success" disabled={pristine || submitting || invalid}>Submit</Button>
                </FormGroup>
            </div>
        </form>
    )
}
/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('ProductDefinitionForm')
);

export default reduxForm({
    form: 'ProductDefinitionForm', // a unique identifier for this form
    onSubmitSuccess: afterSubmit,
  })(AddProductDefinitonForm);