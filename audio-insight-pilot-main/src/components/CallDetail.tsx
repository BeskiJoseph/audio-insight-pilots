
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Call } from "@/types/call";
import { 
  formatDate, 
  formatDuration, 
  getSentimentColor, 
  getSentimentIcon,
  getSentimentScoreDescription
} from "@/utils/formatters";
import TranscriptViewer from "./TranscriptViewer";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface CallDetailProps {
  call: Call;
}

const CallDetail: React.FC<CallDetailProps> = ({ call }) => {
  // Calculate sentiment distribution
  const sentiments = call.segments.reduce(
    (acc, segment) => {
      acc[segment.sentiment] = (acc[segment.sentiment] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  
  const data = [
    { name: 'Positive', value: sentiments.positive || 0, color: '#4ade80' },
    { name: 'Neutral', value: sentiments.neutral || 0, color: '#f59e0b' },
    { name: 'Negative', value: sentiments.negative || 0, color: '#f87171' },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{call.filename}</CardTitle>
              <div className="text-sm text-muted-foreground mt-1">
                {formatDate(call.uploadDate)} • {formatDuration(call.duration)}
              </div>
            </div>
            <Badge className={`${getSentimentColor(call.analysis.overallSentiment)} px-3 py-1`}>
              {getSentimentIcon(call.analysis.overallSentiment)}&nbsp;
              {call.analysis.overallSentiment.charAt(0).toUpperCase() + call.analysis.overallSentiment.slice(1)}
            </Badge>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-2">
                {call.analysis.sentimentScore.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 mb-6">
                {getSentimentScoreDescription(call.analysis.sentimentScore)}
              </div>
              
              <div className="w-full h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({name, value}) => `${name} (${value})`}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Emotion Tags</div>
                <div className="flex flex-wrap gap-2">
                  {call.analysis.emotionTags.map((tag, idx) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Key Points</div>
                <ul className="list-disc list-inside space-y-1">
                  {call.analysis.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-sm">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <Tabs defaultValue="transcript">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md">Call Details</CardTitle>
              <TabsList>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="transcript" className="pt-2">
              <TranscriptViewer segments={call.segments} />
            </TabsContent>
            <TabsContent value="summary" className="pt-2">
              <div className="prose max-w-none">
                <p>{call.analysis.summary}</p>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default CallDetail;
