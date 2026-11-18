import { describe, expect, it } from 'vitest';
import { daysLeft, money, refundWindow } from './api';

describe('formatting', () => {
  it('formats money with two decimals and unknown tokens shortened', () => {
    expect(money('500000000', 'CABCDEF')).toBe('50.00 CABC…');
    expect(money('1', 'CABCDEF')).toBe('0.0000001 CABC…');
  });
  it('formats time left', () => {
    const now = Date.parse('2026-11-02T00:00:00Z');
    expect(daysLeft('2026-11-05T00:00:00Z', now)).toBe('3d left');
    expect(daysLeft('2026-11-02T05:00:00Z', now)).toBe('5h left');
    expect(daysLeft('2026-11-01T00:00:00Z', now)).toBe('deadline passed');
  });
  it('keeps refund unavailable until the deadline grace period ends', () => {
    const deadline = '2026-11-02T00:00:00Z';
    expect(refundWindow(deadline, 72 * 3600e3, Date.parse('2026-11-04T00:00:00Z'))).toEqual({ open: false, label: 'Refund available in 1d' });
    expect(refundWindow(deadline, 72 * 3600e3, Date.parse('2026-11-05T00:00:00Z')).open).toBe(true);
  });
});
