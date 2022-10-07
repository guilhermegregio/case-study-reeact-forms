import * as yup from '@/shared/utils/yup'

export const formSchema = yup.object({
  range: yup.number().required(),
  email: yup.string().email().required(),
  date: yup.string().date().required(),
  cpfOrCnpj: yup.string().cpfOrCnpj().required(),
  phone: yup.string().phone().required(),
  currency: yup.number().currency().min(1000).required(),
  select: yup.string().optional(),
  textarea: yup.string().optional(),
  radio: yup.string().ensure().oneOf(['option-1', 'option-2', 'option-3'], 'Deve ser um desses valores').required(),
  checkboxs: yup.array().ensure().of(yup.string().required()).test('validateCheckbox', "Invalid checkbox required", (values = []) => {
    return ['check1', 'check2'].some(value => values.includes(value))
  }).required(),
  checkbox: yup.bool().oneOf([true], 'Deve ser selecionado').defined(),
})

export type FormValues = yup.InferType<typeof formSchema>

