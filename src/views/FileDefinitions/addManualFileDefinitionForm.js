import React from 'react';
import { Field, FieldArray, reduxForm,reset} from 'redux-form';
import {FormattedMessage} from 'react-intl';
import { Col,  Row, Button, FormGroup,  Label ,FormFeedback} from 'reactstrap';
const required = value => (value || typeof value === 'number' ? undefined : true)

const requiredString = value => (value || typeof value === 'String' ? undefined : 'Required String')

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <div>
        <input {...input} type={type} placeholder={label} className="form-control"/>
        {touched && error && <span>{error}</span>}
        </div>
        {touched && error && <span><FormFeedback className="help-block" style={{'display':'block'}}>Please {label} is required</FormFeedback></span>}
    </div>
)


const addRules = ({ fields,data,state3, utils,meta: { error } }) => (
    
    <Row>
        {/* {state} */}
       
        <Col style={{ 'textAlign': 'right' }} xs="12">
            <Button style={{ 'marginTop': '20px','marginBottom': '20px' }} color="success" onClick={() => fields.push({})}><i className="fa fa-plus"></i>&nbsp;Add Column</Button>
        </Col>
       
        {fields.map((item,index) => (
            <Col xs="12" key={index}>  
                <FormGroup row>
                    <Col md="3">
                        <Label htmlFor="file-input">Column {index+1}</Label>
                        
                    </Col>
                    <Col xs="12" md="8">
                        <Field
                            name={`${item}.value`}
                            type="text"
                            component={renderField}
                            label="Value"
                            validate={required}
                        />
                    </Col>
                    <Col md="1">
                        <FormGroup className="form-actions">
                            <Button type="submit" size="md" color="danger" onClick={() => fields.remove(index)}><i class="fa fa-trash-o" aria-hidden="true"></i></Button>
                        </FormGroup>
                    </Col>
                </FormGroup>
                    
            </Col>
        ))}
    </Row>
)



const AddManualFileDefinitionForm = (props) => {
    const {handleSubmit,pristine,submitting,invalid} = props;
    console.log('Props is ',props);
    return(
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="animated fadeIn">
                <Row>
                    
                        <Col md="3">
                            <Label htmlFor="channel_name"><FormattedMessage id="Channel Name" defaultMessage="Channel Name"/></Label>
                        </Col>
                        <Col md="9">
                            <FormGroup>
                                <Field
                                    name="fileName"
                                    component={renderField}
                                    id="channel_name"
                                    validate={required}
                                    label="Channel Name"
                                    />
                            </FormGroup>
                        </Col>
                    
                </Row>
                <Row>
                    <Col md="3">
                        <Label htmlFor="file-input">Headers Included</Label>
                    </Col>
                    <Col md="9">
                        <FormGroup check inline>
                        <Field
                            name="hasHeader"
                            component="input"
                            type="radio"
                            value="true"
                            className="form-check-input"
                            id="inline-radio1"
                            validate={requiredString}
                            />{' '}
                            <Label className="form-check-label" check htmlFor="inline-radio1">Yes</Label> 
                        </FormGroup>
                        <FormGroup check inline>
                            <Field
                                name="hasHeader"
                                component="input"
                                type="radio"
                                value="false"
                                className="form-check-input"
                                id="inline-radio2"
                                validate={requiredString}
                                />{' '}
                            <Label className="form-check-label" check htmlFor="inline-radio2">No</Label> 
                        </FormGroup>
                    </Col>
                </Row>
                <FieldArray name="firstRowUnmutated" component={addRules} state3={props.state.mappingToView} utils={props.utilsList} />
                <FormGroup className="form-actions">
                    <Button type="submit" size="md" color="success" disabled={pristine || submitting || invalid}>Submit</Button>
                </FormGroup>
            </div>
        </form>
    )

}

/**
 * Reset Form values
 */
const afterSubmit = (result, dispatch) =>
  dispatch(reset('newProductDefinitionForm')
);

const validate = (values) =>{
    console.log('Values are ',values)
}

export default reduxForm({
    form: 'addManualDefinitionForm', // a unique identifier for this form
    onSubmitSuccess: afterSubmit,
    validate,
  })(AddManualFileDefinitionForm);