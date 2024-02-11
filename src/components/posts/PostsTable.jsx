import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import PostTableRow from './PostTableRow';
import EmptyState from '../screens/EmptyStateScreen';
import { ArrowsExpand, CaretDown, Filter, FilterLeft, FilterRight } from 'react-bootstrap-icons';
import ApiCategories from '../../api/api.categories';
import { Dropdown } from 'react-bootstrap';

const PostsTable = ({data}) => {
  const [posts, setPosts] = useState([]);
  const [sorting, setSorting] = useState('datetime');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setPosts(data);
    loadCategories();
  }, [data])

  useEffect(() => {
    if (selectedCategory)
      setPosts(data.filter(x => x.category == selectedCategory));
    else
      setPosts(data);
    
  }, [selectedCategory])

  if (!data || data.length == 0)
    return (
      <EmptyState />
    )

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {/* <th role='button' onClick={() => sortData('category')}>
            Category <CaretDown />
            </th> */}
          <th>  
          <Dropdown>
            <Dropdown.Toggle style={{background: '#00000000', color: 'black', padding: 0, fontWeight: 'bold', borderWidth: 0}} id="dropdown-basic">
              Categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedCategory(null)}>All</Dropdown.Item>
              {categories.map((category) => (
                <Dropdown.Item key={category} onClick={() => setSelectedCategory(category)}>{category}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          </th>
          <th role='button' onClick={() => sortData('title')}>Title <FilterLeft /></th>
          <th role='button' onClick={() => sortData('author')}>Author <FilterLeft /></th>
          <th role='button' onClick={() => sortData('datetime')}>Last Edit <FilterLeft /></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, idx) => <PostTableRow key={post.id} post={post} index={idx+1}/>)}
      </tbody>
    </Table>
  );

  function sortData(property) {
    let postsCopy = [...posts];
    
    if (sorting == property) {
      postsCopy.sort((a, b) => b[property].toString().localeCompare(a[property].toString()))
      setSorting(null);
    }
    else {
      postsCopy.sort((a, b) => a[property].toString().localeCompare(b[property].toString()))
      setSorting(property);
    }

    setPosts(postsCopy);
  }

  async function loadCategories() {
    setCategories(await ApiCategories.GetAll());
  }
}

export default PostsTable;