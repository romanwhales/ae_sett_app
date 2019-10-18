import React from 'react';
import { Field,reduxForm ,reset} from 'redux-form';
import { Card, CardBody, CardHeader, Col, Row, Button, FormGroup, Input, Label ,FormFeedback} from 'reactstrap';
import {
    FormattedMessage
  } from 'react-intl';

  
const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const renderField = ({ input, label, type, meta: { touched, error,warning } }) => (
    <FormGroup row>
        <Col md="2">
            <Label htmlFor={label}><FormattedMessage id={label}/></Label>
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

const AddProductDetailsForm = props => {
    const {handleSubmit,pristine,reset,submitting} = props;
    // console.log('Props is ',props);
    // const handleChange =(event) => {
    //     debugger;
    // }
    return(
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong><FormattedMessage id="Add Product" defaultMessage="Add Product"/></strong>
                            </CardHeader>
                            <CardBody>
                                
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="name"
                                                type="text"
                                                component={renderField}
                                                label="Name"
                                                validate={required}
                                            />
                                        </Col>
                                    </Row>
                                    {!props.match.params.id?<Row>
                                        <Col xs="12">
                                            <Field name="processor" label="Processor" component={renderSelectField} onChange={event => {props.getSubGroup(event.target.value)} } validate={required}>
                                                <option value="">Select Processor</option>
                                                { props.processorData?props.processorData.data.map((item,index) => <option value={item.name} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>:null}
                                    {!props.match.params.id?<Row>
                                        <Col xs="12">
                                            <Field name="subgroup" label="SubGroup" component={renderSelectField} validate={required}>
                                                <option value="" disabled={!props.subgroups.length}>Select SubGroup</option>
                                                { props.subgroups?props.subgroups.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>:null}
                                    
                                    <FormGroup className="form-actions">
                                        <Button type="submit" size="md" color="success" disabled={pristine || submitting}><FormattedMessage id="app.submit" defaultMessage="Submit"/></Button>
                                    </FormGroup>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </form>
    )
}


const afterSubmit = (result, dispatch) =>
  dispatch(reset('addProductDetailsForm'));


export default reduxForm({
  form: 'addProductDetailsForm', // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
})(AddProductDetailsForm);