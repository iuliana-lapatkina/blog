import { createSlice } from '@reduxjs/toolkit';

import { getArticles, getSingleArticle, addUser, signIn, getUser, editProfile } from '../services/blogService';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    articleList: [],
    currentArticle: [],
    countPages: 1,
    currentPage: 1,
    error: false,
    loading: false,
    isLogged: false,
    token: null,
    username: null,
    password: null,
    email: null,
    image: null,
  },

  reducers: {
    getPage(state, { payload }) {
      state.currentPage = payload;
    },
    saveData(state, { payload }) {
      state.token = payload.userToken;
      state.username = payload.userName;
      state.email = payload.userMail;
      state.password = payload.userPassword;
      state.image = payload.userImage;
    },
    savePassword(state, { payload }) {
      state.password = payload;
    },
    logOut(state, { payload }) {
      state.isLogged = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getArticles.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.articleList = payload.articles;
        state.countPages = payload.articlesCount;
      })
      .addCase(getArticles.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getSingleArticle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSingleArticle.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.error = false;
        state.isSinglePage = true;
        state.currentArticle = payload.article;
      })
      .addCase(getSingleArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addUser.pending, (state) => {
        state.error = false;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.isLogged = true;
        state.token = payload.user.token;
        state.email = payload.user.email;
        state.username = payload.user.username;
        localStorage.setItem('token', payload.user.token);
        localStorage.setItem('username', payload.user.username);
        localStorage.setItem('email', payload.user.email);
        localStorage.setItem('image', null);
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(signIn.pending, (state, { payload }) => {
        state.error = false;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isLogged = true;
        state.token = payload.user.token;
        state.username = payload.user.username;
        state.email = payload.user.email;
        state.image = payload.user.image;
        localStorage.setItem('token', payload.user.token);
        localStorage.setItem('username', payload.user.username);
        localStorage.setItem('email', payload.user.email);
        localStorage.setItem('image', payload.user.image);
      })
      .addCase(signIn.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getUser.pending, (state, { payload }) => {
        state.error = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.username = payload.user.username;
        state.email = payload.user.email;
        state.image = payload.user.image;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editProfile.pending, (state, { payload }) => {
        state.error = false;
      })
      .addCase(editProfile.fulfilled, (state, { payload }) => {
        state.username = payload.user.username;
        state.email = payload.user.email;
        state.image = payload.user.image;
        localStorage.setItem('username', payload.user.username);
        localStorage.setItem('email', payload.user.email);
        localStorage.setItem('image', payload.user.image);
      })
      .addCase(editProfile.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },

  devTools: true,
});

export const { getPage, saveData, logOut, savePassword } = blogSlice.actions;

export default blogSlice.reducer;
