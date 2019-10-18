import React from 'react';
import { Field, FieldArray, reduxForm ,reset} from 'redux-form';
import {  Col, Button, Form, FormGroup, Input, Label ,FormFeedback} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {FormattedMessage} from 'react-intl';

import 'react-dates/initialize';
import { SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const renderField = ({ input, label, type, meta: { touched, error,warning } }) => (
    <FormGroup row>
        <Col md="2">
            <Label htmlFor={label}>{label}</Label>
        </Col>
        <Col md="10" xs="12">
            <input type={type} id={label} placeholder={label} required {...input} className="form-control"/>
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
        <Col xs="12">
            <Input type="select" {...input} style={{'height':'50px'}}>
                {children}
            </Input>
        </Col>
    </FormGroup>
)

// const renderDatePicker = ({input, label,placeholder, defaultValue, meta: {touched, error} }) => (
//     <FormGroup row>
//         <Col md="2">
//             <Label htmlFor={label}>{label}</Label>
//         </Col>
//         <Col md="10" xs="12">
//             <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value): null} className="form-control" style={{'width':'100%'}} placeholderText="Post Date"/>
//           {touched && error && <span>{error}</span>}
//         </Col>
//     </FormGroup>
//   );


  const renderDatePickerL = ({
    input,
    focusedInput,
    onFocusChange,
    onDateChange,
    focused,
    date,
    label,
    startDatePlaceholderText,
    endDatePlaceholderText,
  }) => (

    <FormGroup row>
        {/* <Col md="2">
            <Label htmlFor={label}>{label}</Label>
        </Col> */}
        <Col md="12" xs="12">
            <SingleDatePicker
                showDefaultInputIcon={true}
                date={date} 
                {...this.props}
                {...input}
                
                onDateChange={onDateChange}
                onFocusChange={onFocusChange}
                focused={focused}
                id="your_unique_id" // PropTypes.string.isRequired,
                isOutsideRange={() => false}
                numberOfMonths={1}
            />
        </Col>
    </FormGroup>

    
    // <DateRangePicker
    //   onDatesChange={(start, end) => input.onChange(start, end)}
    //   onFocusChange={onFocusChange}
    //   startDatePlaceholderText={startDatePlaceholderText}
    //   endDatePlaceholderText={endDatePlaceholderText}
    //   focusedInput={focusedInput}
    //   startDate={(input.value && input.value.startDate) || null}
    //   startDateId="startDateId"
    //   endDateId="endDateId"
    //   endDate={(input.value && input.value.endDate) || null}
    //   minimumNights={0}
    //   isOutsideRange={() => false}
    // />
  )

const ExceptionSearchForm = props => {
    const {handleSubmit,pristine,reset,submitting} = props;
    console.log('Props is ',props);
    // const handleChange =(event) => {
    //     debugger;
    // }
    return(
        <Form inline onSubmit={handleSubmit(props.onSubmit)} style={{'justifyContent':'flex-end','marginBottom':'20px'}}>
                <FormGroup className="pr-1">
                    <Field
                        name="startDate"
                        component={renderDatePickerL}
                        label="Post Date"
                        onFocusChange={props.onFocusChange}
                        onDateChange={props.onDateChange}
                        focused={props.focused}
                        date={props.date}
                    />
                </FormGroup>
                <FormGroup>
                    <Field name="processorId" label="Select Processor" component={renderSelectField}>
                        <option value="">Select Processor</option>
                        { props.processorData.processors?props.processorData.processors.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                    </Field>
                </FormGroup>
                <FormGroup>
                    
                    <Button size="sm" className="btn btn-block" color="primary" style={{'padding':'0.8rem 0.9rem','marginLeft':'10px','borderRadius':'0'}}><FormattedMessage id="app.submit" defaultMessage="Submit" /></Button>
                </FormGroup>
        </Form>
    )
}
const validate = (values) =>{
    console.log('Values are ',values)
}


// const afterSubmit = (result, dispatch) =>
//   dispatch(reset('exceptionSearchForm'));
export default reduxForm({
  form: 'exceptionSearchForm', // a unique identifier for this form
  validate
})(ExceptionSearchForm);