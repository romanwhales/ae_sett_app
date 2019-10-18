import React from 'react';
import { Field, reduxForm ,reset} from 'redux-form';
import { Card, CardBody, CardHeader, Col, Row, Button,  FormGroup, Input, Label ,FormFeedback} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {FormattedMessage,} from 'react-intl';

const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const renderField = ({ input, label, type, meta: { touched, error,warning } }) => (
    <FormGroup row>
        <Col md="2">
            <Label htmlFor={label}><FormattedMessage id={label} defaultMessage={label}/></Label>
        </Col>
        <Col md="10" xs="12">
            <input type={type} id={label} placeholder={label} {...input} className="form-control"/>
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
            <Label>{label} </Label>
        </Col>
        <Col xs="12" md="10">
            <Input type="select" {...input}>
                {children}
            </Input>
            {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
        </Col>
    </FormGroup>
)




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
        <Col md="2">
            <Label htmlFor={label}><FormattedMessage id={label} defaultMessage={label}/></Label>
        </Col>
        <Col md="10" xs="12">
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

const ManualPostingForm = props => {
    const {handleSubmit,pristine,reset,submitting,invalid} = props;
    // console.log('Props is ',props);
    // const handleChange =(event) => {
    //     debugger;
    // }
    return(
        <form onSubmit={handleSubmit(props.onSubmit)} >
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                {/* <strong>Manual Posting</strong> */}
                                <FormattedMessage id="Add Manual Posting" defaultMessage="Add Manual Posting"/>
                            </CardHeader>
                            <CardBody>
                                    <Row>
                                        <Col xs="12">
                                            <Field name="accountId" label="Select Account" component={renderSelectField} validate={required}>
                                                <option value="">Select Account</option>
                                                { props.accountList?props.accountList.data.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="amount"
                                                type="text"
                                                component={renderField}
                                                label="Amount"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        <Col xs="12">
                                            <Field
                                                name="batchDate"
                                                component={renderDatePicker}
                                                label="Post Date"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="batchDate2"
                                                component={renderDatePickerL}
                                                label="Post Date"
                                                onFocusChange={props.onFocusChange}
                                                onDateChange={props.onDateChange}
                                                focused={props.focused}
                                                date={props.date}
                                            />
                                        </Col>
                                    </Row>
                                    <FormGroup className="form-action">
                                        <Button type="submit" size="md" color="success"  disabled={invalid ||submitting || pristine}><FormattedMessage id="app.submit" defaultMessage="Submit" /></Button>
                                        
                                    </FormGroup>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </form>
    )
}
const validate = (values) =>{
    console.log('Values are ',values)
}


const afterSubmit = (result, dispatch) =>
  dispatch(reset('manualPostingForm'));
export default reduxForm({
  form: 'manualPostingForm', // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  validate
})(ManualPostingForm);