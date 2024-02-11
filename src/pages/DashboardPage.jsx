import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PostsTable from '../components/posts/PostsTable';
import ApiPosts from '../api/api.posts';
import { setPosts } from '../redux/postsSlice';
import LoadingScreen from '../components/screens/LoadingScreen';
import PrivateLayout from '../layouts/PrivateLayout';

const DashboardPage = () => {
  const posts = useSelector(state => state.posts.postsList);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Kanal B News | Admin'
    loadData();
  }, [])

  if (loading)
    return (
      <PrivateLayout>
        <LoadingScreen />
      </PrivateLayout>
    )

  return ( 
    <PrivateLayout>
        <div className='d-flex justify-content-between'>
          <div></div>
          <Link to="/admin/posts/new">
            <Button className='mb-2' variant='success'>Add new</Button>
          </Link>
        </div>
        <PostsTable data={posts}/>
    </PrivateLayout> 
  );

  async function loadData() {
    const data = await ApiPosts.GetAll();
    dispatch(setPosts(data));
    setLoading(false);
  }
}
 
export default DashboardPage;