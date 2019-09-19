import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import uuid  from 'uuid';

const postApi = `https://reqres.in/api/users`;

export default function FormContainer(){
  const [users, setUser] = useState([]);
  const [serverError, setServerError] = useState();

  const addUser = (formValues) => {
    const { name, email, password } = formValues;
    const newUser = {
      id: uuid(), 
      name: name, 
      email: email, 
      password: password 
    };
    
    if (name && email && password){
      axios.post(postApi, newUser).then(res => {
        setUser(users.concat(newUser));
        console.log(res.data);
      }).catch(e => setServerError(e))
    }
  }

  const checkUsers = () => {
    return users;
  };

  useEffect(() => {
   checkUsers();
  }, []);

  return (
    <div>
      {serverError}
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
  email: yup.string().email('has to be an email').required('enter an email'),
  password: yup.string().required('password required'),
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