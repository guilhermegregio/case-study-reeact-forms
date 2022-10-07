import { masker } from './masker'

const currencyMask = masker({
  masked: {
    mask: "R$ num{,}cents",
    blocks: {
      num: {
        mask: Number,
        signed: true,
        thousandsSeparator: ".",
        mapToRadix: [""],
        scale: 0
      },
      cents: {
        mask: "00",
        normalizeZeros: true,
        padFractionalZeros: true
      }
    }
  },
  transform: (value) => {
    return Number(currencyMask.unmask(value).replace(",", "."));
  },
  maskDefault: (value) => {
    return currencyMask.mask(Number(value).toFixed(2).replace(".", ","));
  }
});

export { currencyMask }
