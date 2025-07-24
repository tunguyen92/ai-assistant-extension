import { TabsContent } from '../../components/ui/tabs';
import { getHistory } from '../../services/historyApi';
import { PromptResponse } from '../../types/analysis';

const Histories = () => {
  const [promptHistory, setPromptHistory] = useState<PromptResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await getHistory();
        setPromptHistory(result.history);
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <TabsContent value="history" className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        🕘 Recent Prompts
      </h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : promptHistory.length === 0 ? (
        <p className="text-sm text-gray-500">No history found.</p>
      ) : (
        <div className="grid gap-6">
          {promptHistory.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-700">
                  Prompt
                </h3>
                <p className="text-sm text-gray-800 mt-1">
                  {item.original_prompt}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600">
                  ✨ Suggestions
                </h4>
                <ul className="mt-1 space-y-1 pl-6 list-disc">
                  {item.optimized_prompts.map((p, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      <span className="font-medium">{p.style}:</span>{' '}
                      {p.content}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-600">
                  📌 Summary
                </h4>
                <ul className="mt-1 space-y-1 pl-6 list-disc">
                  {item.summary.map((s, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      <span className="font-medium">
                        {s.criteria.charAt(0).toUpperCase() +
                          s.criteria.slice(1)}
                        :
                      </span>{' '}
                      {s.content}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-gray-500 flex justify-end">
                📅 {new Date(item.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </TabsContent>
  );
};

export default Histories;
