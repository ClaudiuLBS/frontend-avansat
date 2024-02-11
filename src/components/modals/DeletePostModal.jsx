import React from 'react'
import { useDispatch } from 'react-redux';

import { deletePost } from '../../redux/postsSlice';
import ApiPosts from '../../api/api.posts';
import CustomModal from './CustomModal';
import { truncateText } from '../../utils';

const DeletePostModal = ({modalState, post, nextRoute = null}) => {
  const dispatch = useDispatch();
  
  if (post === null)
    return null;

  return ( 
    <CustomModal
      showState={modalState}
      title={"Delete"}
      primaryButtonText={"Yes"}
      onPrimaryButtonClick={onDeletePost}
      nextRoute={nextRoute}
    >
      {`Are you sure you want to delete the post "${truncateText(post.title)}"?`}
    </CustomModal>
  );
  
  async function onDeletePost() {
    const success = await ApiPosts.Delete(post.id);

    if (success) 
      dispatch(deletePost(post))
  }
}
 
export default DeletePostModal;