import React, { Component } from 'react';
import {Field,reduxForm,formValueSelector,FieldArray} from 'redux-form';
import {Col,Label,Row,Input,FormGroup,Button,FormFeedback} from 'reactstrap';
import { connect } from 'react-redux';


const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <FormGroup>
        <Label htmlFor={label}>{label}</Label>
        <input {...input} type={type} placeholder={label} className="form-control"/>
        {touched && error && <FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback>}
    </FormGroup>
)

const renderSelectField = ({input,label,type,meta:{touched,error},children }) => (
    <FormGroup>
        <Label>Mapped Field</Label>
        <Input type="select" {...input}>
            {children}
        </Input>
        {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please Mapped Field is required</FormFeedback></span>}
    </FormGroup>
)
const moneyOptions =['naira','kobo'];
const signOptions = ['+','-'];

const renderSignField = ({input,meta:{touched,error},children}) =>(
    <FormGroup>
        <Label>Sign</Label>
        <Input type="select" {...input}>
            {children}
        </Input>
        {touched && error && <span>{error}</span>}
    </FormGroup>
)

const renderMoneyTypeField = ({input,label,type,meta:{touched,error},children}) => (
    <FormGroup>
        <Label>Format</Label>
        <Input type="select" {...input}>
            {children}
        </Input>
        {touched && error && <span>{error}</span>}
    </FormGroup>
)

  const renderFilters = ({ fields , meta: { error, submitFailed } ,mappedFields}) => (
    //   console.log('mapped Fields are ',mappedFields)
    <div>
        <Button type="button" size="sm" color="primary" onClick={() => fields.push({})} style={{marginBottom:'20px',marginTop:'20px'}}><i className="fa fa-plus"></i> Add Filter</Button>
         
        {submitFailed && error && <span>{error}</span>}
      
      {fields.map((member, index) => (
        <Row key={index}>
            { index == 0?
                <Col xs="2" inline>
                <FormGroup>
                    <Label htmlFor="postal-code" style={{display:'block'}}>And/or</Label>
                    <Field name={`${member}.operator`} component="select" className="form-control">
                        <option value="">Select Type</option>
                        <option value="and">AND</option>
                        <option value="or">OR</option>
                    </Field> 
                </FormGroup>
            </Col>:''}
            <Col xs="4">
                <FormGroup>
                        <Label htmlFor="Brand">Mapped Field</Label>
                        <Field name={`${member}.column`} component="select" className="form-control" required>
                            <option value="">Select Field</option>
                            {
                                mappedFields ? mappedFields.map((item,index)=>
                                <option key={index} value={index}>{item}</option>):null
                            }
                        </Field>
                </FormGroup>
            </Col>
          <Col xs="4">
          <Field
            name={`${member}.value`}
            type="text"
            component={renderField}
            label="Value"
          />
             
          </Col>
          <Col xs="2" inline>
              <FormGroup>
                  <Label htmlFor="postal-code" style={{display:'block'}}>Add Rule</Label>
                  
                  <Button type="button" size="sm" color="danger" onClick={() => fields.remove(index)}><i className="fa fa-trash"></i> Delete Rule</Button>
              </FormGroup>
          </Col>
          
        </Row>
      ))}
    </div>
  )

