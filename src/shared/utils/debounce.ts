export const debounceFactory = (timer: number) => {
  let timeout: any

  return function(fn: any) {
    clearTimeout(timeout)
    timeout = setTimeout(fn, timer)
  }
}

export const debounce = debounceFactory(500)

