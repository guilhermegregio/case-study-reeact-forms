import { describe, it, expect } from 'vitest';
import { dateMask } from './date';

describe('data mask', () => {
  it('masks input value', () => {
    const masked = dateMask.mask('13031986')
    expect(masked).toBe('13/03/1986')
  })


  it('masks api value', () => {
    const masked = dateMask.maskDefault('1986-03-13')
    expect(masked).toBe('13/03/1986')
  })
})


describe('data unmask', () => {
  it('unmasks input value', () => {
    const masked = dateMask.unmask('13/03/1986')
    expect(masked).toBe('13031986')
  })


  it('unmasks to api', () => {
    const masked = dateMask.transform('13/03/1986')
    expect(masked).toBe('1986-03-13')
  })
})
