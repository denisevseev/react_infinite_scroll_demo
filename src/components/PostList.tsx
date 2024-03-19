
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Post.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
      const newPosts = await response.json();
      setPosts(prev => [...prev, ...newPosts]);
    };
    
    loadPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page <= 5) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 1.0 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [page]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className={styles.post} onClick={() => history.push(`/post/${post.id}`)}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      {page <= 5 && <div ref={loader}>Загрузка...</div>}
    </div>
  );
};

export default PostList;
