import { FieldValues, UseFormRegister } from "react-hook-form"

export const factoryEventsToRegister = <T extends FieldValues>(callback: any) => (register: UseFormRegister<T>) => {
  const registerCustom: UseFormRegister<T> = (name, opts) => {
    return register(name, {
      ...opts,
      onChange: (ev) => {
        opts?.onChange?.(ev)
        callback(ev)
        return ev
      }
    })
  }

  return registerCustom
}

