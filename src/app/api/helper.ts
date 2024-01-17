import axios from 'axios';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const httpClient = axios.create(options);
export default httpClient;
