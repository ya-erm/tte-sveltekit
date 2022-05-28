import { token } from '$lib/store/token';
import axios from 'axios';
import {
  UsersServiceApiFactory,
  OperationsServiceApiFactory,
  InstrumentsServiceApiFactory,
} from './generated/api';

// Docs:
// https://tinkoff.github.io/investAPI/
// https://tinkoff.github.io/investAPI/swagger-ui/

const basePath = 'https://invest-public-api.tinkoff.ru/rest';

token.subscribe((value) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${value}`;
});

export const usersApi = UsersServiceApiFactory(undefined, basePath);
export const operationsApi = OperationsServiceApiFactory(undefined, basePath);
export const instrumentsApi = InstrumentsServiceApiFactory(undefined, basePath);

export * from './generated';
