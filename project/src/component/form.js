import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

export default function FormContainer(){
  const [users, setUser] = useState([]);

  const addUser = (formValues) => {
    const { name, email, password } = formValues;
    debugger
    setUser(users.concat({ name: name, email: email, password: password }));
  }

  const checkUsers = () => {
    return users;
  };

  useEffect(() => {
   checkUsers();
  }, []);

  return (
    <div>
      <UserForm onSubmit={addUser}/>

      {
        users.length
          ? users.map(fr => (
            <div key={fr.id}>{fr.name} is {fr.email}</div>
          ))
          : 'User List Empty'
      }
    </div>
  );
}

const initialUserForm = {

};

const validationSchema = yup.object().shape({
  name: yup.string('Has to be string').required('No Name'),
  email: yup.string().email(),
  password: yup.string(),
});

function UserForm({ onSubmit }) {
  // Let's keep the FriendForm component
  // nice and stateless.
  return (
    <Formik 
      initialValues={initialUserForm}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={props => {
        return (
          <Form>
            <div>
              <Field name='name' type='text' placeholder='Name' />
              <ErrorMessage name='name' component='div' />
            </div>
            <div>
              <Field name='email' type='text' placeholder='email...' />
              <ErrorMessage name='email' component='div' />
            </div>
            <div>
              <Field name='password' type='text' placeholder='password...' />
              <ErrorMessage name='password' component='div' />
            </div>
            <div>
              <Field name='checkbox' type='checkbox'></Field>
              <ErrorMessage name='checkbox' component='div' />
            </div>
            <button type='submit'>Submit</button>
          </Form>
        )
      }}
    />
  );
}

