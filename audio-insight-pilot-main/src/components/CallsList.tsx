
import { useCallContext } from "@/context/CallContext";
import { formatDate, formatDuration, getSentimentColor } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const CallsList = () => {
  const { calls, selectedCallId, selectCall } = useCallContext();

  if (calls.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-gray-500">No calls uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {calls.map((call) => (
        <Card
          key={call.id}
          className={`p-4 cursor-pointer transition-all hover:shadow ${
            selectedCallId === call.id
              ? "border-brand-500 bg-brand-50"
              : "border-gray-200"
          }`}
          onClick={() => selectCall(call.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium truncate max-w-[200px]">
                  {call.filename}
                </span>
                <Badge className={getSentimentColor(call.analysis.overallSentiment)}>
                  {call.analysis.overallSentiment.charAt(0).toUpperCase() + call.analysis.overallSentiment.slice(1)}
                </Badge>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {formatDate(call.uploadDate)} • {formatDuration(call.duration)}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium">
                Score: {call.analysis.sentimentScore.toFixed(2)}
              </div>
              <div className="flex gap-1 mt-1">
                {call.analysis.emotionTags.slice(0, 2).map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {call.analysis.emotionTags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{call.analysis.emotionTags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CallsList;
