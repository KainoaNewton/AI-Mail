"use client";

import { useState } from "react";
import { Mail, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmailPreview from "@/components/email-preview";
import PinnedContent from "@/components/pinned-content";
import AISuggestions from "@/components/ai-suggestions";
import SearchBar from "@/components/search-bar";
import InboxPanel from "@/components/inbox-panel";

const importantEmails = [
  {
    id: 1,
    title: "Project Launch",
    summary: "Final timeline and resource allocation for the Q4 product launch. Team roles and key milestones defined.",
    from: "Project Manager - Sarah Chen"
  },
  {
    id: 2,
    title: "Budget Review",
    summary: "Q3 financial performance exceeded expectations. New budget allocations proposed for upcoming initiatives.",
    from: "Finance Director - Michael Ross"
  },
  {
    id: 3,
    title: "Client Meeting",
    summary: "Key points from Enterprise client discussion. New requirements and timeline adjustments needed.",
    from: "Account Manager - David Kim"
  },
  {
    id: 4,
    title: "Team Updates",
    summary: "Weekly progress report on ongoing projects. Several milestones achieved ahead of schedule.",
    from: "Team Lead - Emma Watson"
  },
  {
    id: 5,
    title: "Security Alert",
    summary: "Important security protocol updates. All team members required to update credentials by Friday.",
    from: "IT Security - James Wilson"
  },
  {
    id: 6,
    title: "Strategy Review",
    summary: "Annual strategy meeting outcomes. New market opportunities identified for Q1 next year.",
    from: "CEO - Lisa Martinez"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden bg-background">
      {/* Main Content */}
      <main className="h-full">
        <div className="container mx-auto p-4 h-full flex flex-col">
          {/* Header */}
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center gap-2">
              <Mail className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">AI Mail</h1>
            </div>
            <SearchBar onSearch={setSearchQuery} />
          </header>

          {/* Content Grid */}
          <ScrollArea className="flex-1 h-[calc(100vh-12rem)]">
            <div className="flex-1 grid gap-6 md:grid-cols-12 p-4">
              {/* Left Column - Pinned */}
              <Card className="md:col-span-3 flex flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    <PinnedContent />
                  </div>
                </ScrollArea>
              </Card>

              {/* Middle Column - Important Emails */}
              <Card className="md:col-span-6 flex flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Important</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {importantEmails.map((email) => (
                        <div
                          key={email.id}
                          className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => setIsInboxOpen(true)}
                        >
                          <h3 className="font-semibold text-lg mb-2">{email.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {email.summary}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {email.from}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </Card>

              {/* Right Column - AI Suggestions */}
              <Card className="md:col-span-3 flex flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    <AISuggestions />
                  </div>
                </ScrollArea>
              </Card>
            </div>

            {/* Inbox Button */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
              <Button
                size="lg"
                className="rounded-full px-6 gap-2 shadow-lg"
                onClick={() => setIsInboxOpen(true)}
              >
                <ChevronDown className="h-4 w-4" />
                Inbox
              </Button>
            </div>
          </ScrollArea>
        </div>
      </main>

      {/* Sliding Inbox Panel */}
      <InboxPanel isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} />
    </div>
  );
}