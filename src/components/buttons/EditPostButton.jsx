import React from 'react'
import { Link } from 'react-router-dom';
import { PencilSquare } from 'react-bootstrap-icons';

const EditPostButton = ({post, size=20, color='green'}) => {
  return ( 
    <Link to={`/admin/posts/${post.id}`}>
      <PencilSquare size={size} color={color}/>
    </Link>
  );
}
 
export default EditPostButton;