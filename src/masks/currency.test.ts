import { describe, it, expect } from 'vitest';
import { currencyMask } from './currency';

describe('currency mask', () => {
  it('masks value', () => {
    const masked = currencyMask.mask('1000')
    expect(masked).toBe('R$ 1.000');
  });

  it('unmasks value', () => {
    const masked = currencyMask.transform('R$ 1.000')
    expect(masked).toBe(1000);
  });
});

