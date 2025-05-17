import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  async function handleDelete(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Something went wrong with handleDelete');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loader />;
  if (error === 'not_found') return <Navigate to="/404" replace />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return null;

  return (
    <article className="mx-auto flex max-w-2xl flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <Link
          to={`/posts/${id}/edit`}
          className="h-fit rounded bg-gray-500 px-2 py-1 text-sm text-white hover:bg-gray-600"
        >
          ✏️
        </Link>
        <button
          onClick={handleDelete}
          className="h-fit rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-gray-600"
        >
          🗑️
        </button>
      </div>
      <div className="mb-6 flex items-center justify-between text-gray-500">
        <time>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</time>
        <span>❤️ {post.likes}</span>
      </div>
      <p className="mb-8 whitespace-pre-wrap text-gray-700">{post.body}</p>
      <div className="flex justify-center">
        <Link
          to={'/'}
          className="h-fit rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600"
        >
          戻る
        </Link>
      </div>
    </article>
  );
}
