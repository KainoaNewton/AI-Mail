"use client";

import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AISuggestions() {
  const suggestions = [
    {
      title: "Follow up with Client",
      description: "No response received in 3 days",
      action: "Remind me",
    },
    {
      title: "Unsubscribe Newsletter",
      description: "Low engagement detected",
      action: "Review",
    },
    {
      title: "Archive Old Emails",
      description: "50+ unread from last month",
      action: "Clean up",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        <span>AI Suggestions</span>
      </div>
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-accent/50 rounded-lg p-3 space-y-2"
          >
            <h3 className="font-medium">{suggestion.title}</h3>
            <p className="text-sm text-muted-foreground">
              {suggestion.description}
            </p>
            <Button variant="secondary" size="sm">
              {suggestion.action}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}