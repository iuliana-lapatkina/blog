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

export const addUser = createAsyncThunk('blog/addUser', async ([username, email, password], { rejectWithValue }) => {
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
    console.log(res);

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
