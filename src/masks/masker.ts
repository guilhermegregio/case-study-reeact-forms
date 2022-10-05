import IMask from "imask";

type Params = {
  masked: IMask.AnyMaskedOptions | IMask.AnyMasked;
  transform?: (value: unknown) => unknown;
  maskDefault?: (value: unknown) => unknown;
}

type Result = {
  mask: any,
  onChange: any,
  transform: any,
  unmask: any,
  maskDefault: any
}

type Masker = (options: Params) => Result

const masker: Masker = ({
  masked,
  transform,
  maskDefault
}) => {
  const mask = IMask.createPipe(
    masked,
    IMask.PIPE_TYPE.UNMASKED,
    IMask.PIPE_TYPE.MASKED
  );

  const unmask = IMask.createPipe(
    masked,
    IMask.PIPE_TYPE.MASKED,
    IMask.PIPE_TYPE.UNMASKED
  );

  const onChange = (e: any) => {
    const unmasked = unmask(e.target.value);
    const newValue = mask(unmasked);
    e.target.value = newValue;
  };

  return {
    mask,
    onChange,
    transform: transform || unmask,
    unmask,
    maskDefault: maskDefault || mask
  };

}

export { masker, IMask }
