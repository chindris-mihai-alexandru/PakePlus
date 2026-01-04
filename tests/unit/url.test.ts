import { describe, it, expect } from 'vitest';
import { getDomain, appendProtocol, normalizeUrl } from '@/utils/url';

describe('getDomain', () => {
  it('should extract domain from a simple URL', () => {
    expect(getDomain('https://example.com')).toBe('example');
  });

  it('should extract domain from URL with path', () => {
    expect(getDomain('https://example.com/path/to/page')).toBe('example');
  });

  it('should extract domain from URL with subdomain', () => {
    expect(getDomain('https://www.example.com')).toBe('example');
  });

  it('should extract domain from URL with multiple subdomains', () => {
    expect(getDomain('https://blog.docs.example.com/page')).toBe('example');
  });

  it('should extract domain from URL with port', () => {
    expect(getDomain('https://example.com:8080/page')).toBe('example');
  });

  it('should extract domain from URL with query string', () => {
    expect(getDomain('https://example.com?query=value')).toBe('example');
  });

  it('should handle real-world domains', () => {
    expect(getDomain('https://github.com/user/repo')).toBe('github');
    expect(getDomain('https://www.google.com/search?q=test')).toBe('google');
    expect(getDomain('https://docs.microsoft.com/en-us/')).toBe('microsoft');
  });

  it('should handle country-code TLDs', () => {
    expect(getDomain('https://example.co.uk')).toBe('example');
    expect(getDomain('https://example.com.au')).toBe('example');
  });

  it('should return null for invalid URL', () => {
    expect(getDomain('not a url')).toBe(null);
  });

  it('should return null for empty string', () => {
    expect(getDomain('')).toBe(null);
  });

  it('should return null for localhost', () => {
    // localhost doesn't have a domain in PSL sense
    expect(getDomain('http://localhost:3000')).toBe(null);
  });

  it('should return first octet for IP address URLs (PSL behavior)', () => {
    // PSL parses IP addresses by extracting the first segment
    expect(getDomain('http://192.168.1.1:8080')).toBe('1');
  });
});

describe('appendProtocol', () => {
  it('should return URL unchanged if it has https protocol', () => {
    expect(appendProtocol('https://example.com')).toBe('https://example.com');
  });

  it('should return URL unchanged if it has http protocol', () => {
    expect(appendProtocol('http://example.com')).toBe('http://example.com');
  });

  it('should append https to URL without protocol', () => {
    expect(appendProtocol('example.com')).toBe('https://example.com');
  });

  it('should append https to URL with path but no protocol', () => {
    expect(appendProtocol('example.com/path')).toBe('https://example.com/path');
  });

  it('should handle www prefix without protocol', () => {
    expect(appendProtocol('www.example.com')).toBe('https://www.example.com');
  });

  it('should preserve query strings when adding protocol', () => {
    expect(appendProtocol('example.com?foo=bar')).toBe(
      'https://example.com?foo=bar',
    );
  });

  it('should handle file protocol', () => {
    expect(appendProtocol('file:///path/to/file.html')).toBe(
      'file:///path/to/file.html',
    );
  });

  it('should handle ftp protocol', () => {
    expect(appendProtocol('ftp://ftp.example.com')).toBe(
      'ftp://ftp.example.com',
    );
  });
});

describe('normalizeUrl', () => {
  it('should return valid URL with protocol unchanged', () => {
    expect(normalizeUrl('https://example.com')).toBe('https://example.com');
  });

  it('should add https protocol to bare domain', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com');
  });

  it('should normalize URL with path', () => {
    expect(normalizeUrl('example.com/page')).toBe('https://example.com/page');
  });

  it('should preserve http protocol', () => {
    expect(normalizeUrl('http://example.com')).toBe('http://example.com');
  });

  it('should throw error for completely invalid URL', () => {
    expect(() => normalizeUrl('://invalid')).toThrow();
  });

  it('should handle URLs with special characters in path', () => {
    expect(normalizeUrl('example.com/path?q=hello%20world')).toBe(
      'https://example.com/path?q=hello%20world',
    );
  });

  it('should handle localhost with port as valid URL', () => {
    // localhost:3000 is already a valid URL pattern
    expect(normalizeUrl('localhost:3000')).toBe('localhost:3000');
  });

  it('should handle IP addresses', () => {
    expect(normalizeUrl('192.168.1.1:8080')).toBe('https://192.168.1.1:8080');
  });
});
