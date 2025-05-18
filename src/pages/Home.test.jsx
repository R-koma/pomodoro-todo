import { BrowserRouter } from 'react-router-dom';
import { it, expect, vi, afterEach } from 'vitest';
import Home from './Home';
import { render, screen, waitFor } from '@testing-library/react';

const apiURL = 'http://localhost:3000/posts?_sort=createdAt&_order=desc';

afterEach(() => vi.clearAllMocks());

it('フェッチ後に投稿を表示する', async () => {
  const falePosts = [{ id: 1, title: 'A', body: 'B', createdAt: '', likes: 0 }];
  globalThis.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(falePosts),
  });

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledWith(apiURL));
  expect(screen.getByText('A')).toBeInTheDocument();
});
