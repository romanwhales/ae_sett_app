import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {Col,Label,Row,Input,FormGroup,FormFeedback} from 'reactstrap';
const required = value => (value || typeof value === 'number' ? undefined : 'Required');
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <FormGroup row>
        <Col md="2">
            <Label htmlFor={label}>{label}</Label>
        </Col>
        <Col xs="12" md="10">
        <input {...input} type={type} placeholder={label} className="form-control"/>
        {touched && error && <FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback>}
        </Col>
    </FormGroup>
)

const renderSelectField = ({input,label,type,meta:{touched,error},children }) => (
    <FormGroup row>
        <Col md="2">
            <Label>{label}</Label>
        </Col>
        <Col xs="12" md="10">
            <Input type="select" {...input}>
                {children}
            </Input>
            {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
        </Col>
    </FormGroup>
)


let currencyOptions = ["Naira","Pounds","Dollars"];
const GenericForm = props => {
    console.log('Props Generic is ',props);
  const { handleSubmit} = props
  return (
    <form onSubmit={handleSubmit}>
        <Row>
            <Col md="2">
            <Label htmlFor="file-input">Headers Included</Label>
            </Col>
            <Col md="9">
                <FormGroup check inline>
                <Field
                    name="headers_included"
                    component="input"
                    type="radio"
                    value="yes"
                    className="form-check-input"
                    id="inline-radio1"
                    />{' '}
                    <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label> 
                </FormGroup>
                <FormGroup check inline>
                    <Field
                        name="headers_included"
                        component="input"
                        type="radio"
                        value="no"
                        className="form-check-input"
                        id="inline-radio2"
                        />{' '}
                    <Label className="form-check-label" check htmlFor="inline-radio2">No</Label> 
                </FormGroup>
            </Col>
        </Row>
      <Field
        name="accountNumber"
        type="text"
        component={renderField}
        label="Account Number"
        validate={required}
      />
      
      <Field name="currency" component={renderSelectField} label="Currency" validate={required}>
        <option value="">Select Currency</option>
        { currencyOptions.map((item,index) => <option value={item} key={index}>{item}</option>) }
      </Field>
      {/* <Field name="subgroup" component={renderSelectField} label="Select SubGroup" validate={required}>
        <option value="">Please select SubGroup</option>
            {
                props.processorList ? props.processorList.data.map((item,index)=>
                <option key={index} value={item.name}>{item.name}</option>):null
            }
      </Field> */}
      {/* <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div> */}
    </form>
  )
}

export default reduxForm({
  form: 'simple' // a unique identifier for this form
})(GenericForm)