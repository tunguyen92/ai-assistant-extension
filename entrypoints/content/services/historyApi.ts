import { getSessionId } from '../helpers/utils';
import { HistoryResponse } from '../types/analysis';
import axiosInstance from './axiosInstance';

export const getHistory = async (): Promise<HistoryResponse> => {
  const response = await axiosInstance.post('/history', {
    session_id: getSessionId(),
  });

  return response.data;
};
