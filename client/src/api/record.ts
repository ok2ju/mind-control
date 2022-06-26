import Axios from './config';
import { Record, RecordsListResponse } from '../types/record';

export default {
  list(): Promise<RecordsListResponse> {
    return Axios.get('/records');
  },
  create(record: Record): Promise<Record> {
    return Axios.post('/records', record);
  }
};
