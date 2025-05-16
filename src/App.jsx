import { BrowserRouter, Route, Routes, Link } from 'react-router';
import Home from './pages/Home';
import NewPost from './pages/NewPost';

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
      </Routes>
    </BrowserRouter>
  );
}
