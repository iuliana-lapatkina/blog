import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

import styles from './ErrorPage.module.scss';

function ErrorPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button className={styles['home-button']} type="button">
            Go home
          </Button>
        </Link>
      }
    />
  );
}

export default ErrorPage;
