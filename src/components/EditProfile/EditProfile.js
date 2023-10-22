import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { getUser, editProfile } from '../../services/blogService';

import styles from './EditProfile.module.scss';

function EditProfile() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.blog.token);
  const userName = useSelector((state) => state.blog.username);
  const userEmail = useSelector((state) => state.blog.email);
  const userImage = useSelector((state) => state.blog.image);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'all',
    defaultValues: {
      username: userName,
      email: userEmail,
      image: userImage,
    },
  });

  useEffect(() => {
    dispatch(getUser(token));
  });

  const onSubmit = (data) => {
    dispatch(editProfile([data.username, data.email, data.password, data.image, token]));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Profile</h2>
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

        <button type="submit" className={styles.submit} name="submit" disabled={!isValid}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
