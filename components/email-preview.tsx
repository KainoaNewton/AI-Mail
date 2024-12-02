"use client";

import { Star, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmailPreviewProps {
  subject: string;
  sender: string;
  preview: string;
  time: string;
  tags?: string[];
  isUnread?: boolean;
  onClick: () => void;
}

export default function EmailPreview({
  subject,
  sender,
  preview,
  time,
  tags,
  isUnread,
  onClick,
}: EmailPreviewProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer",
        isUnread && "bg-muted/30"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className={cn("font-semibold", isUnread && "font-bold")}>
          {isUnread && <span className="mr-2 text-primary">●</span>}
          {subject}
        </h3>
        <span className="text-sm text-muted-foreground">{time}</span>
      </div>
      <p className={cn(
        "text-sm font-medium text-muted-foreground mb-2",
        isUnread && "text-foreground font-semibold"
      )}>
        {sender}
      </p>
      <p className="text-sm text-muted-foreground mb-2">{preview}</p>
      {tags && tags.length > 0 && (
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}