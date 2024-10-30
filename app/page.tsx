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

              {/* Middle Column - Recent Emails */}
              <Card className="md:col-span-6 flex flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Recent Emails</h2>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, index) => (
                        <EmailPreview
                          key={index}
                          subject="Project Update Meeting"
                          sender="Sarah Johnson"
                          preview="Hi team, I wanted to share the latest updates..."
                          time="10:30 AM"
                        />
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