import React from 'react';
import { Field, reduxForm ,} from 'redux-form';
import {  Col, Button, Form, FormGroup, Input, Label ,FormFeedback} from 'reactstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
// import './css/Reports.css'
import 'react-dates/initialize';
import { DateRangePicker,} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {FormattedMessage} from 'react-intl';



const required = value => (value || typeof value === 'string' ? undefined : 'Required')

const renderField = ({ input, label, type, meta: { touched, error,warning } }) => (
    <FormGroup row>
        <Col md="10" xs="12">
            <input type={type} id={label} placeholder={label} {...input} className="form-control journalInput"/>
            {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
               
        </Col>
  </FormGroup>
    // <div>
    //     <div>
    //     <input {...input} type={type} placeholder={label} className="form-control"/>
    //     {touched && error && <span>{error}</span>}
    //     </div>
    // </div>
)

const renderSelectField = ({input,label,meta:{touched,error},children }) => (
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

const renderDateRangePicker = ({
    input,
    focusedInput,
    onFocusChange,
    startDatePlaceholderText,
    endDatePlaceholderText
  }) => (
    <DateRangePicker
      onDatesChange={(start, end) => input.onChange(start, end)}
      onFocusChange={onFocusChange}
      startDatePlaceholderText={startDatePlaceholderText}
      endDatePlaceholderText={endDatePlaceholderText}
      focusedInput={focusedInput}
      startDate={(input.value && input.value.startDate) || null}
      startDateId="startDateId"
      endDateId="endDateId"
      endDate={(input.value && input.value.endDate) || null}
      minimumNights={0}
      isOutsideRange={() => false}
      
    />
  )

const renderDatePicker = ({input, label,placeholder, defaultValue, meta: {touched, error} }) => (
    <FormGroup row>
        <Col md="10" xs="12">
            <DatePicker {...input}  dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value).format(): null} className="form-control" style={{'width':'100%'}} placeholderText="Select Date"/>
        </Col>
    </FormGroup>
);

const MyDropdown = ({ input, ...props }) => {
    const handleBlur = () => input.onBlur
    return (
      <div>
          
           <Select
             instanceId={input.name}
             {...input}
             {...props}
             onBlur={handleBlur}
           />
      </div>
    )
}

const validationOptions = [
    { value: 'ALL', label: 'All' },
    { value: 'VALIDATED', label: 'Valiated' },
    { value: 'UNVALIDATED', label: 'Unvalidated' }
];

const postingOptions = [
    { value: 'ALL', label: 'All' },
    { value: 'POSTED', label: 'Posted' },
    { value: 'NOT_POSTED', label: 'Not Posted' }
]



const T112SearchForm = props => {
    const {handleSubmit,focusedInput,invalid} = props;
    console.log('Props is ',props);
    // const handleChange =(event) => {
    //     debugger;
    // }
    return(
        <Form inline onSubmit={handleSubmit(props.onSubmit)} style={{'justifyContent':'flex-end','marginBottom':'20px'}}>
                  {/* <FormGroup className="pr-1">
                    <Field
                        name="accNameOrNo"
                        component={renderField}
                        type="text"
                        placeholder="Account Name or Number"
                        label="Account Name or Number"
                    />
                  </FormGroup> */}
                  {/* <FormGroup>
                    
                    <Field
                        name="posted"
                        id="posted"
                        component="input"
                        type="checkbox"
                    />
                    <label htmlFor="posted">Posted</label>
                  </FormGroup> */}
                  <FormGroup>
                        {/* <Label htmlFor="office">Office</Label> */}
                    
                        <Field
                            id="processor"
                            name="validation"
                            component={MyDropdown}
                            options={validationOptions}
                            placeholder="Select Validation Status"
                            clearable={false}
                            validate={required}
                        />
                     
                    </FormGroup>
                    <FormGroup>
                        {/* <Label htmlFor="office">Office</Label> */}
                    
                        <Field
                            id="processor"
                            name="posting"
                            component={MyDropdown}
                            options={postingOptions}
                            placeholder="Select Posting Status"
                            clearable={false}
                            validate={required}
                        />
                     
                    </FormGroup>
                   
                  <Field
                        name="daterange"
                        onFocusChange={props.onFocusChange}
                        focusedInput={focusedInput}
                        component={renderDateRangePicker}
                        validate={required}
                        
                    />
                <FormGroup>
                    <Button size="sm" className="btn btn-block" color="primary" style={{'padding':'0.8rem 0.9rem','marginLeft':'10px','borderRadius':'0'}} disabled={invalid} >  <FormattedMessage id="Search" defaultMessage="Search"/></Button>
                   
                </FormGroup>
        </Form>
    )
}
const validate = (values) =>{
    console.log('Values are ',values)
}

export default reduxForm({
  form: 'issuerSearchForm', // a unique identifier for this form
  validate
})(T112SearchForm);