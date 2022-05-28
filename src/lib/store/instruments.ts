import { instrumentsApi } from '$lib/api';
import { mapInstrument } from '$lib/api/mapping';
import { InstrumentType, type Instrument } from '$lib/model';
import { writable } from 'svelte/store';
import { initialised } from './initialisation';

export const instruments = writable<Instrument[]>([]);

async function loadSharesAsync() {
  try {
    const response = await instrumentsApi.instrumentsServiceShares({
      instrumentStatus: 'INSTRUMENT_STATUS_BASE',
    });
    return (
      response.data?.instruments?.map((share) => mapInstrument(InstrumentType.Share, share)) ?? []
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function loadBondsAsync() {
  try {
    const response = await instrumentsApi.instrumentsServiceBonds({
      instrumentStatus: 'INSTRUMENT_STATUS_BASE',
    });
    return (
      response.data?.instruments?.map((bond) => mapInstrument(InstrumentType.Bond, bond)) ?? []
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function loadEtfsAsync() {
  try {
    const response = await instrumentsApi.instrumentsServiceEtfs({
      instrumentStatus: 'INSTRUMENT_STATUS_BASE',
    });
    return response.data?.instruments?.map((etf) => mapInstrument(InstrumentType.Etf, etf)) ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function loadFuturesAsync() {
  try {
    const response = await instrumentsApi.instrumentsServiceFutures({
      instrumentStatus: 'INSTRUMENT_STATUS_BASE',
    });
    return (
      response.data?.instruments?.map((futures) =>
        mapInstrument(InstrumentType.Futures, futures),
      ) ?? []
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}

initialised.subscribe(async () => {
  const shares = await loadSharesAsync();
  const bonds = await loadBondsAsync();
  const etfs = await loadEtfsAsync();
  const futures = await loadFuturesAsync();
  instruments.set([...shares, ...bonds, ...etfs, ...futures]);
});
