import invariant from 'tiny-invariant';
import { masker } from './masker'

const landlineMask = '+55 00 0000-0000'
const mobileMask = '+55 00 00000-0000'

const phoneMask = masker({
  masked: {
    mask: [
      {
        mask: landlineMask
      },
      {
        mask: mobileMask
      }
    ],
    dispatch: (appended, dynamicMasked) => {
      const value = `${dynamicMasked.value}${appended}`

      const landline = dynamicMasked.compiledMasks.find(
        ({ mask }) => mask === landlineMask
      );

      const mobile = dynamicMasked.compiledMasks.find(
        ({ mask }) => mask === mobileMask
      );

      invariant(!!landline, 'Phone mask landline is not defined.')
      invariant(!!mobile, 'Phone mask mobile is not defined.')

      if (value.length > landlineMask.length) {
        return mobile;
      }

      return landline;
    }
  }
});

export { phoneMask }
