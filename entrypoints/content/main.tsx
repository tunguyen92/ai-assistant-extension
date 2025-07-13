import { Copy, X } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import toast from 'react-hot-toast';

const suggestions = [
  'What daily habits can improve my chances of success in career and personal life?',
  'How can I develop a growth mindset to become successful long-term?',
  'What are proven strategies successful people use to achieve their goals?',
];

const Main = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('prompt');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);

    toast.success('Copied to clipboard!');
  };

  return (
    <div className="fixed top-1/2 left-1/2 z-[9999] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl border border-gray-200 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-base font-semibold">Prompt Assistant</h2>
        <button onClick={onClose}>
          <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 border-b border-gray-200">
          <TabsTrigger value="prompt">📋 Prompt</TabsTrigger>
          <TabsTrigger value="review">⭐ Review</TabsTrigger>
          <TabsTrigger value="history">🕘 History</TabsTrigger>
        </TabsList>

        {/* Prompt Tab */}
        <TabsContent value="prompt" className="p-4 space-y-4">
          <div>
            <p className="font-medium">🖋️ Current Prompt:</p>
            <blockquote className="text-gray-700 mt-1">
              “How can I be successful in life?”
            </blockquote>
          </div>

          <div>
            <p className="font-medium mb-2">✅ Suggested Improvements:</p>
            <div className="space-y-3">
              {suggestions.map((text, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 bg-gray-50 rounded-xl p-3 relative group hover:bg-gray-100 transition-colors"
                >
                  <p className="text-gray-800 text-sm leading-snug">{text}</p>
                  <button
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 transition"
                    onClick={() => handleCopy(text)}
                    title="Copy suggestion"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Review Tab */}
        <TabsContent value="review" className="p-4 space-y-4">
          <p className="font-medium text-gray-800">📊 Evaluation Breakdown:</p>
          <div className="grid gap-3">
            {[
              { label: 'Clarity', score: '⭐⭐⭐☆☆', icon: '🟠' },
              { label: 'Specificity', score: '⭐⭐☆☆☆', icon: '🟡' },
              { label: 'Goal-Oriented', score: '⭐⭐⭐⭐☆', icon: '🟢' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2 text-gray-700">
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="text-yellow-600 font-mono">{item.score}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="p-4 space-y-4">
          <p className="font-medium text-gray-800">🕘 Recent Prompts:</p>
          <div className="space-y-3">
            {[
              {
                original: 'What’s the best way to...',
                suggestion: 'What are proven ways to achieve X?',
                date: '2025-07-11',
                rating: '⭐⭐⭐☆',
              },
              {
                original: 'Write a poem for my mom',
                suggestion:
                  'Can you write a 4-line poem to celebrate my mom’s birthday?',
                date: '2025-07-09',
                rating: '⭐⭐⭐⭐☆',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl bg-white p-3 shadow-sm"
              >
                <div className="text-gray-800 text-sm">
                  <span className="font-semibold">Prompt:</span> {item.original}
                </div>
                <div className="text-gray-700 text-sm mt-1">
                  <span className="font-semibold">Suggestion:</span>{' '}
                  {item.suggestion}
                </div>
                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>📅 {item.date}</span>
                  <span>⭐ {item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Main;
