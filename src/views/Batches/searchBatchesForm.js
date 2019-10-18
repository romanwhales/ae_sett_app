import React, { Component } from 'react';
import { Button, Col, FormGroup,Row} from 'reactstrap';
import Select from 'react-select';
import {Field,reduxForm} from 'redux-form';
import {FormattedMessage} from 'react-intl';
// import 'flatpickr/dist/themes/material_green.min.css'
 

const SearchBatchesFormComponent = (props) => {
    // console.log('props user update modal is  ',props);
    // console.log('Props for Submit in edit is ',props.onSubmitUpdate);
    
    // console.log('Seen',props.roleData);
    var date = new Date();
    var newOfficeList =[];
    
    // console.log(props.atms.atmList[0]);
    if(props.productsData){
        newOfficeList = props.productsData.data.map(item=>({
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
    const { handleSubmit } = props
    return (
            <form onSubmit={handleSubmit(props.onSubmit)}>
            <Row>
                 
                    <Col md={{ size: 3, offset: 8}} xs={{ size: 10}}>
                        
                            <FormGroup>
                            {/* <Label htmlFor="office">Office</Label> */}
                            <Field
                                id="product"
                                name="product"
                                component={MyDropdown}
                                options={newOfficeList}
                                placeholder="Select Product"
                                clearable={false}
                            />
                            </FormGroup>
                           
                    </Col>
                    {/* <Flatpickr data-enable-time value={props.date} onChange={props.change}/> */}
                    <Col xs={{ size: 1}} style={{'paddingLeft':'0px'}}>
                    <Button className="btn-block" type="submit" size="sm" color="primary" style={{'padding':'0.55rem 0.5rem'}}><FormattedMessage id="app.submit" defaultMessage="Submit" /></Button>
                    </Col>
               
            </Row>
            </form>
           
       
    );
}

const validate = (values) =>{
    console.log('Values are ',values);
}
export default reduxForm({
    validate,
    form:'editUserForm',
    
    
})(SearchBatchesFormComponent)