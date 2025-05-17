import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [post, setPost] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/posts/${id}`);
        if (!res.ok) throw new Error('Something went wrong with fetching post');

        const data = await res.json();
        setPost(data);
        setTitle(data.title);
        setBody(data.body);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = 'タイトルは必須です。';
    if (title.length > 50) errs.title = 'タイトルは50字以内です。';
    if (!body.trim()) errs.body = '本文は必須です。';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...post,
          title: title.trim(),
          body: body.trim(),
        }),
      });
      if (!res.ok) throw new Error(res.statusText);
      navigate(`/posts/${id}`);
    } catch (err) {
      setApiError('更新に失敗しました: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) return <Loader />;
  if (apiError) return <div className="text-red-500">{apiError}</div>;

  return (
    <section className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">編集</h1>

      {apiError && <p className="mb-4 text-red-500">{apiError}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block font-medium" htmlFor="title">
            タイトル
          </label>
          <input
            id="title"
            type="text"
            maxLength={50}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border p-2"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block font-medium" htmlFor="body">
            本文
          </label>
          <textarea
            id="body"
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full resize-y rounded border p-2"
          />
          {errors.body && <p className="text-sm text-red-500">{errors.body}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          {submitting ? '更新中...' : '更新'}
        </button>
      </form>
    </section>
  );
}
