
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallContext } from "@/context/CallContext";
import { UploadCloud, BarChart3, Clock, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CallsList from "@/components/CallsList";
import CallDetail from "@/components/CallDetail";

const Dashboard = () => {
  const navigate = useNavigate();
  const { calls, selectedCallId } = useCallContext();
  const selectedCall = calls.find(call => call.id === selectedCallId);

  // Calculate some quick stats
  const totalMinutes = calls.reduce((total, call) => total + call.duration, 0) / 60;
  const positiveCount = calls.filter(call => call.analysis.overallSentiment === "positive").length;
  const negativeCount = calls.filter(call => call.analysis.overallSentiment === "negative").length;
  
  const positivePercentage = calls.length > 0 
    ? Math.round((positiveCount / calls.length) * 100) 
    : 0;
  
  const negativePercentage = calls.length > 0 
    ? Math.round((negativeCount / calls.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Call Analytics Dashboard</h1>
        <Button onClick={() => navigate("/upload")}>
          <UploadCloud className="mr-2 h-4 w-4" /> Upload Call
        </Button>
      </div>

      {calls.length === 0 ? (
        <Card className="p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-brand-50 p-3">
              <Phone className="h-8 w-8 text-brand-600" />
            </div>
            <h2 className="mt-4 text-lg font-medium">No call recordings yet</h2>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              Upload your first call recording to start analyzing customer
              sentiment and extracting valuable insights.
            </p>
            <Button className="mt-6" onClick={() => navigate("/upload")}>
              <UploadCloud className="mr-2 h-4 w-4" /> Upload Your First Call
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Call Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalMinutes.toFixed(1)} mins
                </div>
                <p className="text-xs text-muted-foreground">
                  From {calls.length} call{calls.length !== 1 ? 's' : ''}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Positive Sentiment</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-positive">
                  {positivePercentage}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {positiveCount} positive call{positiveCount !== 1 ? 's' : ''}
                </p>
                <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-positive" 
                    style={{ width: `${positivePercentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Negative Sentiment</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-negative">
                  {negativePercentage}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {negativeCount} negative call{negativeCount !== 1 ? 's' : ''}
                </p>
                <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-negative" 
                    style={{ width: `${negativePercentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Recent Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <CallsList />
              </CardContent>
            </Card>
            
            <div className="md:col-span-2">
              {selectedCall ? (
                <CallDetail call={selectedCall} />
              ) : (
                <Card className="h-full flex items-center justify-center p-6">
                  <div className="text-center text-gray-500">
                    <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a call to view details</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
