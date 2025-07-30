import { useQueryClient } from '@tanstack/react-query';
import { Copy, Send } from 'lucide-react';
import { useLayoutEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Button, Input, Loading } from '../../components/ui';
import { TabsContent } from '../../components/ui/tabs';
import { formatCriteria, getSessionId } from '../../helpers/utils';
import { usePostPrompt } from '../../hooks/usePostPrompt';
import { PromptResponse } from '../../types/analysis';
import { AxiosError } from 'axios';

const PromptsSuggest = ({ selectedText }: { selectedText?: string }) => {
  const [prompt, setPrompt] = useState<string>(selectedText ?? '');
  const [suggestions, setSuggestions] = useState<PromptResponse | null>(null);
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isError } = usePostPrompt();

  const sessionId = getSessionId();
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleChangePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        prompt: prompt.trim(),
        session_id: sessionId,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ['prompt-history', sessionId],
          });
          setPrompt('');
          setSuggestions(data);
          toast.success('Prompt sent successfully!');
        },
        onError: (error: any) => {
          toast.error('Failed to send prompt.');
          console.log(error.response);
        },
      }
    );
  };

  return (
    <TabsContent value="prompt" className="space-y-4">
      <p className="font-semibold text-sm mb-2">🖋️ Current Prompt:</p>
      <form onSubmit={handleSendPrompt} className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Your prompt"
          value={prompt}
          onChange={handleChangePrompt}
          className="flex-grow"
        />
        <Button
          type="submit"
          className="rounded-md px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-60"
          disabled={isPending}
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>

      {isPending && <Loading />}
      {isError && (
        <div className="text-red-500">
          {(error as AxiosError<{ detail?: string }>)?.response?.data?.detail ??
            'Something went wrong.'}
        </div>
      )}

      {suggestions ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-6">
          {/* Original Prompt & Timestamp */}
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              🕒 {new Date(suggestions.timestamp).toLocaleString()}
            </p>
            <h3 className="text-base font-semibold text-gray-800">
              🖋️ Original Prompt
            </h3>
            <p className="text-gray-700 text-sm">
              {suggestions.original_prompt}
            </p>
          </div>

          {/* Optimized Prompts */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-green-700 flex items-center gap-2">
              ✅ Suggested Improvements:
            </h3>
            <div className="space-y-4">
              {suggestions.optimized_prompts.map((item, idx) => (
                <div key={`suggest-${idx}`} className="space-y-1">
                  <h5 className="text-sm font-semibold text-gray-700">
                    {item.style}
                  </h5>
                  <div className="relative bg-gray-100 hover:bg-gray-200 transition p-3 rounded-md group text-sm text-gray-800">
                    {item.content}
                    <button
                      type="button"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-blue-600 transition"
                      onClick={() => handleCopy(item.content)}
                      title="Copy suggestion"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold flex items-center gap-2 mb-2">
              📌 Summary
            </h3>

            {/* Analysis Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-3 text-sm text-gray-700">
              <p className="font-medium text-gray-800 mb-1">
                Analysis Summary:
              </p>
              <p>{suggestions.summary.analysis_summary}</p>
            </div>

            {/* Component Analysis */}
            <div className="grid gap-4">
              {suggestions.summary.component_analysis
                .filter((item) => item.present)
                .map((item, idx) => (
                  <div
                    key={`component-${idx}`}
                    className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3"
                  >
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {formatCriteria(item.criteria)}
                    </p>
                    <p className="text-sm text-gray-700 leading-snug">
                      {item.comment}
                    </p>
                  </div>
                ))}
            </div>

            {/* Final Recommendation */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md px-4 py-3 text-sm text-gray-700">
              <p className="font-medium text-gray-800 mb-1">
                Final Recommendation:
              </p>
              <p>{suggestions.summary.final_recommendation}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 text-center">
          Nothing here yet! Try submitting a prompt.
        </div>
      )}
    </TabsContent>
  );
};

export default PromptsSuggest;
