import { PromptResponse } from '../types/analysis';
import axiosInstance from './axiosInstance';

export const postPrompt = async (data: {
  prompt: string;
  session_id: string;
}): Promise<PromptResponse> => {
  const response = await axiosInstance.post('/analysis', data);

  return response.data;
};
