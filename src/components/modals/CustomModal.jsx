import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const CustomModal = ({
  showState, 
  title, 
  children, 
  primaryButtonText, 
  onPrimaryButtonClick = () => null, 
  nextRoute = null, 
  visiblePrimaryButton = true,
  visibleFooter = true,
  visibleCloseButton = true,
  canBeClosed = true
}) => {
  const navigate = useNavigate();
  const [show, setShow] = showState;
  const [loading, setLoading] = useState(false);
  const handleClose = () => canBeClosed && setShow(false);

  return ( 
    <Modal show={show} onHide={handleClose} style={{marginTop: 100}}>
      <Modal.Header closeButton={visibleCloseButton}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {visibleFooter && 
        <Modal.Footer>
          {visibleCloseButton &&
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          }
          {renderPrimaryButton()}
        </Modal.Footer>
      }
    </Modal>
  );

  function renderPrimaryButton() {
    if (!visiblePrimaryButton) return;

    return (
      <Button 
        disabled={loading} 
        variant="success" 
        onClick={async () => {
          setLoading(true);
          await onPrimaryButtonClick();
          setLoading(false);
          handleClose();

          if (nextRoute)
            navigate(nextRoute);
      }}> 
        {primaryButtonContent()}
      </Button>
    )
  }

  function primaryButtonContent() {
    if (!loading)
      return primaryButtonText;
    
    return (
      <Spinner animation="border" role="status" size='sm'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }
}
 
export default CustomModal;