import axios from 'axios';
import { SERVER_URI } from '../constants';

export default axios.create({
  baseURL: SERVER_URI
});

export const axiosPrivate = axios.create({
  baseURL: SERVER_URI,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});