import React from 'react';
import { Field, FieldArray, reduxForm ,reset} from 'redux-form';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert,FormFeedback} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import '../Reports/css/Reports.css'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {FormattedMessage} from 'react-intl';
import Select from 'react-select';

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

const AccountSearchForm = props => {
    const {handleSubmit,pristine,reset,submitting,focusedInput} = props;
    console.log('Props is ',props);

    var  newProcessorList =[];
    if(props.utils.userDetail){
        newProcessorList = props.utils.userDetail.data.affiliates.map(item=>({
             label:item.name,
            value:item.code
         }));
    }
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
                  <FormGroup>
                    <Field
                        id="processor"
                        name="affiliate"
                        component={MyDropdown}
                        options={newProcessorList}
                        placeholder="Select Affiliate"
                        clearable={false}
                    />
                </FormGroup>
                  <Field
                        name="daterange"
                        onFocusChange={props.onFocusChange}
                        focusedInput={focusedInput}
                        component={renderDateRangePicker}
                        
                    />
                <FormGroup>
                    <Button size="sm" className="btn btn-block" color="primary" style={{'padding':'0.8rem 0.9rem','marginLeft':'10px','borderRadius':'0'}}>  <FormattedMessage id="Search" defaultMessage="Search"/></Button>
                   
                </FormGroup>
        </Form>
    )
}
const validate = (values) =>{
    console.log('Values are ',values)
}

export default reduxForm({
  form: 'accountSearchForm', // a unique identifier for this form
  validate
})(AccountSearchForm);