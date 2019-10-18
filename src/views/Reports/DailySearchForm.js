import React from 'react';
import { Field, reduxForm} from 'redux-form';
import {  Col, Button,  Form, FormGroup,FormFeedback} from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import './css/Reports.css';
import './css/Daily.css';
import 'react-dates/initialize';
import Select from 'react-select';
import { DateRangePicker, SingleDatePicker,} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

// const required = value => (value || typeof value === 'string' ? undefined : 'Required')

// const renderField = ({ input, label, type, meta: { touched, error,warning } }) => (
//     <FormGroup row>
//         <Col md="10" xs="12">
//             <input type={type} id={label} placeholder={label} {...input} className="form-control journalInput"/>
//             {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
               
//         </Col>
//   </FormGroup>
// )


// const renderDateRangePicker = ({
//     input,
//     focusedInput,
//     onFocusChange,
//     startDatePlaceholderText,
//     endDatePlaceholderText
//   }) => (
//     <DateRangePicker
//       onDatesChange={(start, end) => input.onChange(start, end)}
//       onFocusChange={onFocusChange}
//       startDatePlaceholderText={startDatePlaceholderText}
//       endDatePlaceholderText={endDatePlaceholderText}
//       focusedInput={focusedInput}
//       startDate={(input.value && input.value.startDate) || null}
//       startDateId="startDateId"
//       endDateId="endDateId"
//       endDate={(input.value && input.value.endDate) || null}
//       minimumNights={0}
//       isOutsideRange={() => false}
      
//     />
//   )



const renderDatePickerL = ({
    input,
    onFocusChange,
    onDateChange,
    focused,
    date,
  }) => (

    <FormGroup row>
        <Col xs="12">
            <SingleDatePicker
                showDefaultInputIcon={true}
                date={date} 
                {...this.props}
                {...input}

                onDateChange={onDateChange}
                onFocusChange={onFocusChange}
                focused={focused}
                id="singleDatePicker" // PropTypes.string.isRequired,
                isOutsideRange={() => false}
                numberOfMonths={1}
            />
        </Col>
    </FormGroup>
)

const DailySearchForm = props => {
    const {handleSubmit,pristine,reset,submitting,focusedInput} = props;
    console.log('Props is ',props);
    // const handleChange =(event) => {
    //     debugger;
    // }
    // var date = new Date();
    var  newProcessorList =[];
    if(props.processorList){
        newProcessorList = props.processorList.map(item=>({
             label:item.name,
            value:item.id
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
    return(
        <Form inline onSubmit={handleSubmit(props.onSubmit)} style={{'justifyContent':'flex-end','marginBottom':'20px'}}>
                {/* <FormGroup className="pr-1">
                    <Field
                        name="accNoOrChannelName"
                        component={renderField}
                        type="text"
                        placeholder="Channel Name"
                        label="Enter Channel Name"
                    />
                </FormGroup> */}
                <FormGroup>
                        {/* <Label htmlFor="office">Office</Label> */}
                    
                        <Field
                            id="processor"
                            name="processorId"
                            component={MyDropdown}
                            options={newProcessorList}
                            placeholder="Select Processor"
                            clearable={false}
                        />
                     
                </FormGroup>
                  <Field
                        name="date"
                        component={renderDatePickerL}
                        label="Date"
                        onFocusChange={props.onFocusChange}
                        onDateChange={props.onDateChange}
                        focused={props.focused}
                        date={props.date}
                    />
                <FormGroup>
                    <Button size="sm" className="btn btn-block" color="primary" style={{'padding':'0.8rem 0.9rem','marginLeft':'10px','borderRadius':'0'}}> Search</Button>
                </FormGroup>
        </Form>
    )
}
const validate = (values) =>{
    console.log('Values are ',values)
}

export default reduxForm({
  form: 'dailySearchForm', // a unique identifier for this form
  validate
})(DailySearchForm);