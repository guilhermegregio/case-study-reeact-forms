import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { QueryClient, QueryClientProvider } from 'react-query'
import * as styles from './styles'
import { formSchema, FormValues } from "./schema";
import { cpfOrCnpjMask, currencyMask, dateMask, phoneMask } from "./masks";
import { adapterToForm, useApiGetValues, useApiPostValues } from "./api"


const identity = v => v

const queryClient = new QueryClient()

const Api = () => {
  const { data } = useApiGetValues()
  return (
    <pre className="my-8 text-white p-4">
      <p>Object sent to API.</p>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}


const Errors = ({ errors }: any) => (
  <pre className="my-8 text-white p-4 whitespace-pre-wrap">
    <p>Object off errors</p>
    <ul className="space-y-4">
      {Object.keys(errors).map((key: any) => (
        <li key={key}>{key}: {errors[key]?.message}</li>
      ))}
    </ul>
  </pre>
)


type FormProps = {
  data: FormValues
}


const useFormCustom = ({ defaultValues, resolver, onSubmit, masks }: any) => {
  const form = useForm<FormValues>({
    defaultValues,
    resolver,
  });

  const handleSubmit = form.handleSubmit(onSubmit)


  const register: typeof form.register = (name, opts) => {
    return form.register(name, {
      ...opts,
      onChange: (ev) => {
        masks[name]?.onChange?.(ev)
        opts?.onChange?.(ev)
        console.log(name, ev.currentTarget.value)
        return ev
      }
    })
  }

  return { ...form, handleSubmit, register }
}

const Form = ({ data }: FormProps) => {
  const { mutate } = useApiPostValues()

  const form = useFormCustom({
    defaultValues: data,
    resolver: yupResolver(formSchema),
    onSubmit: (data: any) => mutate(data),
    masks: {
      date: dateMask,
      cpfOrCnpj: cpfOrCnpjMask,
      phone: phoneMask,
      currency: currencyMask
    }
  });

  return (
    <div className="flex flex-row justify-center items-top space-x-4">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md w-96 my-8">
        <h1 className="text-1xl font-bold text-center my-8">React + Yup + IMask + React Hook Formt</h1>

        <form onSubmit={form.handleSubmit}>
          <div className="mb-6">
            <input type="range" className={styles.input} {...form.register('range')} />
          </div>

          <div className="mb-6">
            <input type="email" className={styles.input} placeholder="Email" {...form.register('email')} />
          </div>

          <div className="mb-6">
            <input type="text" className={styles.input} placeholder="Date" {...form.register('date')} />
          </div>

          <div className="mb-6">
            <input type="text" className={styles.input} placeholder="CPF or CNPJ" {...form.register('cpfOrCnpj')} />
          </div>

          <div className="mb-6">
            <input type="text" className={styles.input} placeholder="Phone" {...form.register('phone')} />
          </div>

          <div className="mb-6">
            <input type="text" className={styles.input} placeholder="Currency" {...form.register('currency')} />
          </div>

          <div className="mb-6">
            <select className={styles.input} {...form.register('select')}>
              <option value="">Selecione...</option>
              <option value="option-1">Opção 1</option>
              <option value="option-2">Opção 2</option>
              <option value="option-3">Opção 3</option>
              <option value="option-4">Opção 4</option>
              <option value="option-5">Opção 5</option>
            </select>
          </div>

          <div className="mb-6">
            <textarea
              className={styles.text}
              rows={3}
              placeholder="Message"
              {...form.register('textarea')}
            ></textarea>
          </div>


          <div className="text-center mb-6 flex flex-col items-start space-y-4">
            <label className="form-check-label inline-block text-gray-800">
              <input type="radio" className={styles.check} {...form.register('radio')} value="option-1" />
              Opção 1
            </label>
            <label className="form-check-label inline-block text-gray-800">
              <input type="radio" className={styles.check} {...form.register('radio')} value="option-2" />
              Opção 2
            </label>
            <label className="form-check-label inline-block text-gray-800">
              <input type="radio" className={styles.check} {...form.register('radio')} value="option-3" />
              Opção 3
            </label>
          </div>

          <div className="text-center mb-6 flex flex-col items-start space-y-4">
            <label className="form-check-label inline-block text-gray-800">
              <input type="checkbox" className={styles.check} {...form.register('checkboxs')} value="check1" />
              Opção 1
            </label>
            <label className="form-check-label inline-block text-gray-800">
              <input type="checkbox" className={styles.check} {...form.register('checkboxs')} value="check2" />
              Opção 2
            </label>
          </div>

          <div className="text-center mb-6 flex flex-col items-start space-y-4">
            <label className="form-check-label inline-block text-gray-800">
              <input type="checkbox" className={styles.check} {...form.register('checkbox')} />
              Agree with this terms
            </label>
          </div>

          <div className="space-y-4">
            <button type="submit" className={styles.buttonBlue}>Send</button>
            <button type="button" className={styles.buttonRed} onClick={() => form.reset()}>Clear</button>
          </div>
        </form>
      </div>

      <div className="block p-6 rounded-lg shadow-lg max-w-md w-96 my-8 bg-blue-900">
        <Api />
      </div>


      <div className="block p-6 rounded-lg shadow-lg max-w-md w-96 my-8 bg-red-900">
        <Errors errors={form.formState.errors} />
      </div>
    </div>
  )
}

const Page = () => {
  const { data } = useApiGetValues()

  return (
    <div>
      {data && (<Form data={adapterToForm(data)} />)}
    </div>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  )
}

export default App
