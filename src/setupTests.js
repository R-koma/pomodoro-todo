import '@testing-library/jest-dom';
import { vi } from 'vitest';

// すべての fetch をモック。各テスト内で vi.mockedFetch.mockResolvedValue(..)
globalThis.fetch = vi.fn();
