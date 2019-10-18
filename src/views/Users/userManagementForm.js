import React from 'react';
import { Field, FieldArray, reduxForm ,reset} from 'redux-form';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Input, Label ,Alert,FormFeedback} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './css/Reports.css';
import './css/Daily.css';
import 'react-dates/initialize';
import Select from 'react-select';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const required = value => (value || typeof value === 'string' ? undefined : 'Required')


const UserManagementForm = props => {
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
        </Form>
    )
}
const validate = (values) =>{
    console.log('Values are ',values)
}

export default reduxForm({
  form: 'userManagementForm', // a unique identifier for this form
  validate
})(UserManagementForm);