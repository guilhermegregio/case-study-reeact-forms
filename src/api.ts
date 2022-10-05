import { useQuery, useMutation, useQueryClient, UseQueryResult } from 'react-query';
import { cpfOrCnpjMask, currencyMask, dateMask, phoneMask } from './masks';
import { FormValues } from './schema';

let data: FormValues = {
  range: 5000,
  email: 'guilherme@gregio.net',
  currency: 1000,
  phone: '11992489377',
  cpfOrCnpj: '32908011875',
  date: '1986-03-13',
  checkbox: true,
  checkboxs: ['check1'],
  radio: 'option-1',
  select: '',
  textarea: ''
}

const apiGetService = async () => {
  return Promise.resolve(data)
}

const apiPostService = async (formData: FormValues) => {
  data = { ...formData }
  return Promise.resolve(data)
}

export const useApiGetValues = (): UseQueryResult<FormValues, Error> => {
  return useQuery('API_GET_SERVICE', apiGetService);
};

export const useApiPostValues = () => {
  const queryClient = useQueryClient()

  return useMutation(apiPostService, {
    onSuccess: (apiData) => {
      queryClient.setQueryData('API_GET_SERVICE', apiData)
    }
  });
};

export const adapterToForm = (apiData: FormValues) => {
  const date = dateMask.maskDefault(apiData.date)
  const currency = currencyMask.maskDefault(apiData.currency)
  const phone = phoneMask.maskDefault(apiData.phone)
  const cpfOrCnpj = cpfOrCnpjMask.maskDefault(apiData.cpfOrCnpj)

  return { ...apiData, date, currency, phone, cpfOrCnpj }
}

