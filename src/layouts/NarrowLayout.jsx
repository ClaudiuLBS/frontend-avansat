import React from 'react'

const NarrowLayout = ({children}) => {
  return ( 
    <div style={{marginLeft: '20%', marginRight: '20%'}}>
      {children}
    </div>
  );
}
 
export default NarrowLayout;