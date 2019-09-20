import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import uuid  from 'uuid';
import './form.css';

const postApi = `https://reqres.in/api/users`;

export default function FormContainer(){
  const [users, setUser] = useState([]);
  const [serverError, setServerError] = useState();

  const addUser = (formValues) => {
    const { name, email, password, checkbox } = formValues;
    const newUser = {
      id: uuid(), 
      name: name, 
      email: email, 
      password: password 
    };

    if (name && email && password && checkbox){
      axios.post(postApi, newUser).then(res => {
        setUser(users.concat(newUser));
        console.log(res.data);
        setServerError('New User Added!');
      }).catch(e => setServerError(e))
    } else {
      setServerError('You must agree to terms of service');
    }
  }

  const checkUsers = () => {
    return users;
  };

  useEffect(() => {
   checkUsers();
  }, [serverError, users]);

  return (
    <div>
      <div className={
        serverError === 'You must agree to terms of service' ?
        'error' : 'noError'
      }>
        {serverError}
      </div>
      <UserForm onSubmit={addUser}/>
      <div  className='users'>
      {
        users.length
          ? users.map(fr => (
            <div key={fr.id}>Name: {fr.name}, Email: {fr.email}</div>
          ))
          : 'User List Empty'
      }
      </div>
    </div>
  );
}

const initialUserForm = {

};

const validationSchema = yup.object().shape({
  name: yup.string('Has to be string').required('No Name'),
  email: yup.string().email('has to be an email').required('enter an email'),
  password: yup.string().required('password required'),
  checkbox: yup.bool('Terms of Service is required'),
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
          <Form className='form' >
            <div>
              <label>Name: </label>
              <Field name='name' type='text' placeholder='Name' />
              <ErrorMessage name='name' component='div' className='error' />
            </div>
            <div>
              <label>Email: </label>
              <Field name='email' type='text' placeholder='email...' />
              <ErrorMessage name='email' component='div' className='error' />
            </div>
            <div>
              <label>Password: </label>
              <Field name='password' type='password' placeholder='password...' />
              <ErrorMessage name='password' component='div' className='error' />
            </div>
            <div>
              <Field name='checkbox' type='checkbox'></Field>
              <label>I Agree to Terms of Service</label>
              <ErrorMessage name='checkbox' component='div' className='error' />
            </div>
            <button type='submit'>Submit</button>
          </Form>
        )
      }}
    />
  );
}