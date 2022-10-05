import { describe, it, expect } from 'vitest';
import { ValidationError } from 'yup';
import { formSchema, FormValues } from './schema';

function unsafeValue<T>(value: unknown): T {
  return value as T
}

describe('form schema', () => {
  describe('valid values', () => {
    const formValues: FormValues = {
      range: 5000,
      email: 'valid-email@gmail.com',
      date: '13/03/1986',
      cpfOrCnpj: '329.080.118-75',
      phone: '+55 11 99292-9377',
      currency: unsafeValue('R$ 100000'),
      select: 'option-5',
      textarea: 'xpto lorem',
      radio: 'option-3',
      checkboxs: ['check1'],
      checkbox: true,
    }

    it('validate schama valuesschema', async () => {
      const values = formSchema.cast(formValues)
      await expect(formSchema.validate(formValues)).resolves.toEqual(values);
    });
  })

  describe('invalid values', () => {
    const invalidFormValues: FormValues = {
      range: 5000,
      email: 'invalid-email.com',
      date: '13/13/1986',
      cpfOrCnpj: '329.080.118-70',
      phone: '+55 11 11111-1111',
      currency: unsafeValue('R$ 100'),
      select: 'option-5',
      textarea: 'xpto lorem',
      radio: 'option-3',
      checkboxs: ['check1'],
      checkbox: true,
    }

    it('invalid email value with schema', async () => {
      await expect(formSchema.validateAt('email', invalidFormValues)).rejects.toEqual(new ValidationError('email must be a valid email'));
    });

    it('invalid currency value with schema', async () => {
      await expect(formSchema.validateAt('currency', invalidFormValues)).rejects.toEqual(new ValidationError('currency must be greater than or equal to 1000'));
    });

    it.only('invalid date value with schema', async () => {
      await expect(formSchema.validateAt('date', invalidFormValues)).rejects.toEqual(new ValidationError('Invalid time value'));
    });

    it('invalid cpf value with schema', async () => {
      await expect(formSchema.validateAt('cpfOrCnpj', invalidFormValues)).rejects.toEqual(new ValidationError('Invalid cpf or cnpj'));
    });

    it('invalid phone value with schema', async () => {
      await expect(formSchema.validateAt('phone', invalidFormValues)).rejects.toEqual(new ValidationError('Invalid phone'));
    });
  })
});

