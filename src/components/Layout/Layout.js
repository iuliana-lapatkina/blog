import { Link, Outlet } from 'react-router-dom';

import Header from '../Header';

import styles from './Layout.module.scss';

function Layout() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
