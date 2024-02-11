import React, { useState } from 'react'
import * as Yup from 'yup'
import { Form, Field, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import CustomModal from './CustomModal';
import CustomErrorMessage from '../CustomErrorMessage';
import ApiUsers from '../../api/api.users';
import { setUser } from '../../redux/userSlice';


const LoginModal = ({modalState}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
    .email('Invalid email format')
    .required('Required'),

    password: Yup.string()
      .min(6, 'Must be 6 characters or more')
      .required('Required'),
  })

  return ( 
    <CustomModal
      title={'Login'}
      showState={modalState}
      visiblePrimaryButton={false}
      visibleFooter={false}
      visibleCloseButton={false}
      canBeClosed={false}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form className='d-flex flex-column'>
          <label htmlFor="email">Email</label>
          <Field name="email" type="text" />
          <CustomErrorMessage name={'email'}/>

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <CustomErrorMessage name={'password'}/>
          
          <Button type="submit" variant='success' className='mt-2'>Login</Button>
          <p className='text-danger'>{error}</p>
        </Form>
      </Formik>
    </CustomModal>
  );

  async function onSubmit(values) {
    const user = await ApiUsers.Login(values.email, values.password);
    if (!user) {
      setError("Invalid username or password");
      return;
    }
    
    setError('');
    dispatch(setUser({
      email: user.email,
      uid: user.uid
    }));
  }
}
 
export default LoginModal;