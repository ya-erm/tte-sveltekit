import { InstrumentType } from '$lib/model';
import { translate } from '$lib/translate';
import { derived } from 'svelte/store';

export const printGroupName = derived(translate, (translate) => {
  return (instrumentType: InstrumentType) => {
    switch (instrumentType) {
      case InstrumentType.Share:
        return translate('instrument.groups.share');
      case InstrumentType.Bond:
        return translate('instrument.groups.bond');
      case InstrumentType.Currency:
        return translate('instrument.groups.currency');
      case InstrumentType.Etf:
        return translate('instrument.groups.etf');
      case InstrumentType.Futures:
        return translate('instrument.groups.futures');
      default:
        return translate('instrument.groups.other');
    }
  };
});
