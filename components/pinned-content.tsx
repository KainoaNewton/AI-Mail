"use client";

import { Pin } from "lucide-react";
import EmailPreview from "./email-preview";

export default function PinnedContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Pin className="h-4 w-4" />
        <span>Pinned</span>
      </div>
      {[...Array(3)].map((_, index) => (
        <EmailPreview
          key={index}
          subject="Important Meeting Notes"
          sender="Team Lead"
          preview="Here are the key points from today's meeting..."
          time="Yesterday"
        />
      ))}
    </div>
  );
}