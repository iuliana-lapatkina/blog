import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CloseOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

import { getUser, editProfile } from '../../services/blogService';
import { savePassword } from '../../store/blogSlice';

import styles from './EditProfile.module.scss';

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';
  const goBack = () => navigate(-1);

  const [error, setError] = useState(false);
  const [dirty, setDirty] = useState(true);

  const token = useSelector((state) => state.blog.token);
  const userName = useSelector((state) => state.blog.username);
  const userEmail = useSelector((state) => state.blog.email);
  const userPassword = useSelector((state) => state.blog.password);
  const userImage = useSelector((state) => state.blog.image);

  useEffect(() => {
    dispatch(getUser(token));
  });

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm({
    mode: 'all',
    defaultValues: {
      username: userName,
      email: userEmail,
      password: userPassword,
      image: userImage,
    },
  });

  const success = () => {
    message.info('User data has been successfully changed');
  };

  const onSubmit = (data) => {
    if (!isDirty) {
      setDirty(false);
      return;
    }
    dispatch(savePassword(data.password));
    dispatch(editProfile([data.username, data.email, data.password, data.image, token])).then((res) => {
      setDirty(false);
      if (res.meta.requestStatus === 'fulfilled') {
        setError(false);
        success();
        navigate(fromPage);
      }
      if (res.meta.requestStatus === 'rejected') {
        setError(true);
      }
    });
    setDirty(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Profile</h2>
      <Button onClick={goBack} className={styles['close-button']}>
        <CloseOutlined style={{ fontSize: '25px' }} />
      </Button>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className={styles.label}>
          Username
          <input
            {...register('username', {
              required: 'This field is required.',
              minLength: {
                value: 3,
                message: 'Your username needs to be from 3 to 20 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your username needs to be from 3 to 20 characters.',
              },
              pattern: {
                value: /^[a-z0-9]+$/,
                message: 'Please use only lowercase letters and numbers.',
              },
            })}
            className={`${styles.input} ${errors?.username && styles['warning-border']}`}
            placeholder="Username"
          />
          <div>{errors?.username && <p className={styles.warning}>{errors?.username?.message || 'Error!'}</p>}</div>
        </label>

        <label htmlFor="email" className={styles.label}>
          Email address
          <input
            {...register('email', {
              required: 'This field is required.',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Please use only lowercase letters and a valid email address.',
              },
            })}
            className={`${styles.input} ${errors?.email && styles['warning-border']}`}
            placeholder="Email address"
            type="email"
          />
          <div>{errors?.email && <p className={styles.warning}>{errors?.email?.message || 'Error!'}</p>}</div>
        </label>

        <label htmlFor="password" className={styles.label}>
          Password
          <input
            {...register('password', {
              required: 'This field is required.',
              minLength: {
                value: 6,
                message: 'Your password needs to be from 6 to 40 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password needs to be from 6 to 40 characters.',
              },
            })}
            className={`${styles.input} ${errors?.password && styles['warning-border']}`}
            placeholder="Password"
            type="password"
          />
          <div>{errors?.password && <p className={styles.warning}>{errors?.password?.message || 'Error!'}</p>}</div>
        </label>

        <label htmlFor="image" className={styles.label}>
          Avatar image (url)
          <input
            {...register('image', {
              pattern: {
                value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/,
                message: 'Link to the image needs to be correct.',
              },
            })}
            className={`${styles.input} ${errors?.image && styles['warning-border']}`}
            placeholder="Avatar image"
          />
          <div>{errors?.image && <p className={styles.warning}>{errors?.image?.message || 'Error!'}</p>}</div>
        </label>

        <div>
          {(error && <p className={styles.warning}>A user with the same username or email already exists.</p>) ||
            (!dirty && <p className={styles.warning}>The data has not changed.</p>)}
          <button type="submit" className={styles.submit} name="submit" disabled={!isValid}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
