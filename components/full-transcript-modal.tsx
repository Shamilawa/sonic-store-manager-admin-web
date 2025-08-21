"use client";

import { Bot, MessageCircle, Send, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type CallTranscriptEntry = {
  timestamp: string;
  speaker: "Customer" | "Agent";
  text: string;
};

type CallTranscript = {
  callId: string;
  customerName: string;
  summary: string;
  transcript: CallTranscriptEntry[];
};

const dummyCallTranscript: CallTranscript = {
  callId: "CALL-2025-08-21-001",
  customerName: "Jason",
  summary:
    "Customer inquired about Chevy Silverado pricing and financing options, discussed trade-in value, showed interest in scheduling a weekend test drive, and received details on current promotions and warranty coverage.",
  transcript: [
    {
      timestamp: "2025-08-21T10:02:15Z",
      speaker: "Customer",
      text: "Hi, I'm calling to ask about the pricing and financing options for the new Chevy Silverado.",
    },
    {
      timestamp: "2025-08-21T10:02:30Z",
      speaker: "Agent",
      text: "Sure, Jason. The base model starts at $38,000, and we have several financing options, including 0% APR for 36 months for qualified buyers.",
    },
    {
      timestamp: "2025-08-21T10:03:05Z",
      speaker: "Customer",
      text: "I also have a truck I might want to trade in. Can you tell me about the trade-in value?",
    },
    {
      timestamp: "2025-08-21T10:03:20Z",
      speaker: "Agent",
      text: "Absolutely. We can give you an estimate over the phone, but an in-person appraisal will give you the most accurate trade-in value.",
    },
    {
      timestamp: "2025-08-21T10:03:45Z",
      speaker: "Customer",
      text: "Okay, I’m also thinking about scheduling a test drive this weekend.",
    },
    {
      timestamp: "2025-08-21T10:04:00Z",
      speaker: "Agent",
      text: "That sounds great. We have openings on Saturday morning and Sunday afternoon. Which works best for you?",
    },
    {
      timestamp: "2025-08-21T10:04:20Z",
      speaker: "Customer",
      text: "Saturday morning works for me.",
    },
    {
      timestamp: "2025-08-21T10:04:35Z",
      speaker: "Agent",
      text: "Perfect. I’ll reserve that slot for you. Also, I wanted to mention we have a promotion this month with free maintenance for the first year, and our standard warranty covers 3 years or 36,000 miles.",
    },
    {
      timestamp: "2025-08-21T10:04:55Z",
      speaker: "Customer",
      text: "Sounds good. I’ll see you Saturday.",
    },
  ],
};

type SelectedPair = {
  customerMessage: CallTranscriptEntry;
  agentResponse: CallTranscriptEntry;
} | null;

type ExplanationState = {
  [key: string]: {
    hasShownOnce: boolean;
    agentResponse: string;
    feedbackMessages: Array<{
      id: string;
      text: string;
      timestamp: string;
    }>;
  };
};

export const FullTranscriptModal = () => {
  const [selectedPair, setSelectedPair] = useState<SelectedPair>(null);
  const [showExplanationDialog, setShowExplanationDialog] = useState(false);
  const [explanationComplete, setExplanationComplete] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);
  const [hoveredPairIndex, setHoveredPairIndex] = useState<number | null>(null);
  const [streamingText, setStreamingText] = useState("");
  const [explanationStates, setExplanationStates] = useState<ExplanationState>(
    {}
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState("");

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const selectPair = (
    customerMsg: CallTranscriptEntry,
    agentMsg: CallTranscriptEntry
  ) => {
    const pairKey = `${customerMsg.timestamp}-${agentMsg.timestamp}`;
    setSelectedPair({ customerMessage: customerMsg, agentResponse: agentMsg });
    setShowExplanationDialog(true);
    setCurrentFeedback("");

    const existingState = explanationStates[pairKey];

    if (existingState?.hasShownOnce) {
      // Show existing response immediately
      setStreamingText(existingState.agentResponse);
      setExplanationComplete(true);
      setIsExplaining(false);
      setIsAnalyzing(false);
    } else {
      // First time opening - show analyzing then streaming
      setExplanationComplete(false);
      setIsExplaining(false);
      setIsAnalyzing(true);
      setStreamingText("");
      simulateAnalyzingAndExplanation(pairKey);
    }
  };

  const simulateAnalyzingAndExplanation = (pairKey: string) => {
    // Show "Analyzing response..." for 1.5 seconds
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsExplaining(true);
      simulateStreamingExplanation(pairKey);
    }, 1500);
  };

  const simulateStreamingExplanation = (pairKey: string) => {
    const fullText =
      "I responded this way because the customer was asking about pricing and financing options for the Chevy Silverado. I provided the base price and mentioned our current 0% APR promotion to give them comprehensive information that addresses their immediate needs while highlighting our competitive financing options.";

    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setStreamingText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setIsExplaining(false);
        setExplanationComplete(true);

        setExplanationStates((prev) => ({
          ...prev,
          [pairKey]: {
            hasShownOnce: true,
            agentResponse: fullText,
            feedbackMessages: prev[pairKey]?.feedbackMessages || [],
          },
        }));
      }
    }, 30);
  };

  const submitExplanationFeedback = () => {
    if (!selectedPair || !currentFeedback.trim()) return;

    const pairKey = `${selectedPair.customerMessage.timestamp}-${selectedPair.agentResponse.timestamp}`;
    const newFeedback = {
      id: Date.now().toString(),
      text: currentFeedback.trim(),
      timestamp: new Date().toISOString(),
    };

    setExplanationStates((prev) => ({
      ...prev,
      [pairKey]: {
        ...prev[pairKey],
        feedbackMessages: [
          ...(prev[pairKey]?.feedbackMessages || []),
          newFeedback,
        ],
      },
    }));

    setCurrentFeedback("");
  };

  const closeExplanationDialog = () => {
    setShowExplanationDialog(false);
    setSelectedPair(null);
    setExplanationComplete(false);
    setIsExplaining(false);
    setIsAnalyzing(false);
    setStreamingText("");
    setCurrentFeedback("");
  };

  const getMessagePairs = () => {
    const pairs = [];
    for (let i = 0; i < dummyCallTranscript.transcript.length - 1; i++) {
      const current = dummyCallTranscript.transcript[i];
      const next = dummyCallTranscript.transcript[i + 1];
      if (current.speaker === "Customer" && next.speaker === "Agent") {
        pairs.push({
          customerIndex: i,
          agentIndex: i + 1,
          pairIndex: pairs.length,
        });
      }
    }
    return pairs;
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button
            variant="outline"
            className="cursor-pointer w-full h-14 bg-gradient-to-r from-violet-50 to-violet-100 hover:from-violet-100 hover:to-violet-200 border-violet-200 text-violet-700 font-semibold shadow-sm hover:shadow-md transition-all duration-200 group flex items-center justify-start"
          >
            <div className="flex items-center justify-center w-8 h-8 min-w-8 bg-violet-600 rounded-full mr-3 group-hover:bg-violet-700 transition-colors">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Full Transcript</div>
              <div className="text-xs text-violet-600">Conversation log</div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] h-dvh w-[600px] p-0 min-w-[800px]">
          <DialogHeader className="border-b-[1px] border-gray-300 h-fit p-4">
            <DialogTitle>Full Transcript</DialogTitle>
            <DialogDescription>
              View the complete transcript of the conversation. Hover over
              message pairs to see the AI button.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 min-h-0 p-4">
            <div className="space-y-7">
              {getMessagePairs().map(
                ({ customerIndex, agentIndex, pairIndex }) => {
                  const customerMsg =
                    dummyCallTranscript.transcript[customerIndex];
                  const agentMsg = dummyCallTranscript.transcript[agentIndex];

                  return (
                    <div
                      key={pairIndex}
                      className={cn(
                        "relative p-4 rounded-lg transition-all duration-200 group cursor-pointer",
                        hoveredPairIndex === pairIndex &&
                          "bg-blue-50/80 shadow-sm border border-blue-100"
                      )}
                      onMouseEnter={() => setHoveredPairIndex(pairIndex)}
                      onMouseLeave={() => setHoveredPairIndex(null)}
                    >
                      {hoveredPairIndex === pairIndex && (
                        <div className="absolute top-2 right-2 z-10">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 px-3 bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 shadow-sm"
                            onClick={() => selectPair(customerMsg, agentMsg)}
                          >
                            <Bot className="h-3 w-3 mr-1" />
                            AI
                          </Button>
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex gap-3 justify-start">
                          <div className="max-w-[80%]">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant={"secondary"}
                                className="flex items-center gap-x-1"
                              >
                                <User size={12} />
                                Customer
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(customerMsg.timestamp)}
                              </span>
                            </div>
                            <Card className="p-0 rounded-md bg-violet-500 text-white">
                              <CardContent className="p-3">
                                <p className="text-sm">{customerMsg.text}</p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                          <div className="max-w-[80%]">
                            <div className="flex items-center gap-2 mb-1 justify-end">
                              <span className="text-xs text-muted-foreground">
                                {formatTime(agentMsg.timestamp)}
                              </span>
                              <Badge
                                variant={"secondary"}
                                className="flex items-center gap-x-1"
                              >
                                <Bot size={12} />
                                Agent
                              </Badge>
                            </div>
                            <Card className="p-0 rounded-md bg-primary/5">
                              <CardContent className="p-3">
                                <p className="text-sm">{agentMsg.text}</p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}

              {dummyCallTranscript.transcript.map((entry, index) => {
                const isPartOfPair = getMessagePairs().some(
                  (pair) =>
                    pair.customerIndex === index || pair.agentIndex === index
                );

                if (isPartOfPair) return null;

                return (
                  <div key={index} className="space-y-3">
                    <div className="flex gap-3 transition-all duration-200 rounded-lg justify-end">
                      <div className="max-w-[80%]">
                        <div className="flex items-center gap-2 mb-1 justify-end">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(entry.timestamp)}
                          </span>
                          <Badge
                            variant={"secondary"}
                            className="flex items-center gap-x-1"
                          >
                            <Bot size={12} />
                            Agent
                          </Badge>
                        </div>
                        <Card className="p-0 rounded-md bg-primary/5">
                          <CardContent className="p-3">
                            <p className="text-sm">{entry.text}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <DialogFooter className="border-t-[1px] border-gray-300 h-fit p-4">
            <div className="flex items-center justify-end gap-x-4">
              <DialogClose>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Download Transcript</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showExplanationDialog}
        onOpenChange={closeExplanationDialog}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Why did the agent respond this way?</DialogTitle>
            <DialogDescription>
              Understanding the reasoning behind the agent&apos;s response
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 min-h-0 space-y-4">
            <ScrollArea className="border rounded-lg p-4 bg-gray-50 min-h-[300px] max-h-[400px] overflow-auto">
              <div className="space-y-4">
                {isAnalyzing && (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-blue-700">
                      Analyzing response...
                    </p>
                  </div>
                )}

                {(isExplaining || explanationComplete) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Bot className="h-3 w-3 text-blue-600" />
                      <span className="text-xs font-medium text-blue-600">
                        AI Agent
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <p className="text-sm text-gray-800">
                        {streamingText}
                        {isExplaining && (
                          <span className="animate-pulse">|</span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {selectedPair &&
                  explanationStates[
                    `${selectedPair.customerMessage.timestamp}-${selectedPair.agentResponse.timestamp}`
                  ]?.feedbackMessages.map((msg) => (
                    <div key={msg.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-medium text-green-600">
                          You
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-800">{msg.text}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter className="flex-shrink-0">
            <div className="w-full flex flex-col items-end">
              <Textarea
                placeholder="Add your feedback about this explanation..."
                value={currentFeedback}
                onChange={(e) => setCurrentFeedback(e.target.value)}
                className="min-h-[80px] text-sm"
                disabled={!explanationComplete}
              />
              <Button
                size="sm"
                onClick={submitExplanationFeedback}
                className="gap-1 mt-3"
                disabled={!explanationComplete || !currentFeedback.trim()}
              >
                <Send className="h-3 w-3" />
                Send Feedback
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
