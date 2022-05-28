import { InstrumentType } from '$lib/model';

export function mapInstrumentType(type: string | undefined): InstrumentType {
  switch (type) {
    case 'bond':
      return InstrumentType.Bond;
    case 'share':
      return InstrumentType.Share;
    case 'currency':
      return InstrumentType.Currency;
    case 'etf':
      return InstrumentType.Etf;
    case 'futures':
      return InstrumentType.Futures;
    default:
      return InstrumentType.Unknown;
  }
}
