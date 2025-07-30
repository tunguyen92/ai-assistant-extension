import { X } from 'lucide-react';
import { useLayoutEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import Histories from './tabs/histories';
import PromptsSuggest from './tabs/prompts-suggest';

const App = ({
  onClose,
  selectedText,
}: {
  onClose: () => void;
  selectedText?: string;
}) => {
  const [activeTab, setActiveTab] = useState('prompt');
  const [hasShadow, setHasShadow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      setHasShadow(container.scrollTop > 0);
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed z-[9999] w-1/4 h-screen top-0 right-0 rounded-2xl bg-white backdrop-blur-md shadow-2xl border border-gray-200 text-sm overflow-y-scroll">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Sticky Header and Tabs */}
        <div
          className={clsx(
            'sticky top-0 z-20 bg-white rounded-t-2xl p-4 transition-shadow',
            hasShadow && 'shadow-md'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-300 bg-white/90 rounded-t-2xl">
            <h2 className="text-lg font-bold text-gray-800">
              🚀 Prompt Assistant
            </h2>
            <button onClick={onClose} className="hover:scale-110 transition">
              <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          </div>

          {/* Tabs List */}
          <div className="mt-4">
            <TabsList className="grid grid-cols-2 border border-gray-300 bg-gray-100 rounded-lg overflow-hidden">
              <TabsTrigger
                value="prompt"
                className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                📋 Prompt
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 text-gray-600 hover:text-green-600 transition-colors font-medium"
              >
                🕘 History
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tabs Content */}
        <div ref={scrollRef} className="px-4">
          <PromptsSuggest selectedText={selectedText} />
          <Histories />
        </div>
      </Tabs>
    </div>
  );
};

export default App;
