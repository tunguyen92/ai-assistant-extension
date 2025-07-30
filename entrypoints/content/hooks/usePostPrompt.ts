import { useMutation } from '@tanstack/react-query';
import { PromptResponse } from '../types/analysis';
import axiosInstance from '../services/axiosInstance';

interface PromptPayload {
  prompt: string;
  session_id: string;
}

const postPrompt = async (data: PromptPayload): Promise<PromptResponse> => {
  const response = await axiosInstance.post('/analysis', data);
  return response.data;
};

export const usePostPrompt = () => {
  return useMutation<PromptResponse, Error, PromptPayload>({
    mutationFn: postPrompt,
  });
};
