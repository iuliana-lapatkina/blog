import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';

import { createArticle, editArticle, getSingleArticle } from '../../services/blogService';

import styles from './NewArticle.module.scss';

function NewArticle() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.blog.token);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (id) {
      dispatch(getSingleArticle(id));
    }
  }, [id]);

  const article = useSelector((state) => state.blog.currentArticle);
  const articleTitle = article.title;
  const articleDescription = article.description;
  const articleBody = article.body;
  const tag = article.tagList.map((item) => {
    return { name: item };
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: id ? articleTitle : '',
      description: id ? articleDescription : '',
      text: id ? articleBody : '',
      tags: id && tag.length > 0 ? tag : [{ name: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const onSubmit = (data) => {
    const tagslist = data.tags.map((item) => {
      return item.name.replace(/  +/g, ' ');
    });
    const tags = tagslist.filter((item, index) => {
      return tagslist.indexOf(item) === index;
    });
    const title = data.title.replace(/  +/g, ' ');
    const description = data.description.replace(/\s/g, ' ');
    const text = data.text.replace(/  +/g, ' ');

    if (id) {
      dispatch(editArticle([title, description, text, tags, token, id]));
    } else {
      dispatch(createArticle([title, description, text, tags, token]));
    }
  };

  return (
    <div className={styles.container}>
      {!id ? <h2 className={styles.title}>Create new article</h2> : <h2 className={styles.title}>Edit article</h2>}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title" className={styles.label}>
          Title
          <input
            {...register('title', {
              required: 'This field is required.',
              maxLength: {
                value: 5000,
                message: 'Title needs to be less than 5000 characters.',
              },
            })}
            className={`${styles.input} ${errors?.title && styles['warning-border']}`}
            placeholder="Title"
          />
          <div>{errors?.title && <p className={styles.warning}>{errors?.title?.message || 'Error!'}</p>}</div>
        </label>

        <label htmlFor="description" className={styles.label}>
          Short description
          <input
            {...register('description', {
              required: 'This field is required.',
              maxLength: {
                value: 5000,
                message: 'Title needs to be less than 5000 characters.',
              },
            })}
            className={`${styles.input} ${errors?.title && styles['warning-border']}`}
            placeholder="Short description"
          />
          <div>
            {errors?.description && <p className={styles.warning}>{errors?.description?.message || 'Error!'}</p>}
          </div>
        </label>

        <label htmlFor="text" className={styles.label}>
          Text
          <textarea
            {...register('text', {
              required: 'This field is required.',
            })}
            className={`${styles.textarea} ${styles.input} ${errors?.text && styles['warning-border']}`}
            placeholder="Text"
          />
          <div>{errors?.text && <p className={styles.warning}>{errors?.text?.message || 'Error!'}</p>}</div>
        </label>

        <div className={styles.tags}>
          <h3>Tags</h3>
          <ul className={styles['tag-list']}>
            {fields.map((field, index) => (
              <li key={field.id}>
                <input
                  {...register(`tags.${index}.name`, {
                    required: 'The tag name should not be empty.',
                    maxLength: {
                      value: 60,
                      message: 'Your tag needs to be no more than 60 characters.',
                    },
                  })}
                  placeholder="Tag"
                  className={`${styles['tag-input']} ${styles.input} ${
                    errors?.[`tags.${index}.name`] && styles['warning-border']
                  }`}
                />
                <button className={styles['delete-button']} type="button" onClick={() => remove(index)}>
                  Delete
                </button>
                <button className={styles['add-button']} type="button" onClick={() => append({ name: '' })}>
                  Add Tag
                </button>
                {errors.tags?.[index]?.name && (
                  <p className={styles.warning}>{errors.tags?.[index]?.name?.message || 'Error!'}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        {fields.length === 0 && (
          <button
            className={`${styles['add-button']} ${styles['single-add-button']}`}
            type="button"
            onClick={() => append({ name: '' })}
          >
            Add Tag
          </button>
        )}

        <button type="submit" className={styles.submit} name="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default NewArticle;
