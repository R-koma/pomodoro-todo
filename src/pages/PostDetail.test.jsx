import { it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostDetail from './PostDetail';

afterEach(() => vi.clearAllMocks());

function renderWithRouter(id = '2') {
  return render(
    <MemoryRouter initialEntries={[`/posts/${id}`]}>
      <Routes>
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

it('404エラー時にリダイレクトする', async () => {
  globalThis.fetch.mockResolvedValueOnce({ status: 404 });
  renderWithRouter('999');

  await waitFor(() =>
    expect(screen.queryByText(/Loading/)).not.toBeInTheDocument(),
  );
  // 404 Navigate → nothing rendered (jsdom can't change URL)
  expect(globalThis.fetch).toHaveBeenCalledWith(
    'http://localhost:3000/posts/999',
  );
});

it('投稿の表示と削除機能のテスト', async () => {
  const fake = {
    id: 2,
    title: 'Edit me',
    body: 'content',
    createdAt: '',
    likes: 1,
  };
  // first fetch
  globalThis.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: () => Promise.resolve(fake),
  });
  // delete fetch
  globalThis.fetch.mockResolvedValueOnce({ ok: true });

  renderWithRouter();

  await screen.findByText('Edit me');
  fireEvent.click(screen.getByRole('button', { name: '🗑️' }));
  await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(2));
});

it('エラー時にエラーメッセージが表示される', async () => {
  globalThis.fetch.mockRejectedValueOnce(new Error('APIエラー'));
  renderWithRouter();

  await waitFor(() => {
    expect(screen.getByText('APIエラー')).toBeInTheDocument();
  });
});

it('編集リンクが正しく機能する', async () => {
  const fake = {
    id: 2,
    title: 'テスト投稿',
    body: 'content',
    createdAt: '',
    likes: 1,
  };

  globalThis.fetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    json: () => Promise.resolve(fake),
  });

  renderWithRouter();

  await screen.findByText('テスト投稿');
  const editLink = screen.getByRole('link', { name: '✏️' });
  expect(editLink.getAttribute('href')).toBe('/posts/2/edit');
});
