import React, { useState } from 'react'

import DefaultLayout from '../../layouts/DefaultLayout';
import LoginModal from '../modals/LoginModal';

const LoginScreen = () => {
  const modalState = useState(true);

  return ( 
    <DefaultLayout>
      <LoginModal modalState={modalState}/>
    </DefaultLayout>
   );
}
 
export default LoginScreen;