import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

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
      const res = await fetch(import.meta.env.VITE_API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          createdAt: new Date().toLocaleDateString('ja-JP'),
          likes: 0,
        }),
      });
      if (!res.ok) throw new Error(res.statusText);
      navigate('/');
    } catch (err) {
      setApiError('投稿に失敗しました: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">新規投稿</h1>

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
          <p className="ml-auto text-xs text-gray-500">{title.length}/50</p>
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
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          {submitting ? '投稿中...' : '投稿'}
        </button>
      </form>
    </section>
  );
}
