import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import PropTypes from 'prop-types';

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}?_sort=createdAt&_order=desc`,
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching posts');

        const data = await res.json();
        setPosts(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="m-4 text-3xl font-bold underline">ミニSNS</h1>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <ul>
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </ul>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

function Loader() {
  return <p>Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p>
      <span>⛔️</span>
      {message}
    </p>
  );
}
