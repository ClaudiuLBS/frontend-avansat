import React from 'react'
import { Container } from 'react-bootstrap';

import CustomNavbar from '../components/CustomNavbar';

const DefaultLayout = ({children}) => {
  return ( 
    <div>
      <CustomNavbar />
      <Container className='mt-3'>
        {children}
      </Container>
    </div>
  );
}
 
export default DefaultLayout;