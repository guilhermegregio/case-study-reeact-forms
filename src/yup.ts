import * as yup from 'yup'
import * as dateFns from 'date-fns'
import { cpfOrCnpjMask, currencyMask, dateMask, phoneMask } from './masks'
import { isValidCPF, isValidPhone } from '@brazilian-utils/brazilian-utils';

declare module 'yup' {
  interface StringSchema {
    date(): this;
    cpfOrCnpj(): this;
    phone(): this;
  }

  interface NumberSchema {
    currency(): this;
  }
}

yup.addMethod(yup.string, 'date', function() {
  return this
    .transform(dateMask.transform)
    .test('validateDate', 'Invalid date', (value = '') => {
      return dateFns.isValid(dateFns.parse(value, "yyyy-MM-dd", new Date()));
    });
});

yup.addMethod(yup.string, 'cpfOrCnpj', function() {
  return this
    .transform(cpfOrCnpjMask.transform)
    .test('validateCpfOrCnpj', "Invalid cpf or cnpj", (value = '') => {
      return isValidCPF(value)
    });
});

yup.addMethod(yup.string, 'phone', function() {
  return this
    .transform(phoneMask.transform)
    .test("validatePhone", "Invalid phone", (value = '') => {
      return isValidPhone(value)
    });
});

yup.addMethod(yup.number, 'currency', function() {
  return this.transform((_, inputValue) => currencyMask.transform(inputValue))
})

export * from 'yup'
