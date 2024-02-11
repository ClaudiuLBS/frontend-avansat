import React from 'react'
import { Trash } from 'react-bootstrap-icons';

const DeleteButton = ({onClick, size=20, color='red', style, className}) => {
  return (  
    <Trash role='button' size={size} color={color} onClick={onClick} style={style} className={className}/>
  );
}
 
export default DeleteButton;