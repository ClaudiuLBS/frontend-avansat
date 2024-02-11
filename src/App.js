import React from 'react';
import { useDispatch } from 'react-redux'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import * as FirebaseConfig from '../src/config/firebase' // the config will be initialized before loading the app
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PostDetailsPage from './pages/PostDetailsPage';
import NewPostPage from './pages/NewPostPage';
import { setUser } from './redux/userSlice';

const App = () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({
        uid: user.uid,
        email: user.email
      }))    
    } else {
      dispatch(setUser({
        uid: null,
        email: null
      }))    
    }
  });

  return (  
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/admin' Component={DashboardPage} />
        <Route path='/admin/posts/:id' Component={PostDetailsPage} />
        <Route path='/admin/posts/new' Component={NewPostPage} />
        <Route path='/posts/:category' Component={HomePage} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;