import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {  Card, CardBody, CardHeader, Col,  Row,  Button,  FormGroup, Input} from 'reactstrap';

var data = ['Monday','Tuesday','Wednesday'];

const renderField = ({ input, label, type, meta: { touched, error,warning } }) => (
    <div>
        <div>
        <input {...input} type={type} placeholder={label} className="form-control"/>
        {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
        </div>
    </div>
)
const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const renderHobbies = ({ fields, meta: { error } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push()}>
          Add Hobby
        </button>
      </li>
      {fields.map((hobby, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Hobby"
            onClick={() => fields.remove(index)}
          />
          <Field
            name={hobby}
            type="text"
            component={renderField}
            label={`Hobby #${index + 1}`}
          />
        </li>
      ))}
      {error && <li className="error">{error}</li>}
    </ul>
)

const renderSelectField = ({input,label,type,meta:{touched,error},children }) => (
   
    <Input type="select" {...input}>
        {children}
    </Input>
    
)

const addFields = ({ fields,data,state3, meta: { error } }) => (
    
    <Row>
        {/* {state} */}
       
        <Col style={{ 'textAlign': 'right' }} xs="12">
            <Button style={{ 'marginBottom': '20px' }} color="success" onClick={() => fields.push({})}><i className="fa fa-plus"></i>&nbsp;Add Field</Button>
        </Col>
        {fields.map((product,index) => (
            <Col xs="12" key={index}>  
                <FormGroup row>
                    <Col md="3">
                        <Field
                            name={`${product}.productName`}
                            type="text"
                            component={renderField}
                            label="Name of Product"
                            validate={required}
                        />
                        {/* <Input type="text" id="text-input" name={`text${index+1}`} placeholder="Text" /> */}
                    </Col>
                    <Col md="3">
                    <Field
                        name={`${product}.accountNumber`}
                        type="text"
                        component={renderField}
                        label="Account Number"
                    />
                    </Col>
                    <Col md="3">
                        <Field name={`${product}.mappedField`} component={renderSelectField} label="Mapped Field">
                            <option value="">Select Field</option>
                            { state3.map((option,index) => <option value={index} key={index}>{option}</option>) }
                        </Field>
                    </Col>
                    <Col md="3">
                    <FormGroup className="form-actions">
                        <Button type="submit" size="sm" color="danger" onClick={() => fields.remove(index)}>Delete</Button>
                    </FormGroup>
                    </Col>
                </FormGroup>
                    
            </Col>
        ))}
    </Row>
)

const addRules = ({ fields,data,state3, meta: { error } }) => (
    
    <Row>
        {/* {state} */}
       
        <Col style={{ 'textAlign': 'right' }} xs="12">
            <Button style={{ 'marginBottom': '20px' }} color="success" onClick={() => fields.push({})}><i className="fa fa-plus"></i>&nbsp;Add Rule</Button>
        </Col>
       
        {fields.map((product,index) => (
            <Col xs="12" key={index}>  
                <FormGroup row>
                    <Col md="3">
                        { index === 0?
                        <Field name={`${product}.operator`} component="select" className="form-control">
                            <option value="">Select Logical Operator</option>
                            <option value="and">AND</option>
                            <option value="or">OR</option>
                        </Field> :''
                        }
                        
                    </Col>
                    <Col md="3">
                        <Field name={`${product}.mappedField`} component={renderSelectField} label="Mapped Field">
                            <option value="">Select Field</option>
                            { state3.map((option,index) => <option value={index} key={index}>{option}</option>) }
                        </Field>
                    </Col>
                    <Col md="3">
                        <Field
                            name={`${product}.value`}
                            type="text"
                            component={renderField}
                            label="Value"
                        />
                    </Col>
                    
                    <Col md="3">
                    <FormGroup className="form-actions">
                        <Button type="submit" size="sm" color="danger" onClick={() => fields.remove(index)}>Delete</Button>
                    </FormGroup>
                    </Col>
                </FormGroup>
                    
            </Col>
        ))}
    </Row>
)


const renderProductFile = ({ fields,state3,data,meta: { error, submitFailed }}) => (
    <Row>
            {/* <Col style={{ 'textAlign': 'right' }} xs="12">
                <Button style={{ 'marginBottom': '20px' }} color="success" onClick={() => fields.push({})}><i className="fa fa-plus"></i>&nbsp;Field and Rules Mapping </Button>
            </Col> */}
        
        {fields.map((product,index) => (
            // <Row >
                <Col xs="12" key={index}>
                    <Card>
                        <CardHeader>
                            <i className="fa fa-credit-card-alt"></i> Field and Rules Mapping
                        </CardHeader>
                        <CardBody>
                            {/* <FormGroup row>
                                <Col md="3">
                                    <Label htmlFor="file-input">File input</Label>
                                    
                                </Col>
                                <Col xs="12" md="9">
                                    <Input type="file" id="file-input" name="file-input" />
                                    
                                </Col>
                            </FormGroup> */}
                            <FieldArray name={`${product}.components`} component={addFields}  data={data} state3={state3}/>
                            <FieldArray name={`${product}.rules`} component={addRules}  data={data} state3={state3}/>
                        </CardBody>
                    </Card>
                </Col>
            // </Row>
        ))}
    </Row>
)


// const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
//     <ul>
//       <li>
//         <button type="button" onClick={() => fields.push({})}>
//           Add Member
//         </button>
//         {submitFailed && error && <span>{error}</span>}
//       </li>
//       {fields.map((member, index) => (
//         <li key={index}>
//           <button
//             type="button"
//             title="Remove Member"
//             onClick={() => fields.remove(index)}
//           />
//           <h4>Member #{index + 1}</h4>
//           <Field
//             name={`${member}.firstName`}
//             type="text"
//             component={renderField}
//             label="First Name"
//           />
//           <Field
//             name={`${member}.lastName`}
//             type="text"
//             component={renderField}
//             label="Last Name"
//           />
//           <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
//         </li>
//       ))}
//     </ul>
// )



const FieldArraysForm = props => {
    console.log('Props needed to see ',props);
    const { handleSubmit, pristine, reset, submitting,state} = props
    // let state = props.state
    // state2 = props.state.mappedFields;
    return (
        <form onSubmit={handleSubmit}>
            {/* <Field
                name="clubName"
                type="text"
                component={renderField}
                label="Club Name"
            /> */}
            {/* <FieldArray name="members" component={renderMembers} /> */}
            {console.log('State here root is ',props.state)}
            <FieldArray name="members" component={renderProductFile} state3={props.state.mappedFields} data={data}/>
            <div>
                <Button color="success" disabled={submitting} style={{'marginRight':'10px'}}>Submit</Button>
                <Button color="default" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'addProduct', // a unique identifier for this form
    initialValues: {
        members: [{firstName: '', lastName: '', components: [{}],rules:[{}]}]
      }
    // validate
  })(FieldArraysForm)