"use client";

import { ArrowLeft, Star, Archive, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmailViewProps {
  email: string;
  onBack: () => void;
}

export default function EmailView({ email, onBack }: EmailViewProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Email Header */}
      <div className="border-b p-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Important Project Update</h2>
            <p className="text-sm text-muted-foreground">From: sarah@example.com</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                <DropdownMenuItem>Forward</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Email Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <p className="text-sm leading-relaxed">
            Hi Team,<br /><br />
            I hope this email finds you well. I wanted to share some important updates
            regarding our ongoing project.<br /><br />
            We've made significant progress in the last sprint, and I'm pleased to
            announce that we're ahead of schedule. Here are the key points we'll be
            discussing in tomorrow's meeting:<br /><br />
            1. Sprint completion status<br />
            2. Next phase planning<br />
            3. Resource allocation<br />
            4. Timeline adjustments<br /><br />
            Please review the attached documents before our meeting.<br /><br />
            Best regards,<br />
            Sarah
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}