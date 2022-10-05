import invariant from 'tiny-invariant';
import { masker } from "./masker";

const cpfMask = '000.000.000-00'
const cnpjMask = '00.000.000/0000-00'

const cpfOrCnpjMask = masker({
  masked: {
    mask: [
      {
        mask: cpfMask,
      },
      {
        mask: cnpjMask,
      }
    ],
    dispatch: (appended, dynamicMasked) => {
      const value = `${dynamicMasked.value}${appended}`

      const cpf = dynamicMasked.compiledMasks.find(
        ({ mask }) => mask === cpfMask
      );

      const cnpj = dynamicMasked.compiledMasks.find(
        ({ mask }) => mask === cnpjMask
      );

      invariant(!!cpf, 'CPF mask not found.')
      invariant(!!cnpj, 'CNPJ mask not found.')

      if (value.length > cpfMask.length) {
        return cnpj;
      }

      return cpf;
    }
  }
});

export { cpfOrCnpjMask }
