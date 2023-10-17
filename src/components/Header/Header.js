import React from 'react';
import { Button } from 'antd';

import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>Realworld Blog</span>
      <Button className={`${styles['sign-in-button']} ${styles['sign-button']}`} type="text">
        Sign in
      </Button>
      <Button className={`${styles['sign-up-button']} ${styles['sign-button']}`}>Sign up</Button>
    </header>
  );
}

export default Header;
