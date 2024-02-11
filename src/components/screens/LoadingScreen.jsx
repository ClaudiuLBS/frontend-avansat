import React from 'react'
import { Spinner } from 'react-bootstrap';

import CenteredAbsoluteLayout from '../../layouts/CenteredAbsoluteLayout';

const LoadingScreen = () => {
  return ( 
  <CenteredAbsoluteLayout>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </CenteredAbsoluteLayout>
  );
}
 
export default LoadingScreen;