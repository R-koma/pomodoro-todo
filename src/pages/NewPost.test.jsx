import { it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewPost from './NewPost';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

afterEach(() => vi.clearAllMocks());

it('requiredフィールドとsubmitsをバリデートする', async () => {
  globalThis.fetch.mockResolvedValueOnce({ ok: true });

  render(
    <MemoryRouter>
      <NewPost />
    </MemoryRouter>,
  );

  fireEvent.click(screen.getByRole('button', { name: '投稿' }));
  expect(await screen.findByText(/タイトルは必須/)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/タイトル/), {
    target: { value: 'Hi' },
  });
  fireEvent.change(screen.getByLabelText(/本文/), {
    target: { value: 'body' },
  });
  fireEvent.click(screen.getByRole('button', { name: '投稿' }));

  await waitFor(() => expect(globalThis.fetch).toHaveBeenCalledTimes(1));
});
