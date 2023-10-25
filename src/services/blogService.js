import { createAsyncThunk } from '@reduxjs/toolkit';

const _apiBase = 'https://blog.kata.academy/api';

const throwError = (result) => {
  if (!result.ok) {
    throw new Error(`${result.status}`);
  }
};

export const getArticles = createAsyncThunk('blog/getArticles', async ([page, token = 0], { rejectWithValue }) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const offset = page * 5 - 1;
    let res = await fetch(`${_apiBase}/articles?offset=${offset}&limit=5`);
    if (token) {
      res = await fetch(`${_apiBase}/articles?offset=${offset}&limit=5`, options);
    }
    throwError(res);

    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const getSingleArticle = createAsyncThunk(
  'blog/getSingleArticle',
  async ([id, token = 0], { rejectWithValue }) => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    try {
      let res;
      if (token !== 0) {
        res = await fetch(`${_apiBase}/articles/${id}`, options);
      } else {
        res = await fetch(`${_apiBase}/articles/${id}`);
      }
      throwError(res);

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  'blog/createArticle',
  async ([title, description, text, tags, token], { rejectWithValue }) => {
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
      throwError(res);
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const editArticle = createAsyncThunk(
  'blog/editArticle',
  async ([title, description, text, tags, token, id], { rejectWithValue }) => {
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
      throwError(res);
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteArticle = createAsyncThunk('blog/deleteArticle', async ([token, id], { rejectWithValue }) => {
  try {
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const res = await fetch(`${_apiBase}/articles/${id}`, deleteOptions);
    throwError(res);
    const data = await res.json();
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
    throwError(res);
    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const signIn = createAsyncThunk('blog/signIn', async ([email, password, token], { rejectWithValue }) => {
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
    throwError(res);
    const data = await res.json();
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
    throwError(res);

    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const editProfile = createAsyncThunk(
  'blog/editProfile',
  async ([username, email, password, image, token], { rejectWithValue }) => {
    try {
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
      throwError(res);
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const putLike = createAsyncThunk('blog/putLike', async ([id, token], { rejectWithValue }) => {
  try {
    const postOptions = {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const res = await fetch(`${_apiBase}/articles/${id}/favorite`, postOptions);
    throwError(res);
    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const deleteLike = createAsyncThunk('blog/deleteLike', async ([id, token], { rejectWithValue }) => {
  try {
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    const res = await fetch(`${_apiBase}/articles/${id}/favorite`, deleteOptions);
    throwError(res);
    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
