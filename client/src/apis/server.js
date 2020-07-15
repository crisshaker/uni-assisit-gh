import axios from 'axios';

const instance = axios.create();
instance.interceptors.request.use(
  (config) => {
    if (window.auth_token) {
      config.headers.authorization = window.auth_token;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
