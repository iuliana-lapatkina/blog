import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { getArticles } from '../../services/blogService';
import { getPage, changeSingle } from '../../store/blogSlice';
import Article from '../Article/Article';

import styles from './Articles.module.scss';

function Articles() {
  const dispatch = useDispatch();

  const articles = useSelector((state) => state.blog.articleList);
  const count = useSelector((state) => state.blog.countPages);
  const page = useSelector((state) => state.blog.currentPage);

  useEffect(() => {
    dispatch(getArticles(page));
  }, [page, dispatch]);

  const elements = articles.map((item) => (
    <Link key={uuidv4()} to={`/articles/${item.slug}`}>
      <Article articleInList={item} />
    </Link>
  ));

  return (
    <>
      <div className={styles.articlesList}>{elements}</div>
      <Pagination
        className={styles.pagination}
        showSizeChanger={false}
        defaultCurrent={1}
        pageSize={5}
        current={page}
        total={Math.ceil(count) - 5}
        onChange={(value) => dispatch(getPage(value))}
      />
    </>
  );
}

export default Articles;