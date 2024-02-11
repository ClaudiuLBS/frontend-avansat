import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import '../../css/index.css'

import LoadingScreen from '../screens/LoadingScreen';
import ApiCategories from '../../api/api.categories';
import CustomErrorMessage from '../CustomErrorMessage';
import { Link } from 'react-router-dom';
import DeleteButton from '../buttons/DeleteButton';
import CustomModal from '../modals/CustomModal';
import ApiPosts from '../../api/api.posts';

const PostForm = ({
  post = {title: '', content: '', category: '', image: ''}, 
  onSubmit, 
}) => {
  const email = useSelector(state => state.user.email);
  const [categories, setCategories] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalState = useState(false);

  useEffect(() => {
    loadCategories();
  },[])

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .min(10, 'Must be 10 characters or more')
      .required('Required'),
    content: Yup.string()
      .trim()
      .min(100, 'Must be 100 characters or more')
      .required('Required'),
    category: Yup.string()
      .required('Required')
  })

  if (!post)
    return <LoadingScreen />

  return ( 
      <Formik
        initialValues={{ title: post.title, content: post.content, category: post.category }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const result = {
            ...values,
            image: uploadedImage,
            author: email
          }
          
          setLoading(true);
          await onSubmit(result);
          setLoading(false);

          setSubmitting(false);
        }}
      >
        <Form className='d-flex flex-column' style={styles.formContainer}>
          <label htmlFor="category" style={styles.label}>Category</label>
          <Field name="category" as="select"  style={{width: 'fit-content'}}>
            <option value={''}>Please select a category...</option>
            {categories.map(x => <option key={x} value={x}>{x}</option>)}
          </Field>
          <CustomErrorMessage name={'category'}/>

          <label htmlFor="title" style={styles.label}>Title</label>
          <Field style={{borderRadius: 5}} name="title" type="text" />
          <CustomErrorMessage name={'title'}/>
          <br/>

          <label htmlFor="content" style={styles.label}>Content</label>
          <Field name="content" as="textarea" type="text" rows="5" style={{resize: 'none', borderRadius: 5}}/>
          <CustomErrorMessage name={'content'}/>
          <br/>

          <label style={styles.label}>Image</label>
          <input id="image" name="image" type="file" accept="image/*" onChange={handleImageUploadEvent} />
          {renderImage()}

          <div className='d-flex flex-direction-row justify-content-between mt-2 align-items-end' >
            <Link style={{color: 'gray', textDecoration: 'none', fontWeight: 'bold'}} to={'/admin'}>Close</Link>
            <Button type="submit" variant='success' disabled={loading}>Submit</Button>
          </div>

          <CustomModal showState={modalState}
           title={'Remove Image'}
           primaryButtonText={'Yes'}
           onPrimaryButtonClick={removeImage}
          >
            Are you sure that you want to remove this image from the post?
          </CustomModal>
        </Form>
      </Formik>
  );

  async function loadCategories() {
    const data = await ApiCategories.GetAll();
    setCategories(data);
  }

  function getImage() {
    if (uploadedImage) 
      return URL.createObjectURL(uploadedImage);

    if (post && post.image) 
      return post.image;

    return null;
  }

  function renderImage() {
    if (!getImage()) 
      return;

    return (
      <div style={{marginTop: 15, position: 'relative', width: '40%'}}> 
        <DeleteButton className="delete-button" style={styles.deleteButton} size={30} color='black' onClick={handleRemoveImageButton}/>
        <img src={getImage()} style={{borderRadius: 10}} width={'100%'}/>
      </div>
    )
  }

  function handleImageUploadEvent(event) {
    const img = event.currentTarget.files[0]
    setUploadedImage(img);
  }

  function handleRemoveImageButton() {
    const setModalState = modalState[1];
    setModalState(true);
  }

  async function removeImage() {
    await ApiPosts.DeleteImage(post.id);
    post.image = null;
  }
}

const styles = {
  label: {
    color: 'gray',
    marginTop: 10
  },
  
  formContainer: {
    boxShadow: '1px 2px 10px #000', 
    borderRadius: 15, 
    padding: 10, 
    position: 'relative'
  },
  deleteButton: {
    position: 'absolute', 
    top: 7, 
    right: 7, 
    borderRadius: 10, 
    padding: 4
  }
}
export default PostForm;