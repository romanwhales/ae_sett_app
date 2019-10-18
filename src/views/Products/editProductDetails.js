import React from 'react';
import { Field,reduxForm ,reset} from 'redux-form';
import { Card, CardBody, CardHeader, Col,  Row, Button,FormGroup, Input, Label ,FormFeedback} from 'reactstrap';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <FormGroup row>
        <Col md="2">
            <Label htmlFor={label}>{label}</Label>
        </Col>
        <Col md="10" xs="12">
            <input type={type} id={label} placeholder={label} required {...input} className="form-control"/>
        </Col>
  </FormGroup>
    // <div>
    //     <div>
    //     <input {...input} type={type} placeholder={label} className="form-control"/>
    //     {touched && error && <span>{error}</span>}
    //     </div>
    // </div>
)

const required = value => value ? undefined : 'Required'

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

const EditProductDetailsForm = props => {
    const {handleSubmit,pristine,reset,submitting,invalid} = props;
    console.log('Props is ',props);
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
                                <strong>Edit Product</strong>
                            </CardHeader>
                            <CardBody>
                                
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="name"                                           
                                                 type="text"
                                                component={renderField}
                                                label="Name"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field
                                                name="accountNo"                                          
                                                type="text"
                                                component={renderField}
                                                label="Account Number"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name="currency" label="Currency" component={renderSelectField} >
                                                <option value="">Select Currency</option>
                                                { props.currencyOptions?props.currencyOptions.map((item,index) => <option value={item} key={index}>{item}</option>):'' }
                                            </Field>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name="processor" label="Processor" component={renderSelectField} onChange={event => {props.getSubGroup(event.target.value)} } validate={required}>
                                                <option value="">Select Processor</option>
                                                { props.processorData?props.processorData.data.map((item,index) => <option value={item.name} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <Field name="subgroup" label="SubGroup" component={renderSelectField} validate={required}>
                                                <option value="" disabled={!props.subgroups.length}>Select SubGroup</option>
                                                { props.subgroups?props.subgroups.map((item,index) => <option value={item.id} key={index}>{item.name}</option>):'' }
                                            </Field>
                                        </Col>
                                    </Row>
                                    <FormGroup className="form-actions">
                                        <Button type="submit" size="md" color="success" disabled={pristine || submitting || invalid} >Submit</Button>
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
  dispatch(reset('editProductDetailsForm'));

export default reduxForm({
  form: 'editProductDetailsForm', // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  enableReinitialize: true,
})(EditProductDetailsForm);