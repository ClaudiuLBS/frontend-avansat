import React from 'react';

const CenteredAbsoluteLayout = ({children}) => {
  return ( 
    <div 
      className='d-flex align-items-center justify-content-center' 
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: -10,
    }}>
      {children}
    </div>
  );
}
 
export default CenteredAbsoluteLayout;