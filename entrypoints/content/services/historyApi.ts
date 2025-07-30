import { HistoryResponse } from '../types/analysis';
import axiosInstance from './axiosInstance';

export const fetchHistory = async (
  session_id: string
): Promise<HistoryResponse> => {
  const response = await axiosInstance.post('/history', { session_id });
  return response.data;
};