let ProductForm =(props) =>{
    const { extra1typeValue,extra2typeValue,extra3typeValue,extra4typeValue,extra5typeValue,handleSubmit, pristine, reset, submitting  } = props
    const selector = formValueSelector('productForm');
    // console.log('State in productForm',props);
    /**
     * Validations
     */
    
    let mappedFields;
    if(props.mappedFields){
        mappedFields = props.mappedFields;
    }
    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>  
            {props.receivable == 'true'?<Row>
                <Col xs="12">
                    <h3 className="text-center">Receivable</h3>
                    <Field name="receivable_column" component={renderSelectField} label="Mapped Field">
                    <option value="">Select Field</option>
                    { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                    </Field>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="Brand">Type</Label>
                        <p className="form-control-static">Money</p>
                    </FormGroup>
                </Col>
                <Col xs="12">
                    <Field name="receivable_format" component={renderMoneyTypeField} label="Select Format">
                        <option value="">Select Field</option>
                        { moneyOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                    </Field>   
                </Col>
                <Col xs="12">
                    <Field name="receivable_sign" component={renderSignField} label="Select Sign">
                        <option value="">Select Sign</option>
                        { signOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                    </Field>    
                </Col>
                <Col xs="12">
                    <FieldArray name="receivable" component={renderFilters} props={{mappedFields}}/>
                </Col>
            </Row>:''}
            {props.payable == 'true'?<Row>
                <Col xs="12">
                    <h3 className="text-center">Payable</h3>
                    <Field name="payable_column" component={renderSelectField} label="Mapped Field">
                    <option value="">Select Field</option>
                    { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                    </Field>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="Brand">Type</Label>
                        <p className="form-control-static">Money</p>
                    </FormGroup>
                </Col>
                <Col xs="12">
                    <Field name="payable_format" component={renderMoneyTypeField} label="Select Format">
                        <option value="">Select Field</option>
                        { moneyOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                    </Field>   
                </Col>
                <Col xs="12">
                    <Field name="payable_sign" component={renderSignField} label="Select Sign">
                        <option value="">Select Sign</option>
                        { signOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                    </Field>    
                </Col>
                <Col xs="12">
                    <FieldArray name="payable" component={renderFilters} props={{mappedFields}}/>
                </Col>
            </Row>:''}
            {props.commission == 'true'?<Row>
                <Col xs="12">
                    <h3 className="text-center">Commission</h3>
                    <Field name="commission_column" component={renderSelectField} label="Mapped Field">
                    <option value="">Select Field</option>
                    { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                    </Field>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="Brand">Type</Label>
                        <p className="form-control-static">Money</p>
                    </FormGroup>
                </Col>
                <Col xs="12">
                    <Field name="commission_format" component={renderMoneyTypeField} label="Select Format">
                        <option value="">Select Field</option>
                        { moneyOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                    </Field>   
                </Col>
                <Col xs="12">
                    <Field name="commission_sign" component={renderSignField} label="Select Sign">
                        <option value="">Select Sign</option>
                        { signOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                    </Field>    
                </Col>
                <Col xs="12">
                    <FieldArray name="commission" component={renderFilters} props={{mappedFields}}/>
                </Col>
            </Row>:''}
            {props.narration == 'true'?<Row>
                
                <Col xs="12">
                    <h3 className="text-center">Narration</h3>
                    <Field name="narration_column" component={renderSelectField} label="Mapped Field">
                    <option value="">Select Field</option>
                    { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                    </Field>
                </Col>
                <Col xs="12">
                    <FieldArray name="narration" component={renderFilters} props={{mappedFields}}/>
                </Col>
                
            </Row>:''}
            {props.transaction == 'true'?<Row>
                <Col xs="12">
                    <h3 className="text-center">Transaction</h3>
                    <Field name="transaction_column" component={renderSelectField} label="Mapped Field">
                    <option value="">Select Field</option>
                    { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                    </Field>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="Brand">Type</Label>
                        <p className="form-control-static">Date</p>
                    </FormGroup>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="ccmonth">Format</Label>
                        <Field name="transaction_format" component="select" className="form-control">
                            <option value="">Select Type</option>
                            <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                            <option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
                            <option value="d/MM/yyyy hh:mm:ss a">dd/MM/yyyy HH:mm</option>
                            
                        </Field>  
                    </FormGroup>    
                </Col>
                <Col xs="12">
                    <FieldArray name="transaction" component={renderFilters} props={{mappedFields}}/>
                </Col>
                
            </Row>:''}
            {props.value == 'true'?<Row>
                <Col xs="12">
                   <h3 className="text-center">Value</h3>
                    <Field name="value_column" component={renderSelectField} label="Mapped Field">
                    <option value="">Select Field</option>
                    { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                    </Field>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="Brand">Type</Label>
                        <p className="form-control-static">Date</p>
                    </FormGroup>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="ccmonth">Format</Label>
                        <Field name="value_format" component="select" className="form-control">
                            <option value="">Select Type</option>
                            <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                            <option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
                            <option value="d/MM/yyyy hh:mm:ss a">dd/MM/yyyy HH:mm</option>
                        </Field>  
                    </FormGroup>    
                </Col>
                <Col xs="12">
                    <FieldArray name="value" component={renderFilters} props={{mappedFields}}/>
                </Col>
            </Row>:''}
            {
                props.filter == 'true'?
                    <Row>
                        
                        <Col xs="12">
                            <h3 className="text-center">Filter</h3>
                            <FieldArray name="filters" component={renderFilters} props={{mappedFields}}/>
                        </Col>
                    </Row>:''
            }
            {props.extra1 == 'true'?<Row>
                <Col xs="12">
                    <h3 className="text-center">Extras</h3>
                    <FormGroup>
                        <Field name="extra1_display" type="text" component={renderField} label="Display Name" validate={required}/> 
                        {/* <Label htmlFor="terminal_name">Display</Label>
                        <Field name="extra1_display" component="input" type="text" className="form-control" placeholder="Enter Display Name" validate={required}/> */}
                    </FormGroup>
                   
                    <FormGroup>
                    <Field name="extra1_column" component={renderSelectField} label="Mapped Field">
                        <option value="">Select Field</option>
                        { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                    </Field>
                    </FormGroup>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="ccmonth">Select Type</Label>
                        <Field name="extra1_type" component="select" className="form-control">
                            <option value="">Select Format</option>
                            <option value="money">Money</option>
                            <option value="date">Date</option>
                            <option value="text">Text</option>
                        </Field>
                    </FormGroup>
                    {extra1typeValue == 'money' && 
                        <Row>
                        
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="ccmonth">Format</Label>
                                <Field name="extra1_format" component="select" className="form-control">
                                    <option value="">Select Type</option>
                                    <option value="kobo">Naira</option>
                                    <option value="naira">Kobo</option>
                                </Field>  
                            </FormGroup>    
                        </Col>
                        <Col xs="12">
                            <Field name="extra1_sign" component={renderSignField} label="Select Sign">
                                <option value="">Select Sign</option>
                                { signOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                            </Field>    
                        </Col>
                        </Row>
                    } 
                    {
                        extra1typeValue == 'date' &&
                        <Row>
                             <Col xs="12">
                                
                                <FormGroup>
                                    <Label htmlFor="ccmonth">Format</Label>
                                    <Field name="extra1_format" component="select" className="form-control">
                                        <option value="">Select Type</option>
                                        <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                                        <option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
                                        <option value="d/MM/yyyy hh:mm:ss a">dd/MM/yyyy H:mm</option>
                                    </Field>  
                                </FormGroup>    
                            </Col>
                            
                        </Row>
                    } 
                </Col>
                <Col xs="12">
                    <FieldArray name="extra1filter" component={renderFilters} props={{mappedFields}}/>
                </Col>
                
            </Row>:''}
            {props.extra2 == 'true'?<Row>
            <Col xs="12">
                <h3 className="text-center">Extras</h3>
                    <FormGroup>
                        <Label htmlFor="terminal_name">Display</Label>
                        <Field name="extra2_display" component="input" type="text" className="form-control" placeholder="Enter Display Name" required/>
                    </FormGroup>
                    <FormGroup>
                        <Field name="extra2_column" component={renderSelectField} label="Mapped Field">
                            <option value="">Select Field</option>
                            { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                        </Field>
                    </FormGroup>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="ccmonth">Select Type</Label>
                        <Field name="extra2_type" component="select" className="form-control">
                            <option value="">Select Format</option>
                            <option value="money">Money</option>
                            <option value="date">Date</option>
                            <option value="text">Text</option>
                        </Field>
                    </FormGroup>
                    {extra2typeValue == 'money' && 
                        <Row>
                        
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="ccmonth">Format</Label>
                                <Field name="extra2_format" component="select" className="form-control">
                                    <option value="">Select Type</option>
                                    <option value="kobo">Naira</option>
                                    <option value="naira">Kobo</option>
                                </Field>  
                            </FormGroup>    
                        </Col>
                        <Col xs="12">
                            <Field name="extra2_sign" component={renderSignField} label="Select Sign">
                                <option value="">Select Sign</option>
                                { signOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                            </Field>    
                        </Col>
                        </Row>
                    } 
                    {
                        extra2typeValue == 'date' &&
                        <Row>
                             <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="ccmonth">Format</Label>
                                    <Field name="extra2_format" component="select" className="form-control">
                                        <option value="">Select Type</option>
                                        <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                                        <option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
                                        <option value="d/MM/yyyy hh:mm:ss a">dd/MM/yyyy H:mm</option>
                                    </Field>  
                                </FormGroup>    
                            </Col>
                            
                        </Row>
                    } 
                </Col>
                <Col xs="12">
                    <FieldArray name="extra2filter" component={renderFilters} props={{mappedFields}}/>
                </Col>
            </Row>:''}
            {props.extra3 == 'true'?<Row>

                <Col xs="12">
                    <h3 className="text-center">Extras</h3>
                    <FormGroup>
                        <Label htmlFor="terminal_name">Display</Label>
                        <Field name="extra3_display" component="input" type="text" className="form-control" placeholder="Enter Display Name" required/>
                    </FormGroup>
                    <FormGroup>
                        <Field name="extra3_column" component={renderSelectField} label="Mapped Field">
                            <option value="">Select Field</option>
                            { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                        </Field>
                    </FormGroup>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="ccmonth">Select Type</Label>
                        <Field name="extra3_type" component="select" className="form-control">
                            <option value="">Select Format</option>
                            <option value="money">Money</option>
                            <option value="date">Date</option>
                            <option value="text">Text</option>
                        
                        </Field>
                    </FormGroup>
                    {extra3typeValue == 'money' && 
                        <Row>
                        
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="ccmonth">Format</Label>
                                <Field name="extra3_format" component="select" className="form-control">
                                    <option value="">Select Type</option>
                                    <option value="kobo">Naira</option>
                                    <option value="naira">Kobo</option>
                                </Field>  
                            </FormGroup>    
                        </Col>
                        <Col xs="12">
                            <Field name="extra3_sign" component={renderSignField} label="Select Sign">
                                <option value="">Select Sign</option>
                                { signOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                            </Field>    
                        </Col>
                        
                        </Row>
                    } 
                    {
                        extra3typeValue == 'date' &&
                        <Row>
                             <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="ccmonth">Format</Label>
                                    <Field name="extra3_format" component="select" className="form-control">
                                        <option value="">Select Type</option>
                                        <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                                        <option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
                                        <option value="d/MM/yyyy hh:mm:ss a">dd/MM/yyyy H:mm</option>
                                    </Field>  
                                </FormGroup>    
                            </Col>
                        </Row>
                    } 
                </Col>
                <Col xs="12">
                    <FieldArray name="extra3filter" component={renderFilters} props={{mappedFields}}/>
                </Col>
            </Row>:''}
            {props.extra4 == 'true'?<Row>
                
                <Col xs="12">
                    <h3 className="text-center">Extras</h3>
                        <FormGroup>
                            <Label htmlFor="terminal_name">Display</Label>
                            <Field name="extra4_display" component="input" type="text" className="form-control" placeholder="Enter Display Name" required/>
                        </FormGroup>
                        <FormGroup>
                            <Field name="extra4_column" component={renderSelectField} label="Mapped Field">
                                <option value="">Select Field</option>
                                { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                            </Field>
                        </FormGroup>
                    </Col>
                    <Col xs="12">
                        <FormGroup>
                            <Label htmlFor="ccmonth">Select Type</Label>
                            <Field name="extra4_type" component="select" className="form-control">
                                <option value="">Select Format</option>
                                <option value="money">Money</option>
                                <option value="date">Date</option>
                                <option value="text">Text</option>
                            </Field>
                        </FormGroup>
                        {extra4typeValue == 'money' && 
                            <Row>
                            <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="ccmonth">Format</Label>
                                    <Field name="extra4_format" component="select" className="form-control">
                                        <option value="">Select Type</option>
                                        <option value="kobo">Naira</option>
                                        <option value="naira">Kobo</option>
                                    </Field>  
                                </FormGroup>    
                            </Col>
                            <Col xs="12">
                            <Field name="extra4_sign" component={renderSignField} label="Select Sign">
                                <option value="">Select Sign</option>
                                { signOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                            </Field>    
                        </Col>
                            </Row>
                        } 
                        {
                            extra4typeValue == 'date' &&
                            <Row>
                                <Col xs="12">
                                    <FormGroup>
                                        <Label htmlFor="ccmonth">Format</Label>
                                        <Field name="extra3_format" component="select" className="form-control">
                                            <option value="">Select Type</option>
                                            <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                                            <option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
                                            <option value="d/MM/yyyy hh:mm:ss a">dd/MM/yyyy H:mm</option>
                                        </Field>  
                                    </FormGroup>    
                                </Col>
                            </Row>
                        } 
                    </Col>
                    <Col xs="12">
                        <FieldArray name="extra4filter" component={renderFilters} props={{mappedFields}}/>
                    </Col>
                    
                </Row>:''}
            {props.extra5 == 'true'?<Row>
            <Col xs="12">
                    <h3 className="text-center">Extras</h3>
                    <FormGroup>
                        <Label htmlFor="terminal_name">Display</Label>
                        <Field name="extra5_display" component="input" type="text" className="form-control" placeholder="Enter Display Name" required/>
                    </FormGroup>
                    <FormGroup>
                        <Field name="extra5_column" component={renderSelectField} label="Mapped Field">
                            <option value="">Select Field</option>
                            { props.mappedFields.map((option,index) => <option value={index} key={index}>{option}</option>) }
                        </Field>
                    </FormGroup>
                </Col>
                <Col xs="12">
                    <FormGroup>
                        <Label htmlFor="ccmonth">Select Type</Label>
                        <Field name="extra5_type" component="select" className="form-control">
                            <option value="">Select Format</option>
                            <option value="money">Money</option>
                            <option value="date">Date</option>
                            <option value="text">Text</option>
                        </Field>
                    </FormGroup>
                    {extra5typeValue == 'money' && 
                        <Row>
                        <Col xs="12">
                            <Field name="extra5_sign" component={renderSignField} label="Select Sign">
                                <option value="">Select Sign</option>
                                { signOptions.map((option,index) => <option value={option} key={index}>{option}</option>) }
                            </Field>    
                        </Col>
                        <Col xs="12">
                            <FormGroup>
                                <Label htmlFor="ccmonth">Sign</Label>
                                <Field name="extra5_sign" component="select" className="form-control">
                                    <option value="">Select Sign</option>
                                    <option value="+">+</option>
                                    <option value="-">-</option>
                                </Field>  
                            </FormGroup>    
                        </Col>
                        </Row>
                    } 
                    {
                        extra5typeValue == 'date' &&
                        <Row>
                             <Col xs="12">
                                <FormGroup>
                                    <Label htmlFor="ccmonth">Format</Label>
                                    <Field name="extra5_format" component="select" className="form-control">
                                        <option value="">Select Type</option>
                                        <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                                        <option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>
                                        <option value="d/MM/yyyy hh:mm:ss a">dd/MM/yyyy H:mm</option>
                                    </Field>  
                                </FormGroup>    
                            </Col>
                        </Row>
                    } 
                </Col>
                <Col xs="12">
                    <FieldArray name="extra5filter" component={renderFilters} props={{mappedFields}}/>
                </Col>
            </Row>:''}
            <Button type="submit" color="success" disabled={pristine || submitting}>Submit </Button>
        </form>
    )
}

const validate = (values) =>{
    const errors = {};
    if(!values.receivable_sign){
        errors.receivable_sign = 'Required'
    }
    console.log('Values are ',values)
}
ProductForm =  reduxForm({
    form:'productForm',
    validate
})(ProductForm);

const selector = formValueSelector('productForm') // <-- same as form name
ProductForm = connect(
  state => {
    // can select values individually
    
    const favoriteColorValue = selector(state, 'favoriteColor')
    const extra1typeValue = selector(state, 'extra1_type')
    const extra2typeValue = selector(state,'extra2_type')
    const extra3typeValue = selector(state,'extra3_type')
    const extra4typeValue = selector(state,'extra4_type')
    const extra5typeValue = selector(state,'extra5_type')
    const hasFilterReceivableValue = selector(state,'hasFilterReceivable')
    // console.log('Constant value is ',favoriteColorValue);
    // or together as a group
    // const { firstName, lastName } = selector(state, 'firstName', 'lastName')
    // const {extra1typeValue,favoriteColorValue,extra2typeValue } = selector(state,'extra1type','favoriteColor','extra2type');
    return {
        favoriteColorValue,
        extra1typeValue,
        extra2typeValue,
        extra3typeValue,
        extra4typeValue,
        extra5typeValue,
        hasFilterReceivableValue 
    }
  }
)(ProductForm)

export default ProductForm;