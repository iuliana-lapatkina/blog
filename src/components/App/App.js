import { Routes, Route } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';
import { Alert } from 'antd';

import Layout from '../Layout';
import Articles from '../Articles';
import Article from '../Article';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Online>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Articles />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route path="*" element={<div>Not found</div>} />
          </Route>
        </Routes>
      </Online>
      <Offline>
        <div className={styles.container}>
          <Alert
            className={styles.offline}
            description="You are offline. Please check your internet connection"
            type="error"
            showIcon
          />
        </div>
      </Offline>
    </div>
  );
}

export default App;
