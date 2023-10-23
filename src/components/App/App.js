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
import NewArticle from '../NewArticle';
import ErrorPage from '../ErrorPage';
import RequireAuth from '../../hoc/RequireAuth';
import { saveData } from '../../store/blogSlice';
import { signIn } from '../../services/blogService';

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    const userName = localStorage.getItem('username');
    const userMail = localStorage.getItem('email');
    const userImage = localStorage.getItem('image');
    const userPassword = localStorage.getItem('password');
    dispatch(saveData({ userToken, userName, userMail, userPassword, userImage }));
    dispatch(signIn([userMail, userPassword, userToken]));
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
            <Route
              path="/articles/:id/edit"
              element={
                <RequireAuth>
                  <NewArticle />
                </RequireAuth>
              }
            />
            <Route
              path="/new-article"
              element={
                <RequireAuth>
                  <NewArticle />
                </RequireAuth>
              }
            />
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
