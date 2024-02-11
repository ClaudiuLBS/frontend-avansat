import React, { useState } from 'react'

import DeletePostModal from '../modals/DeletePostModal';
import EditPostButton from '../buttons/EditPostButton';
import DeleteButton from '../buttons/DeleteButton';
import { timestampToString, truncateText } from '../../utils';


const PostTableRow = ({post, index}) => {
  const modalState = useState(false);

  return ( 
    <>
      <tr>
        <td>{index}</td>
        <td>{post.category}</td>
        <td>{truncateText(post.title)}</td>
        <td>{post.author}</td>
        <td>{timestampToString(post.datetime)}</td>
        <td>
          <div className='d-flex justify-content-around align-items-center'>
            <EditPostButton post={post}/>
            <div style={{width: 20}}></div>
            <DeleteButton onClick={onTrashButtonClick}/>
          </div>
        </td>
      </tr>
      <DeletePostModal modalState={modalState} post={post}/>
    </>
  );
  
  function onTrashButtonClick() {
    const setModalState = modalState[1];
    setModalState(true);
  }
}
 
export default PostTableRow;