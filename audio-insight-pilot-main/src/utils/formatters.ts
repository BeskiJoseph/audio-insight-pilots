
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatTimestamp = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getSentimentColor = (sentiment: string): string => {
  switch (sentiment) {
    case 'positive':
      return 'bg-positive text-white';
    case 'neutral':
      return 'bg-neutral text-white';
    case 'negative':
      return 'bg-negative text-white';
    default:
      return 'bg-gray-200';
  }
};

export const getSentimentIcon = (sentiment: string): string => {
  switch (sentiment) {
    case 'positive':
      return '😊';
    case 'neutral':
      return '😐';
    case 'negative':
      return '😟';
    default:
      return '❓';
  }
};

export const getSentimentScoreDescription = (score: number): string => {
  if (score > 0.7) return "Very Positive";
  if (score > 0.3) return "Positive";
  if (score > -0.3) return "Neutral";
  if (score > -0.7) return "Negative";
  return "Very Negative";
};
