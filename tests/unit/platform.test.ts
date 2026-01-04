import { describe, it, expect } from 'vitest';
import { IS_MAC, IS_WIN, IS_LINUX } from '@/utils/platform';

describe('Platform Detection', () => {
  // Note: These tests verify the platform detection logic is correctly
  // derived from process.platform. The actual values will depend on
  // the platform running the tests.

  it('should have IS_MAC, IS_WIN, and IS_LINUX as booleans', () => {
    expect(typeof IS_MAC).toBe('boolean');
    expect(typeof IS_WIN).toBe('boolean');
    expect(typeof IS_LINUX).toBe('boolean');
  });

  it('should have exactly one platform as true (mutually exclusive)', () => {
    const trueCount = [IS_MAC, IS_WIN, IS_LINUX].filter(Boolean).length;
    // On a standard platform, exactly one should be true
    // On unsupported platforms, all could be false
    expect(trueCount).toBeLessThanOrEqual(1);
  });

  it('should match current process.platform', () => {
    const platform = process.platform;

    if (platform === 'darwin') {
      expect(IS_MAC).toBe(true);
      expect(IS_WIN).toBe(false);
      expect(IS_LINUX).toBe(false);
    } else if (platform === 'win32') {
      expect(IS_MAC).toBe(false);
      expect(IS_WIN).toBe(true);
      expect(IS_LINUX).toBe(false);
    } else if (platform === 'linux') {
      expect(IS_MAC).toBe(false);
      expect(IS_WIN).toBe(false);
      expect(IS_LINUX).toBe(true);
    }
  });

  it('IS_MAC should be true on darwin platform', () => {
    // This test documents the expected behavior
    expect(IS_MAC).toBe(process.platform === 'darwin');
  });

  it('IS_WIN should be true on win32 platform', () => {
    expect(IS_WIN).toBe(process.platform === 'win32');
  });

  it('IS_LINUX should be true on linux platform', () => {
    expect(IS_LINUX).toBe(process.platform === 'linux');
  });
});
