import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { QueryClient, QueryClientProvider } from 'react-query'
import { pipe } from "fp-ts/function";
import { cpfOrCnpjMask, currencyMask, dateMask, phoneMask } from "@/shared/masks";
import { debounce } from "@/shared/utils/debounce";
import { factoryMasksToRegister } from "@/shared/utils/addMasksToRegister";
import { factoryEventsToRegister } from "@/shared/utils/addEventsToRegister";
import * as styles from './styles'
import { formSchema, FormValues } from "./schema";
import { adapterToForm, useApiGetValues, useApiPostValues } from "./api"

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

const registerWithMasks = factoryMasksToRegister<FormValues>({
  date: dateMask,
  cpfOrCnpj: cpfOrCnpjMask,
  phone: phoneMask,
  currency: currencyMask,
})


const registerWithEvent = factoryEventsToRegister<FormValues>((ev: any) => {
  debounce(() => {
    const { name, value } = ev.target
    console.log(`dispatch event: element_name: "${name}" element_value: "${value}"`)
  })

  return ev
})

const Form = ({ data }: FormProps) => {
  const { mutate } = useApiPostValues()

  const form = useForm<FormValues>({
    defaultValues: data,
    resolver: yupResolver(formSchema),
  });

  const register = pipe(form.register, registerWithMasks, registerWithEvent)

  const handleSubmit = form.handleSubmit(data => mutate(data))

  return (
    <div className="flex flex-row justify-center items-top space-x-4">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md w-96 my-8">
        <h1 className="text-1xl font-bold text-center my-8">React + Yup + IMask + React Hook Formt</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input type="range" className={styles.input} {...register('range', { onChange: ev => console.log('custom', ev) })} />
          </div>

          <div className="mb-6">
            <input type="email" className={styles.input} placeholder="Email" {...register('email')} />
          </div>

          <div className="mb-6">
            <input type="text" className={styles.input} placeholder="Date" {...register('date')} />
          </div>

          <div className="mb-6">
            <input type="text" className={styles.input} placeholder="CPF or CNPJ" {...register('cpfOrCnpj')} />
          </div>

          <div className="mb-6">
            <input type="text" className={styles.input} placeholder="Phone" {...register('phone')} />
          </div>

          <div className="mb-6">
            <input type="text" className={styles.input} placeholder="Currency" {...register('currency')} />
          </div>

          <div className="mb-6">
            <select className={styles.input} {...register('select')}>
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
              {...register('textarea')}
            ></textarea>
          </div>


          <div className="text-center mb-6 flex flex-col items-start space-y-4">
            <label className="form-check-label inline-block text-gray-800">
              <input type="radio" className={styles.check} {...register('radio')} value="option-1" />
              Opção 1
            </label>
            <label className="form-check-label inline-block text-gray-800">
              <input type="radio" className={styles.check} {...register('radio')} value="option-2" />
              Opção 2
            </label>
            <label className="form-check-label inline-block text-gray-800">
              <input type="radio" className={styles.check} {...register('radio')} value="option-3" />
              Opção 3
            </label>
          </div>

          <div className="text-center mb-6 flex flex-col items-start space-y-4">
            <label className="form-check-label inline-block text-gray-800">
              <input type="checkbox" className={styles.check} {...register('checkboxs')} value="check1" />
              Opção 1
            </label>
            <label className="form-check-label inline-block text-gray-800">
              <input type="checkbox" className={styles.check} {...register('checkboxs')} value="check2" />
              Opção 2
            </label>
          </div>

          <div className="text-center mb-6 flex flex-col items-start space-y-4">
            <label className="form-check-label inline-block text-gray-800">
              <input type="checkbox" className={styles.check} {...register('checkbox')} />
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
