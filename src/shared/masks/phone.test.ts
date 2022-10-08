import { describe, it, expect } from 'vitest';
import { phoneMask } from './phone';

describe('phone mask', () => {
  it('masked mobile phone', () => {
    const maskedPhone = phoneMask.mask('11992489377')
    expect(maskedPhone).toBe('+55 11 99248-9377');
  });

  it('masked landline phone', () => {
    const maskedPhone = phoneMask.mask('1158410481')
    expect(maskedPhone).toBe('+55 11 5841-0481');
  });
});

describe('phone unmask', () => {
  it('unmasked mobile phone', () => {
    const maskedPhone = phoneMask.unmask('+55 11 99248-9377')
    expect(maskedPhone).toBe('11992489377');
  });

  it('unmasked landline phone', () => {
    const maskedPhone = phoneMask.unmask('+55 11 5841-0481')
    expect(maskedPhone).toBe('1158410481');
  });
});
