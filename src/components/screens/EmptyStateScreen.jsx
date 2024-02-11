import React from 'react'

import CenteredAbsoluteLayout from '../../layouts/CenteredAbsoluteLayout';

const EmptyState = ({text = "There's nothing to see here :("}) => {
  return (  
    <CenteredAbsoluteLayout>
      <p style={{fontSize: 25}}>{text}</p>
    </CenteredAbsoluteLayout>
  );
}
 
export default EmptyState;