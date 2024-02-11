import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ApiPosts from '../api/api.posts';
import PostForm from '../components/posts/PostForm';
import PrivateLayout from '../layouts/PrivateLayout';
import NarrowLayout from '../layouts/NarrowLayout';
import UpdatePostModal from '../components/modals/SavePostModal';

const PostDetailsPage = () => {
  const modalState = useState(false);
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadPost();
  }, [])

  useEffect(() => {
    if (post)
      document.title = `Kanal B News | ${post.title}`
  }, [post])

  return (
    <PrivateLayout>
      <NarrowLayout>
        <h3>Edit Post</h3>
        <PostForm post={post} onSubmit={onSubmit}/>
        <UpdatePostModal modalState={modalState}>The post has been updated.</UpdatePostModal>
      </NarrowLayout>
    </PrivateLayout>
  );

  async function loadPost() {
    const data = await ApiPosts.GetById(id);
    setPost(data);
  }

  async function onSubmit(values) {
    const success = await ApiPosts.Update(id, values);

    if (success) {
      const setModalState = modalState[1];
      setModalState(true);
    }
  }
}
 
export default PostDetailsPage;