import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, Card, CardBody, CardHeader, Collapse, } from 'reactstrap';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
<div>
    <label>{label}</label>
    <div>
    <input {...input} type={type} placeholder={label} />
    {touched && error && <span>{error}</span>}
    </div>
</div>
)
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
  const toggleAccordion =(index) =>{
      index=true;
  }
const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Add Member
        </button>
        {submitFailed && error && <span>{error}</span>}
      </li>
      {fields.map((member, index) => (
          <Card key={index}>
          <CardHeader id="headingOne">
            <Button block color="link" className="text-left m-0 p-0" aria-controls="collapseOne" onClick={() => toggleAccordion(index)} >
              <h5 className="m-0 p-0">Collapsible Group Item #1</h5>
            </Button>
          </CardHeader>
          <Collapse  data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne" isOpen={Boolean(index)}>
            <CardBody>
              1. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
              beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </CardBody>
          </Collapse>
        </Card>
        // <li key={index}>
        //   <button
        //     type="button"
        //     title="Remove Member"
        //     onClick={() => fields.remove(index)}
        //   />
        //   <h4>Member #{index + 1}</h4>
        //   <Field
        //     name={`${member}.firstName`}
        //     type="text"
        //     component={renderField}
        //     label="First Name"
        //   />
        //   <Field
        //     name={`${member}.lastName`}
        //     type="text"
        //     component={renderField}
        //     label="Last Name"
        //   />
        //   {/* <FieldArray name={`${member}.hobbies`} component={renderHobbies} /> */}
        // </li>
      ))}
    </ul>
  )
  const FieldArraysForm = props => {
      console.log('Props for accordions are ',props);
    const { handleSubmit, pristine, reset, submitting } = props
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="clubName"
          type="text"
          component={renderField}
          label="Club Name"
        />
        <FieldArray name="members" component={renderMembers} />
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
  export default reduxForm({
    form: 'fieldArrays', // a unique identifier for this form
    
  })(FieldArraysForm)