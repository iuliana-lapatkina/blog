import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CloseOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';

import { signIn } from '../../services/blogService';
import { savePassword } from '../../store/blogSlice';

import styles from './SignIn.module.scss';

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';

  const dispatch = useDispatch();
  const token = useSelector((state) => state.blog.token);
  const userEmail = useSelector((state) => state.blog.email);

  const [error, setError] = useState(false);

  const success = () => {
    message.info('You have successfully sign in');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: userEmail,
    },
  });

  const onSubmit = (data) => {
    localStorage.setItem('password', data.password);
    dispatch(savePassword(data.password));
    dispatch(signIn([data.email, data.password, token])).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        success();
        navigate(fromPage, { replace: true });
      }
      if (res.meta.requestStatus === 'rejected') {
        setError(true);
      }
    });
  };

  const goBack = () => navigate(-1);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <Button onClick={goBack} className={styles['close-button']}>
        <CloseOutlined style={{ fontSize: '25px' }} />
      </Button>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

        <div>
          {error && <p className={styles.warning}>The username or password is incorrect.</p>}
          <button type="submit" className={styles.submit} name="submit">
            Login
          </button>
        </div>

        <div className={styles['sign-up']}>
          <span>Don’t have an account?</span>
          <Link to="/sign-up"> Sign Up.</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
