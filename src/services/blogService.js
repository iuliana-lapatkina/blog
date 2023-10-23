import { createAsyncThunk } from '@reduxjs/toolkit';

const _apiBase = 'https://blog.kata.academy/api';

export const getArticles = createAsyncThunk('blog/getArticles', async (page, { rejectWithValue }) => {
  try {
    const offset = page * 5 - 1;
    const res = await fetch(`${_apiBase}/articles?offset=${offset}&limit=5`);

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const getSingleArticle = createAsyncThunk('blog/getSingleArticle', async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`${_apiBase}/articles/${id}`);

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const createArticle = createAsyncThunk(
  'blog/createArticle',
  async ([title, description, text, tags, token], { rejectWithValue }) => {
    console.log([title, description, text, tags, token]);

    try {
      const postOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },

        body: JSON.stringify({
          article: {
            title: `${title}`,
            description: `${description}`,
            body: `${text}`,
            tagList: tags,
          },
        }),
      };

      const res = await fetch(`${_apiBase}/articles`, postOptions);

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editArticle = createAsyncThunk(
  'blog/editArticle',
  async ([title, description, text, tags, token, id], { rejectWithValue }) => {
    console.log([title, description, text, tags, token, id]);

    try {
      const putOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },

        body: JSON.stringify({
          article: {
            title: `${title}`,
            description: `${description}`,
            body: `${text}`,
            tagList: tags,
          },
        }),
      };

      const res = await fetch(`${_apiBase}/articles/${id}`, putOptions);

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteArticle = createAsyncThunk('blog/deleteArticle', async ([token, id], { rejectWithValue }) => {
  console.log([token, id]);
  try {
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const res = await fetch(`${_apiBase}/articles/${id}`, deleteOptions);

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const addUser = createAsyncThunk('blog/addUser', async ([username, email, password], { rejectWithValue }) => {
  console.log('addUser');
  try {
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        user: {
          username: `${username}`,
          email: `${email}`,
          password: `${password}`,
        },
      }),
    };

    const res = await fetch(`${_apiBase}/users`, postOptions);

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const signIn = createAsyncThunk('blog/signIn', async ([email, password, token], { rejectWithValue }) => {
  console.log('signIn');
  try {
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          email: `${email}`,
          password: `${password}`,
        },
      }),
    };

    const res = await fetch(`${_apiBase}/users/login`, postOptions);

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const getUser = createAsyncThunk('blog/getUser', async (token, { rejectWithValue }) => {
  console.log('getUser');
  try {
    const getOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
    };

    const res = await fetch(`${_apiBase}/user`, getOptions);

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const editProfile = createAsyncThunk(
  'blog/editProfile',
  async ([username, email, password, image, token], { rejectWithValue }) => {
    console.log('editProfile');
    try {
      console.log([username, email, password, image, token]);
      const getOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          user: {
            username: `${username}`,
            email: `${email}`,
            password: `${password}`,
            image: `${image}`,
          },
        }),
      };

      const res = await fetch(`${_apiBase}/user`, getOptions);

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
