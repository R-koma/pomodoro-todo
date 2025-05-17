import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default function PostCard({ post }) {
  const { id, title, body, createdAt, likes } = post;
  return (
    <li className="mb-4 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/posts/${id}`}>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-600">{body}</p>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <time>{new Date(createdAt).toLocaleDateString('ja-JP')}</time>
          <span>❤️ {likes}</span>
        </div>
      </Link>
    </li>
  );
}
