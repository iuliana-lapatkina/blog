import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { message } from 'antd';

import { addUser } from '../../services/blogService';
import { savePassword, deleteAvatar } from '../../store/blogSlice';

import styles from './SignUp.module.scss';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState(false);

  const fromPage = location.state?.from?.pathname || '/';

  const success = () => {
    message.info('You have successfully sign up');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'all',
  });

  const onSubmit = (data) => {
    const userPassword = data.password;
    localStorage.setItem('password', userPassword);
    dispatch(savePassword(userPassword));
    dispatch(addUser([data.username, data.email, data.password])).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        deleteAvatar();
        success();
        navigate(fromPage);
      }
      if (res.meta.requestStatus === 'rejected') {
        setError(true);
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create new account</h2>
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
            type="text"
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

        <label htmlFor="confirmPassword" className={styles.label}>
          Repeat password
          <input
            {...register('confirmPassword', {
              validate: (value) => value === watch('password'),
            })}
            className={`${styles.input} ${errors?.confirmPassword && styles['warning-border']}`}
            placeholder="Repeat password"
            type="password"
          />
          <div>
            {watch('password') !== watch('confirmPassword') && <p className={styles.warning}>Passwords must match</p>}
          </div>
        </label>

        <label htmlFor="approve" className={styles.approve}>
          <input className={styles.approve} type="checkbox" name="approve" required />
          <span>I agree to the processing of my personal information</span>
        </label>

        <div>
          {error && <p className={styles.warning}>A user with the same username or email already exists.</p>}
          <button type="submit" className={styles.submit} name="submit">
            Create
          </button>
        </div>

        <div className={styles['sign-in']}>
          <span>Already have an account?</span>
          <Link to="/sign-in"> Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
