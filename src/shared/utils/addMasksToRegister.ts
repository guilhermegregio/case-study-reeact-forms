import { FieldValues, UseFormRegister } from "react-hook-form"

export const factoryMasksToRegister = <T extends FieldValues>(masks: Partial<Record<keyof T, any>>) => (register: UseFormRegister<T>) => {
  const registerCustom: UseFormRegister<T> = (name, opts) => {
    return register(name, {
      ...opts,
      onChange: (ev) => {
        masks[name]?.onChange?.(ev)
        opts?.onChange?.(ev)
        console.log(name, ev.currentTarget.value)
        return ev
      }
    })
  }

  return registerCustom
}

