import { describe, it, expect } from 'vitest';
import { cpfOrCnpjMask } from './cpfOrCnpj';

describe('cpf mask', () => {
  it('masks value', () => {
    const masked = cpfOrCnpjMask.mask('13329381086')

    expect(masked).toBe('133.293.810-86');
  });

  it('unmasks value', () => {
    const masked = cpfOrCnpjMask.unmask('133.293.810-86')

    expect(masked).toBe('13329381086');
  });
});

describe('cnpj mask', () => {
  it('masks value', () => {
    const masked = cpfOrCnpjMask.mask('79517456000183')

    expect(masked).toBe('79.517.456/0001-83');
  });

  it('unmasks value', () => {
    const masked = cpfOrCnpjMask.unmask('79.517.456/0001-83')

    expect(masked).toBe('79517456000183');
  });
});

