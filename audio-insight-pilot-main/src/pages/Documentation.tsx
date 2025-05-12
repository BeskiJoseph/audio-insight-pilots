
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Upload, FileText, PieChart, Lock } from "lucide-react";

const DocumentationPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Info className="h-5 w-5 text-brand-600" />
        <h1 className="text-2xl font-bold">Documentation</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started with CallInsights</CardTitle>
          <CardDescription>
            Learn how to use the platform to analyze your customer calls
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="upload">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Uploading
                </TabsTrigger>
                <TabsTrigger value="analysis">
                  <FileText className="h-4 w-4 mr-2" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="reports">
                  <PieChart className="h-4 w-4 mr-2" />
                  Reports
                </TabsTrigger>
                <TabsTrigger value="privacy">
                  <Lock className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upload" className="p-6 border-t">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Uploading Call Recordings</h3>
                <p>
                  CallInsights supports MP3 and WAV audio formats for call recordings. 
                  To upload a call:
                </p>
                <ol className="list-decimal ml-5 space-y-2">
                  <li>Click the "Upload Call" button in the navigation</li>
                  <li>Drag and drop your audio file or click to browse your files</li>
                  <li>Select the audio file you want to analyze</li>
                  <li>Click "Start Processing" to begin analysis</li>
                </ol>
                <p className="text-sm text-muted-foreground">
                  Free accounts can upload up to 30 minutes of audio per month.
                  Upgrade to a paid plan for additional capacity.
                </p>
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-1">Tips for best results:</h4>
                  <ul className="list-disc ml-5 text-sm text-blue-700">
                    <li>Use clear audio recordings with minimal background noise</li>
                    <li>Trim silence from the beginning and end of recordings</li>
                    <li>Ensure both parties in the conversation are audible</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="p-6 border-t">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Understanding Call Analysis</h3>
                <p>
                  After uploading, each call is automatically processed to extract:
                </p>
                <ul className="list-disc ml-5 space-y-2">
                  <li><strong>Transcript:</strong> Full text of the conversation with timestamps</li>
                  <li><strong>Sentiment Analysis:</strong> Overall mood of the conversation (positive, neutral, negative)</li>
                  <li><strong>Emotion Tags:</strong> Specific emotions detected throughout the call</li>
                  <li><strong>Key Points:</strong> Important moments or topics from the conversation</li>
                </ul>
                <p>
                  The dashboard displays a sentiment score between -1 and 1, with higher values indicating
                  more positive sentiment. The transcript is color-coded to help you quickly identify
                  positive and negative segments.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="p-6 border-t">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Using Reports</h3>
                <p>
                  The Reports section provides aggregated insights across all your calls:
                </p>
                <ul className="list-disc ml-5 space-y-2">
                  <li><strong>Sentiment Distribution:</strong> Breakdown of positive, neutral, and negative calls</li>
                  <li><strong>Top Emotions:</strong> Most frequently detected emotions across all calls</li>
                  <li><strong>Call Summary:</strong> Key statistics and trends over time</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Premium subscribers can export reports as PDF or CSV files and schedule
                  automated report delivery via email.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="p-6 border-t">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Privacy & Security</h3>
                <p>
                  CallInsights takes the privacy and security of your call data seriously:
                </p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>All uploads and transcripts are encrypted in transit and at rest</li>
                  <li>Your data is never shared with third parties</li>
                  <li>You can delete call data at any time</li>
                  <li>Audio files and transcripts are processed in isolated environments</li>
                </ul>
                <div className="bg-amber-50 p-4 rounded-md">
                  <h4 className="font-medium text-amber-800 mb-1">Important Notice:</h4>
                  <p className="text-sm text-amber-700">
                    You are responsible for ensuring you have the proper consent to record and analyze
                    calls according to applicable laws in your jurisdiction. Always inform participants
                    that calls may be recorded and analyzed.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationPage;
