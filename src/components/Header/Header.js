import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { logOut } from '../../store/blogSlice';
import avatar from '../Article/user.jpg';

import styles from './Header.module.scss';

function Header() {
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.blog.isLogged);
  const username = useSelector((state) => state.blog.username);
  const image = useSelector((state) => state.blog.image);

  const logOutUser = () => {
    dispatch(logOut(false));
  };

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        <h1>Realworld Blog</h1>
      </Link>
      {!isLogged ? (
        <>
          <Link to="/sign-in">
            <Button className={styles['sign-in-button']} type="button">
              Sign in
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button className={styles['sign-up-button']} type="button">
              Sign up
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/">
            <Button className={styles['create-button']} type="button">
              Create Article
            </Button>
          </Link>
          <Link to="/profile">
            <Button className={styles['profile-button']} type="button">
              <span>{username}</span>
              <img src={image || avatar} alt="User's avatar" />
            </Button>
          </Link>
          <Link to="/">
            <Button className={styles['log-out-button']} type="button" onClick={logOutUser}>
              Log Out
            </Button>
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
