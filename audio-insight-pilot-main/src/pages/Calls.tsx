
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallContext } from "@/context/CallContext";
import { Search, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate, formatDuration, getSentimentColor } from "@/utils/formatters";
import CallDetail from "@/components/CallDetail";
import { Badge } from "@/components/ui/badge";
import { SentimentType } from "@/types/call";

const CallsPage = () => {
  const navigate = useNavigate();
  const { calls, selectCall, selectedCallId } = useCallContext();
  const selectedCall = calls.find(call => call.id === selectedCallId);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  
  // Filter calls based on search term and sentiment filter
  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.transcript.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSentiment = sentimentFilter === "all" || 
                            call.analysis.overallSentiment === sentimentFilter;
    
    return matchesSearch && matchesSentiment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Calls</h1>
        <Button onClick={() => navigate("/upload")}>
          <Upload className="mr-2 h-4 w-4" /> Upload Call
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search calls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-40">
          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Calls</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 overflow-hidden">
          <CardHeader className="bg-muted">
            <CardTitle className="text-lg">
              {filteredCalls.length} Call{filteredCalls.length !== 1 ? 's' : ''}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredCalls.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No calls match your filters
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto">
                {filteredCalls.map(call => (
                  <div
                    key={call.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedCallId === call.id ? "bg-brand-50" : ""
                    }`}
                    onClick={() => selectCall(call.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium truncate max-w-[200px]">
                          {call.filename}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {formatDate(call.uploadDate)} • {formatDuration(call.duration)}
                        </div>
                      </div>
                      <Badge className={getSentimentColor(call.analysis.overallSentiment)}>
                        {call.analysis.overallSentiment.charAt(0).toUpperCase() + call.analysis.overallSentiment.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="md:col-span-2">
          {selectedCall ? (
            <CallDetail call={selectedCall} />
          ) : (
            <Card className="h-full flex items-center justify-center p-6">
              <div className="text-center text-gray-500">
                <p>Select a call to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallsPage;
