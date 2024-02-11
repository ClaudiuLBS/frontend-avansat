import React from 'react';

import CustomModal from './CustomModal';


const UpdatePostModal = ({children, modalState}) => {

  return ( 
    <CustomModal 
      title={'Success!'} 
      showState={modalState}
      primaryButtonText={'OK'}
      nextRoute={'/admin'}
      visibleCloseButton={false}
    >
      {children}
    </CustomModal>
  );
}
 
export default UpdatePostModal;