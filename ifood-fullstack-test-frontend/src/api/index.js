import axios from 'axios';
import store from '../store';

const baseUrl = 'http://localhost:8060';

export const request = (endPoint, method = 'get', data, headers = {}) => {
  return axios({
    method,
    url: `${baseUrl}${endPoint}`,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',      
    },
    data
  })
};
