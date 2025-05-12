
import React, { createContext, useState, useContext, ReactNode } from "react";
import { populatedMockCalls } from "../data/mockCalls";
import { Call } from "../types/call";

interface CallContextType {
  calls: Call[];
  selectedCallId: string | null;
  isLoading: boolean;
  uploadProgress: number;
  isProcessing: boolean;
  selectCall: (callId: string) => void;
  uploadCall: (file: File) => Promise<void>;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [calls, setCalls] = useState<Call[]>(populatedMockCalls);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectCall = (callId: string) => {
    setSelectedCallId(callId);
  };

  // Simulate file upload and processing
  const uploadCall = async (file: File) => {
    setIsLoading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate upload completion
    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(uploadInterval);
    setUploadProgress(100);
    
    // Simulate processing
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Add new mock call
    const newCall: Call = {
      id: `call-${Date.now()}`,
      userId: "user-1",
      filename: file.name,
      duration: Math.floor(Math.random() * 300) + 60, // 1-6 minutes
      uploadDate: new Date().toISOString(),
      audioUrl: "/mock-audio.mp3",
      transcript: "This is a sample transcript for the newly uploaded call. The system would normally process the audio file through Whisper API to generate an actual transcript with proper timestamps and speaker segmentation.",
      segments: [],
      analysis: {
        overallSentiment: Math.random() > 0.7 ? "negative" : Math.random() > 0.4 ? "positive" : "neutral",
        sentimentScore: (Math.random() * 2) - 1, // -1 to 1
        emotionTags: ["Confused", "Interested"],
        summary: "This is an automatically generated summary of the call. In a real implementation, this would be generated using a language model based on the transcript.",
        keyPoints: [
          "This is a simulated key point from the call",
          "In production, these would be extracted from the actual transcript",
          "Using natural language processing"
        ]
      }
    };
    
    // Simulate creating segments
    const words = newCall.transcript.split(' ');
    const segments = [];
    let start = 0;
    
    let currentPosition = 0;
    while (currentPosition < words.length) {
      const segmentLength = Math.floor(Math.random() * 10) + 5; // 5-15 words per segment
      const end = Math.min(currentPosition + segmentLength, words.length);
      
      segments.push({
        start,
        end: start + (end - currentPosition) * 0.3,
        text: words.slice(currentPosition, end).join(' '),
        sentiment: Math.random() > 0.7 ? "negative" : Math.random() > 0.4 ? "positive" : "neutral"
      });
      
      start += (end - currentPosition) * 0.3;
      currentPosition = end;
    }
    
    newCall.segments = segments;
    
    setCalls(prev => [newCall, ...prev]);
    setSelectedCallId(newCall.id);
    
    setIsProcessing(false);
    setIsLoading(false);
  };

  return (
    <CallContext.Provider
      value={{
        calls,
        selectedCallId,
        isLoading,
        uploadProgress,
        isProcessing,
        selectCall,
        uploadCall
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCallContext = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error("useCallContext must be used within a CallProvider");
  }
  return context;
};
