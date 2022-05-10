import { token } from '$lib/store/token';
import axios from 'axios';
import { UsersServiceApiFactory } from './generated/api';

const basePath = 'https://invest-public-api.tinkoff.ru/rest';

token.subscribe((value) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${value}`;
});

export * from './generated';
