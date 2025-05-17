import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <header className="flex justify-between p-4 shadow">
        <h1 className="text-lg font-bold">
          <Link to="/">Mini SNS</Link>
        </h1>
        <Link
          to="/new"
          className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
        >
          投稿
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
