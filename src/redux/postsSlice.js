import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postsList: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.postsList = action.payload;
    },
    addPost: (state, action) => {
      const post = action.payload.post;
      state.postsList.push(post);
    },
    editPost: (state, action) => {
      const id = action.payload.id;
      const post = action.payload.post;
      const idx = state.postsList.findIndex(x => x.id == id);
      state.postsList[idx] = post;
    },
    deletePost: (state, action) => {
      const id = action.payload.id;
      const idx = state.postsList.findIndex(x => x.id == id);
      state.postsList.splice(idx, 1);
    }
  },
})

export const { setPosts, addPost, editPost, deletePost } = postsSlice.actions
export default postsSlice.reducer