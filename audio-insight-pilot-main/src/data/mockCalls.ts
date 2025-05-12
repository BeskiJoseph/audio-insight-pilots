
import { Call, EmotionTag, SentimentType } from "../types/call";

// Helper function to create a random date within the last 30 days
const getRandomDate = (daysAgo = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

// Helper function to create segments from transcript
const createSegments = (transcript: string, overallSentiment: SentimentType) => {
  const sentimentOptions: SentimentType[] = ["positive", "neutral", "negative"];
  const words = transcript.split(' ');
  const segments = [];
  let start = 0;

  // Create random segments from the transcript
  let currentPosition = 0;
  while (currentPosition < words.length) {
    const segmentLength = Math.floor(Math.random() * 15) + 10; // 10-25 words per segment
    const end = Math.min(currentPosition + segmentLength, words.length);
    
    // Bias sentiment towards overall sentiment
    let sentiment: SentimentType;
    if (Math.random() < 0.7) {
      sentiment = overallSentiment;
    } else {
      const options = sentimentOptions.filter(s => s !== overallSentiment);
      sentiment = options[Math.floor(Math.random() * options.length)];
    }
    
    segments.push({
      start,
      end: start + (end - currentPosition) * 0.3, // Roughly 0.3s per word
      text: words.slice(currentPosition, end).join(' '),
      sentiment
    });
    
    start += (end - currentPosition) * 0.3;
    currentPosition = end;
  }
  
  return segments;
};

export const mockCalls: Call[] = [
  {
    id: "call-1",
    userId: "user-1",
    filename: "customer_support_call_john.mp3",
    duration: 187,
    uploadDate: getRandomDate(2),
    audioUrl: "/mock-audio.mp3",
    transcript: "Hello, thank you for calling our customer support. How can I help you today? Hi there, I'm having an issue with my recent order. The product I received doesn't match what I ordered online. I apologize for that inconvenience. Could you please provide me with your order number so I can look into this for you? Yes, it's order number 78921. Let me check that for you. I see the issue now. It looks like there was a mix-up in our warehouse. I'll arrange for the correct product to be shipped to you immediately, and you can keep the wrong item as our apology. That's great, thank you for sorting this out so quickly. Is there anything else you need from me? No, that's all we need. You should receive the correct item within 3 business days. We'll also send you a confirmation email with tracking information. Thank you for your understanding. Thank you for your help. Have a great day!",
    segments: [],
    analysis: {
      overallSentiment: "positive",
      sentimentScore: 0.72,
      emotionTags: ["Happy", "Satisfied"],
      summary: "Customer reported receiving the wrong product. The agent apologized, confirmed the mix-up and arranged for the correct product to be shipped immediately, allowing the customer to keep the incorrect item as compensation.",
      keyPoints: [
        "Customer received wrong product",
        "Agent identified warehouse mix-up",
        "Resolution: Correct product to be shipped within 3 days",
        "Customer allowed to keep incorrect product",
        "Customer expressed satisfaction with resolution"
      ]
    }
  },
  {
    id: "call-2",
    userId: "user-1",
    filename: "technical_support_printer_issue.wav",
    duration: 246,
    uploadDate: getRandomDate(5),
    audioUrl: "/mock-audio.mp3",
    transcript: "Thank you for calling technical support, how can I assist you today? Hi, my printer keeps showing an error message and won't print anything. I've tried turning it off and on again but nothing helps. I understand that's frustrating. What model of printer do you have? It's an HP LaserJet Pro MFP M428. And what's the exact error message you're seeing? It says 'Paper jam in tray 2', but I've checked and there's definitely no paper jammed in there. I see. This can sometimes be a sensor issue rather than an actual paper jam. Let me walk you through some troubleshooting steps. First, let's open the rear access door and check for any small pieces of paper that might be triggering the sensor. I've already checked there but I'll look again... wait, I do see a tiny piece of paper stuck in the corner that I missed before. Great, carefully remove that piece. After that, let's reset the printer completely by unplugging it for 60 seconds, then plugging it back in. Ok, I've removed the paper and I'm unplugging the printer now. I'll wait a minute... Ok, I'm turning it back on. It's starting up... the error message is gone! That worked! Thank you so much for your help. I was ready to throw this printer out the window. I'm glad we could solve it! If you have any other issues, don't hesitate to call back. Thanks again, have a great day.",
    segments: [],
    analysis: {
      overallSentiment: "positive",
      sentimentScore: 0.56,
      emotionTags: ["Frustrated", "Confused", "Satisfied"],
      summary: "Customer was experiencing a 'Paper jam in tray 2' error on their HP printer despite checking for jams. Agent guided them to check the rear access door where they found a small piece of paper, then advised a full power reset. The issue was resolved successfully.",
      keyPoints: [
        "Error message falsely indicating paper jam",
        "Customer had already tried basic troubleshooting",
        "Small paper piece found in rear mechanism",
        "Full power reset performed",
        "Issue resolved completely"
      ]
    }
  },
  {
    id: "call-3",
    userId: "user-1",
    filename: "refund_request_delayed_shipment.mp3",
    duration: 178,
    uploadDate: getRandomDate(10),
    audioUrl: "/mock-audio.mp3",
    transcript: "Thank you for calling customer service, my name is Sarah, how may I help you? Hi Sarah, I placed an order two weeks ago and it still hasn't shipped. I need to cancel it and get a refund because I needed these items for an event that's already passed. I apologize for the delay with your order. Can I please have your order number? Sure, it's 45892. Thank you. Let me look that up for you... I see your order here. You're right, it hasn't shipped yet due to an inventory issue at our warehouse. I completely understand your frustration. Since the event has passed, I'll process a cancellation and full refund right away. But I ordered these items well in advance specifically for this event! This is totally unacceptable. I understand your frustration, and you're absolutely right. We should have notified you about the delay. As a gesture of goodwill, I'd like to offer you a 20% discount code for your next purchase. That doesn't really help me now. I had to go out and buy replacement items at a higher price from a local store. I understand. In that case, along with your full refund, I can also provide a $50 store credit to help offset the additional costs you incurred. Would that help? I guess that's better than nothing. Fine. Thank you for understanding. I've processed your refund, which should appear on your original payment method in 3-5 business days. I've also added the $50 store credit to your account, which doesn't expire. Is there anything else I can help you with today? No, that's it. Thank you for the refund.",
    segments: [],
    analysis: {
      overallSentiment: "negative",
      sentimentScore: -0.45,
      emotionTags: ["Angry", "Frustrated", "Asked for refund"],
      summary: "Customer requested cancellation and refund for an order that hadn't shipped two weeks after placement. The items were needed for an event that had already passed. Agent processed the refund and offered a $50 store credit to compensate for the customer having to purchase replacement items locally at a higher price.",
      keyPoints: [
        "Order delayed due to inventory issues",
        "Customer missed event due to non-delivery",
        "Customer purchased replacement items locally at higher cost",
        "Full refund processed plus $50 store credit",
        "Customer accepted resolution but remained dissatisfied"
      ]
    }
  }
];

// Populate segments for each mock call
export const populatedMockCalls: Call[] = mockCalls.map(call => {
  return {
    ...call,
    segments: createSegments(call.transcript, call.analysis.overallSentiment)
  };
});
