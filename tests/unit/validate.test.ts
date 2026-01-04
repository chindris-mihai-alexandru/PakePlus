import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import { validateNumberInput, validateUrlInput } from '@/utils/validate';
import { InvalidArgumentError } from 'commander';

// Mock fs.existsSync
vi.mock('fs');

describe('validateNumberInput', () => {
  it('should parse valid integer string', () => {
    expect(validateNumberInput('42')).toBe(42);
  });

  it('should parse valid float string', () => {
    expect(validateNumberInput('3.14')).toBe(3.14);
  });

  it('should parse negative numbers', () => {
    expect(validateNumberInput('-10')).toBe(-10);
  });

  it('should parse zero', () => {
    expect(validateNumberInput('0')).toBe(0);
  });

  it('should parse scientific notation', () => {
    expect(validateNumberInput('1e5')).toBe(100000);
  });

  it('should throw InvalidArgumentError for non-numeric string', () => {
    expect(() => validateNumberInput('abc')).toThrow(InvalidArgumentError);
    expect(() => validateNumberInput('abc')).toThrow('Not a number.');
  });

  it('should return NaN check for empty string (Number("") = 0)', () => {
    // Number('') returns 0, not NaN, so it passes validation
    expect(validateNumberInput('')).toBe(0);
  });

  it('should throw for mixed alphanumeric', () => {
    expect(() => validateNumberInput('12abc')).toThrow(InvalidArgumentError);
  });

  it('should throw for special characters', () => {
    expect(() => validateNumberInput('$100')).toThrow(InvalidArgumentError);
  });
});

describe('validateUrlInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return local file path if file exists', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    expect(validateUrlInput('/path/to/file.html')).toBe('/path/to/file.html');
    expect(fs.existsSync).toHaveBeenCalledWith('/path/to/file.html');
  });

  it('should normalize URL if file does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    expect(validateUrlInput('https://example.com')).toBe('https://example.com');
  });

  it('should add protocol to bare domain', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    expect(validateUrlInput('example.com')).toBe('https://example.com');
  });

  it('should throw InvalidArgumentError for invalid URL when file does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    expect(() => validateUrlInput('://invalid')).toThrow(InvalidArgumentError);
  });

  it('should handle URL with path', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    expect(validateUrlInput('example.com/page')).toBe(
      'https://example.com/page',
    );
  });

  it('should handle relative file path that exists', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    expect(validateUrlInput('./index.html')).toBe('./index.html');
  });
});
