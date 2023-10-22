import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'antd';

import Layout from '../Layout';
import Articles from '../Articles';
import Article from '../Article';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';
import ErrorPage from '../ErrorPage';
import RequireAuth from '../../hoc/RequireAuth';
import { saveData } from '../../store/blogSlice';

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.length !== 0) {
      const userToken = localStorage.getItem('token');
      const userName = localStorage.getItem('token');
      const userMail = localStorage.getItem('token');
      dispatch(saveData(userToken, userName, userMail));
    }
  }, []);

  return (
    <div className={styles.app}>
      <Online>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Articles />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route path="*" element={<ErrorPage />} />
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
