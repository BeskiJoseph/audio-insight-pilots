
export type SentimentType = "positive" | "neutral" | "negative";

export type EmotionTag = 
  | "Happy" 
  | "Satisfied" 
  | "Frustrated" 
  | "Angry" 
  | "Confused" 
  | "Interested" 
  | "Asked for refund"
  | "Requested information"
  | "Technical issue";

export interface Segment {
  start: number; // timestamp in seconds
  end: number; // timestamp in seconds
  text: string;
  sentiment: SentimentType;
}

export interface CallAnalysis {
  overallSentiment: SentimentType;
  sentimentScore: number; // -1 to 1 scale
  emotionTags: EmotionTag[];
  summary: string;
  keyPoints: string[];
}

export interface Call {
  id: string;
  userId: string;
  filename: string;
  duration: number; // in seconds
  uploadDate: string; // ISO date string
  audioUrl: string;
  transcript: string;
  segments: Segment[];
  analysis: CallAnalysis;
}
