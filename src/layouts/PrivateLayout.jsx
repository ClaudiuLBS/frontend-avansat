import React from 'react';
import { useSelector } from 'react-redux';

import DefaultLayout from './DefaultLayout';
import LoginScreen from '../components/screens/LoginScreen';

const PrivateLayout = ({children}) => {
  const uid = useSelector(state => state.user.uid)

  if (!uid)
    return <LoginScreen/>;

  return ( 
    <DefaultLayout>
      {children}
    </DefaultLayout>
   );
}
 
export default PrivateLayout;