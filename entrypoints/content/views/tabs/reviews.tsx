import { TabsContent } from '../../components/ui/tabs';

const Reviews = () => {
  return (
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
  );
};

export default Reviews;
