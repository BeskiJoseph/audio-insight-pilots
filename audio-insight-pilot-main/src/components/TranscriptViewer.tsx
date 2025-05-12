
import { Segment } from "@/types/call";
import { formatTimestamp, getSentimentColor } from "@/utils/formatters";

interface TranscriptViewerProps {
  segments: Segment[];
}

const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ segments }) => {
  return (
    <div className="transcript-container h-[400px] overflow-y-auto pr-2">
      <div className="space-y-4">
        {segments.map((segment, index) => (
          <div key={index} className="flex gap-2">
            <div className="text-xs text-gray-500 mt-1 w-12 flex-shrink-0">
              {formatTimestamp(segment.start)}
            </div>
            <div
              className={`p-3 rounded-lg text-sm ${
                segment.sentiment === "positive"
                  ? "bg-green-50 border-l-4 border-green-400"
                  : segment.sentiment === "negative"
                  ? "bg-red-50 border-l-4 border-red-400"
                  : "bg-amber-50 border-l-4 border-amber-400"
              }`}
            >
              {segment.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranscriptViewer;
