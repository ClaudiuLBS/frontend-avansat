import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EditPostButton from './buttons/EditPostButton';
import NarrowLayout from '../layouts/NarrowLayout';
import { timestampToString, truncateText } from '../utils';

const CustomCard = ({post}) => {
  const email = useSelector(state => state.user.email)
  const [fullTitle, setFullTitle] = useState(false);
  const [fullContent, setFullContent] = useState(false);

  return ( 
    <NarrowLayout>
      {renderCategory()}
      <Card >
        {renderHeader()}
        <Card.Header as="h5" style={{color: 'gray'}} className='d-flex flex-direction-row justify-content-between align-items-center'>
          <div>~{post.author}</div>
          <div style={{fontSize: 13}}>{timestampToString(post.datetime)}</div>
        </Card.Header>
        <Card.Body>
          {renderImage()}
          <Card.Text style={{boxShadow: ' 10 10'}}>
            {renderContent()}
          </Card.Text>

        </Card.Body>
      </Card>
    </NarrowLayout>
  );

  function renderImage() {
    if (!post.image) return;

    return (
      <>
        <img style={{borderRadius: 10}} src={post.image} width={'100%'}/>
        <br/>
        <br/>
      </>
    )
  }

  function renderHeader() {
    if (!email)
      return <Card.Header as="h4" title={post.title}>{truncateText(post.title)}</Card.Header>
    
    return (
      <Card.Header as="h4" title={post.title} className='d-flex flex-direction-row justify-content-between align-items-center'>
        <div>{truncateText(post.title)}</div>
        <EditPostButton post={post} />
      </Card.Header>
    )
  }

  function renderContent() {

    if (post.content.length > 500)
      return (
        <>
          {fullContent ? post.content : truncateText(post.content, 500)}
          <p 
            role='button' 
            style={{color: 'blue'}}
            onClick={() => {
              setFullContent(!fullContent);
            }}>
            {fullContent ? 'read less..' : 'read more...'}
          </p>
        </>
      )
      return post.content;
    }

  function renderCategory() {
    return (
      <div style={{
        marginBottom: 5, 
        backgroundColor: 'gray', 
        width:'fit-content', 
        paddingRight: 10, 
        paddingLeft: 10, 
        paddingBottom: 3,
        paddingTop: 1,
        alignItems: 'center', 
        borderRadius: 10, 
        color: 'white',
        fontSize: 13
      }}>
        #{post.category}
      </div>
    )
  }


}
 
export default CustomCard;