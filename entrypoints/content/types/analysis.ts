export interface OptimizedPrompt {
  style: string;
  content: string;
}

export interface ComponentAnalysis {
  criteria: string;
  present: boolean;
  comment: string;
}

export interface Summary {
  type: string;
  analysis_summary: string;
  component_analysis: ComponentAnalysis[];
  final_recommendation: string;
}

export interface PromptResponse {
  original_prompt: string;
  session_id: string;
  optimized_prompts: OptimizedPrompt[];
  timestamp: string;
  summary: Summary;
}

export interface HistoryResponse {
  history: PromptResponse[];
}
