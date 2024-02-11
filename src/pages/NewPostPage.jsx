import React, { useEffect, useState } from 'react'

import PostForm from '../components/posts/PostForm';
import ApiPosts from '../api/api.posts';
import PrivateLayout from '../layouts/PrivateLayout';
import NarrowLayout from '../layouts/NarrowLayout';
import UpdatePostModal from '../components/modals/SavePostModal';

const NewPostPage = () => {
  const modalState = useState(false);

  useEffect(() => {
    document.title = 'Kanal B News | New Post'
  }, [])

  return ( 
    <PrivateLayout>
      <NarrowLayout>
        <h3>New Post</h3>
        <PostForm onSubmit={onSubmit}/>
        <UpdatePostModal modalState={modalState}>The post has been created.</UpdatePostModal>
      </NarrowLayout>
    </PrivateLayout>
  );

  async function onSubmit(post) {
    const success = await ApiPosts.Add(post);

    if (success) {
      const setModalState = modalState[1];
      setModalState(true);
    }
  }
}
 
export default NewPostPage;