export interface OptimizedPrompt {
  style: string;
  content: string;
}

export interface Summary {
  criteria: string;
  content: string;
}

export interface PromptResponse {
  original_prompt: string;
  session_id: string;
  optimized_prompts: OptimizedPrompt[];
  timestamp: string;
  summary: Summary[];
}

export interface HistoryResponse {
  history: PromptResponse[];
}
