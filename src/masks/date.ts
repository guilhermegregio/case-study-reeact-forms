import { format, parse } from "date-fns";
import { masker, IMask } from './masker'

const dateFormatClient = "dd/MM/yyyy";
const dateFormatApi = "yyyy-MM-dd";

const dateMask = masker({
  masked: {
    mask: Date,
    pattern: dateFormatClient,
    blocks: {
      dd: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
        maxLength: 2
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2
      },
      yyyy: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 9999
      }
    },
    format: (date) => {
      return format(date, dateFormatClient);
    },
    parse: (dateStr) => {
      return parse(dateStr, dateFormatClient, new Date());
    }
  },
  transform: (value) => {
    if (!value || typeof value !== 'string') {
      return value;
    }

    const date = parse(value, dateFormatClient, new Date());
    return format(date, dateFormatApi);
  },
  maskDefault: (value) => {
    if (!value || typeof value !== 'string') {
      return value;
    }

    return format(
      parse(value, dateFormatApi, new Date()),
      dateFormatClient
    );
  }
});

export { dateMask }
