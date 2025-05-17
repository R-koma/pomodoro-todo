// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold text-gray-700">404 | Not Found</h1>
      <p className="text-gray-500">
        お探しのページは存在しないか、削除された可能性があります。
      </p>
      <Link
        to="/"
        className="rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
      >
        ホームに戻る
      </Link>
    </section>
  );
}
