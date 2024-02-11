import { ErrorMessage } from 'formik';
import React from 'react'

const CustomErrorMessage = ({name}) => {
  return (  
    <ErrorMessage name={name}>
      {errorContent}
    </ErrorMessage>
  );

  function errorContent(msg) {
    return <p className='text-danger'>{msg}</p>;
  }
}
 
export default CustomErrorMessage;