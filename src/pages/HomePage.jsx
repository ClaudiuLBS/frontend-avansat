import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingScreen from '../components/screens/LoadingScreen';
import EmptyState from '../components/screens/EmptyStateScreen';
import DefaultLayout from '../layouts/DefaultLayout';
import CustomCard from '../components/CustomCard';
import { setPosts } from '../redux/postsSlice';
import ApiPosts from '../api/api.posts';
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.postsList);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    loadData();
  }, []) 

  useEffect(() => {
    if (category) {
      setFilteredPosts(posts.filter(x => x.category == category));
      document.title = `Kanal B News | ${category}`
    }
    else {
      setFilteredPosts(posts);
      document.title = `Kanal B News`
    }
  }, [category])

  if (loading)
    return (
      <DefaultLayout>
        <LoadingScreen />
      </DefaultLayout>
    )
      

  if (posts == null || posts.length == 0)
    return (
      <DefaultLayout>
        <EmptyState />
      </DefaultLayout>
    )
  
  return ( 
    <DefaultLayout>
      {renderPosts()}
    </DefaultLayout>
  );
  
  async function loadData() {
    const data = await ApiPosts.GetAll(true);
    dispatch(setPosts(data));
    setLoading(false);

    if (!category)
      setFilteredPosts(data);
    else
      setFilteredPosts(data.filter(x => x.category == category));
  }

  function renderPosts() {
    if (!filteredPosts) return;

    return filteredPosts.map(post => (
      <>
        <CustomCard key={post.id} post={post}/>
        <br/>
      </>
      )
    );
  }
}
 
export default HomePage;