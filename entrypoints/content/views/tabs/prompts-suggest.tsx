import { Copy, Send } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { TabsContent } from '../../components/ui/tabs';
import { getSessionId } from '../../helpers/utils';
import { postPrompt } from '../../services/analysisApi';
import { PromptResponse } from '../../types/analysis';

const PromptsSuggest = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [suggestions, setSuggestions] = useState<PromptResponse>({
    original_prompt: '',
    session_id: '',
    optimized_prompts: [],
    timestamp: '',
    summary: [],
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);

    toast.success('Copied to clipboard!');
  };

  const handleChangePrompt = (e: any) => {
    setPrompt(e.target.value);
  };

  const handleSendPrompt = async (e: any) => {
    e.preventDefault();
    const promptRequest = {
      prompt,
      session_id: getSessionId(),
    };

    try {
      const result = await postPrompt(promptRequest);

      console.log(result);

      setSuggestions(result);
    } catch (error) {
      console.error('Error posting prompt:', error);
    }
  };

  return (
    <TabsContent value="prompt" className="p-4 space-y-4">
      <p className="font-medium mb-1">🖋️ Current Prompt:</p>
      <form
        onSubmit={handleSendPrompt}
        className="flex items-center justify-center gap-1"
      >
        <Input
          type="text"
          placeholder="Your prompt"
          onChange={handleChangePrompt}
        />
        <Button type="submit" className="rounded-md border px-2">
          <Send className="w-5 h-5" />
        </Button>
      </form>

      <div>
        <p className="font-medium mb-2">✅ Suggested Improvements:</p>
        <div className="space-y-3">
          {suggestions.optimized_prompts?.map((item, idx) => (
            <div key={`prompt-suggest-${idx}`}>
              <p>{item.style}</p>
              <div className="border border-gray-300 bg-gray-50 rounded-xl p-3 relative group hover:bg-gray-100 transition-colors">
                <p className="text-gray-800 text-sm leading-snug">
                  {item.content}
                </p>
                <button
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 transition"
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
    </TabsContent>
  );
};

export default PromptsSuggest;
