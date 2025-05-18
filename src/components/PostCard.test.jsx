import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PostCard from './PostCard';

const mock = {
  id: 1,
  title: 'Hello',
  body: 'World',
  createdAt: '2025-05-01T00:00:00Z',
  likes: 3,
};

it('title, body, likes & linkをレンダリングする', () => {
  render(
    <BrowserRouter>
      <PostCard post={mock} />
    </BrowserRouter>,
  );

  expect(screen.getByText('Hello')).toBeInTheDocument();
  expect(screen.getByText('World')).toBeInTheDocument();
  expect(screen.getByText('❤️ 3')).toBeInTheDocument();
  // link href check
  expect(screen.getByRole('link')).toHaveAttribute('href', '/posts/1');
});
