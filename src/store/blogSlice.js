import { createSlice } from '@reduxjs/toolkit';

import { getArticles, getSingleArticle } from '../services/blogService';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    articleList: [],
    currentArticle: [],
    countPages: 1,
    currentPage: 1,
    error: false,
    loading: false,
  },

  reducers: {
    getPage(state, { payload }) {
      state.currentPage = payload;
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
      });
  },

  devTools: true,
});

export const { getPage, changeSingle } = blogSlice.actions;

export default blogSlice.reducer;
