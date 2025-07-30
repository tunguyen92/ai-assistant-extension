import { useQuery } from '@tanstack/react-query';
import { Loading, TabsContent } from '../../components/ui';
import { formatCriteria, getSessionId } from '../../helpers/utils';
import { fetchHistory } from '../../services/historyApi';
import { BrushCleaning } from 'lucide-react';

const Histories = () => {
  const sessionId = getSessionId();

  const {
    data: promptHistory,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['prompt-history', sessionId],
    queryFn: () => fetchHistory(sessionId),
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!promptHistory?.history || promptHistory.history.length === 0)
    return <BrushCleaning className="mt-2 mx-auto" />;

  return (
    <TabsContent value="history" className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        🕘 Recent Prompts
      </h2>

      <div className="space-y-4">
        {promptHistory?.history.map((item, index) => (
          <div
            key={`prompt-${index}`}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4"
          >
            <div className="flex justify-between">
              {/* Original Prompt */}
              <div className="space-y-1">
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
                  Prompt
                </span>
                <p className="text-sm text-gray-800">{item.original_prompt}</p>
              </div>

              {/* Timestamp */}
              <p className="text-xs text-gray-400 text-right">
                🗓 {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>

            {/* Suggestions */}
            {item.optimized_prompts?.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-orange-600 mb-2">
                  ✨ Suggestions
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {item.optimized_prompts.map((op, i) => (
                    <li key={`opt-${i}`}>
                      <span className="font-medium text-gray-800">
                        {op.style}:
                      </span>{' '}
                      {op.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Summary */}
            {item.summary && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-pink-600">
                  📌 Summary
                </h4>

                {/* Analysis Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-md px-3 py-2 text-sm text-gray-700">
                  <p className="font-medium text-gray-800 mb-1">
                    Analysis Summary:
                  </p>
                  <p>{item.summary.analysis_summary}</p>
                </div>

                {/* Component Analysis */}
                <div className="grid gap-2">
                  {item.summary.component_analysis
                    .filter((c) => c.present)
                    .map((c, idx) => (
                      <div
                        key={`component-${idx}`}
                        className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                      >
                        <p className="text-xs font-medium text-gray-800">
                          {formatCriteria(c.criteria)}
                        </p>
                        <p className="text-xs text-gray-700">{c.comment}</p>
                      </div>
                    ))}
                </div>

                {/* Final Recommendation */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2 text-sm text-gray-700">
                  <p className="font-medium text-gray-800 mb-1">
                    Final Recommendation:
                  </p>
                  <p>{item.summary.final_recommendation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </TabsContent>
  );
};

export default Histories;
