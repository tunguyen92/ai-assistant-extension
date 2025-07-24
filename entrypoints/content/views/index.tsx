import { X } from 'lucide-react';
import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import Histories from './tabs/histories';
import PromptsSuggest from './tabs/prompts-suggest';
import Reviews from './tabs/reviews';

const Main = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('prompt');

  return (
    <div className="fixed z-[9999] w-3/4 h-3/4 top-1/2 left-1/2 -translate-1/2 rounded-2xl bg-white shadow-xl border border-gray-200 text-sm overflow-y-scroll">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-base font-semibold">Prompt Assistant</h2>
        <button onClick={onClose}>
          <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 border-b border-gray-200">
          <TabsTrigger value="prompt">📋 Prompt</TabsTrigger>
          <TabsTrigger value="review">⭐ Review</TabsTrigger>
          <TabsTrigger value="history">🕘 History</TabsTrigger>
        </TabsList>

        <PromptsSuggest />
        <Reviews />
        <Histories />
      </Tabs>
    </div>
  );
};

export default Main;
