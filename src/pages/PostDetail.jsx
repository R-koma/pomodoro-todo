import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(`${import.meta.env.VITE_API_BASE}/posts/${id}`);
        if (res.status === 404) {
          setError('not_found');
          return;
        }
        if (!res.ok) throw new Error('Something went wrong with fetching post');

        const data = await res.json();
        setPost(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) return <Loader />;
  if (error === 'not_found') return <Navigate to="/404" replace />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return null;

  return (
    <article className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <div className="mb-6 flex items-center justify-between text-gray-500">
        <time>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</time>
        <span>❤️ {post.likes}</span>
      </div>
      <p className="whitespace-pre-wrap text-gray-700">{post.body}</p>
    </article>
  );
}
