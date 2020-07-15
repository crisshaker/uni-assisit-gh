import { LOGIN } from './types';

export const login = (payload) => {
  return { type: LOGIN, payload };
};
