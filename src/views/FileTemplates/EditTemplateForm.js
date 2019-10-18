import React from 'react';
import { Field,  reduxForm ,reset} from 'redux-form';
import { Col, Row, Button,FormGroup, Label ,} from 'reactstrap';
import {FormattedMessage} from 'react-intl';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <FormGroup row>
        <Col md="2">
            <Label htmlFor={label}><FormattedMessage id={label} defaultMessage={label}/></Label>
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


const EditTemplateForm = props => {
    const {handleSubmit,pristine,reset,submitting} = props;
    console.log('Props is ',props);
    return(
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12">  
                        <Row>
                            <Col xs="12">
                                <Field
                                    name="matchString"                                            
                                    type="text"
                                    component={renderField}
                                    label="Match String"
                                />
                            </Col>
                        </Row>
                        <FormGroup className="form-actions">
                            
                            <Button type="submit" size="md" color="success"  ><FormattedMessage id="app.submit" defaultMessage="Submit" /></Button>
                        </FormGroup>
                    </Col>
                </Row>
                
            </div>
        </form>
    )
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('editTemplateDetailsForm'));

export default reduxForm({
  form: 'editTemplateDetailsForm', // a unique identifier for this form
  onSubmitSuccess: afterSubmit,
  enableReinitialize: true,
})(EditTemplateForm);