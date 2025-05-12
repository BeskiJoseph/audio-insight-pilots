
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallContext } from "@/context/CallContext";
import { BarChart as BarChartIcon, PieChart as PieChartIcon, FileText } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ReportsPage = () => {
  const { calls } = useCallContext();

  // Skip if no calls
  if (calls.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <Card className="p-8 text-center">
          <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No data available</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Upload call recordings to generate reports and insights
          </p>
        </Card>
      </div>
    );
  }

  // Calculate sentiment distribution
  const sentimentCounts = calls.reduce(
    (acc, call) => {
      acc[call.analysis.overallSentiment]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  const pieData = [
    { name: "Positive", value: sentimentCounts.positive, color: "#4ade80" },
    { name: "Neutral", value: sentimentCounts.neutral, color: "#f59e0b" },
    { name: "Negative", value: sentimentCounts.negative, color: "#f87171" },
  ];

  // Calculate emotion tag distribution
  const emotionTags = calls.flatMap(call => call.analysis.emotionTags);
  const emotionCounts = emotionTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort and take top emotions
  const topEmotions = Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
    
  const barData = topEmotions.map(([tag, count]) => ({
    name: tag,
    value: count,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sentiment Distribution</CardTitle>
              <CardDescription>Overall sentiment across all calls</CardDescription>
            </div>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({name, value}) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Emotions</CardTitle>
              <CardDescription>Most common emotions detected</CardDescription>
            </div>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Call Summary</CardTitle>
          <CardDescription>Key statistics from your calls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Calls</div>
              <div className="text-2xl font-bold mt-1">{calls.length}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600">Positive Rate</div>
              <div className="text-2xl font-bold mt-1 text-green-700">
                {calls.length > 0
                  ? `${Math.round((sentimentCounts.positive / calls.length) * 100)}%`
                  : "N/A"}
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm text-red-600">Negative Rate</div>
              <div className="text-2xl font-bold mt-1 text-red-700">
                {calls.length > 0
                  ? `${Math.round((sentimentCounts.negative / calls.length) * 100)}%`
                  : "N/A"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
