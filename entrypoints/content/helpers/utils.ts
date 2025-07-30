import { v4 as uuidv4 } from 'uuid';

export const getSessionId = (): string => {
  const existingId = localStorage.getItem('sessionId');
  if (existingId) return existingId;

  const newId = uuidv4();
  localStorage.setItem('sessionId', newId);
  return newId;
};

export const formatCriteria = (text: string) => {
  return text.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};
