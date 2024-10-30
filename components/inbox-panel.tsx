"use client";

import { useState } from "react";
import { X, Inbox, Star, Archive, Trash2, Tag, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import EmailPreview from "./email-preview";
import EmailView from "./email-view";

interface InboxPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InboxPanel({ isOpen, onClose }: InboxPanelProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const filters = [
    { icon: Inbox, label: "Inbox", count: 24 },
    { icon: Star, label: "Starred", count: 5 },
    { icon: Archive, label: "Archived", count: 123 },
    { icon: Trash2, label: "Trash", count: 3 },
  ];

  const tags = [
    { color: "bg-blue-500", label: "Work" },
    { color: "bg-green-500", label: "Personal" },
    { color: "bg-purple-500", label: "Projects" },
    { color: "bg-yellow-500", label: "Updates" },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 bg-background transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto p-4 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Inbox</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-12 h-[calc(100vh-8rem)]">
          {/* Sidebar */}
          <div className="md:col-span-2 space-y-6">
            {/* Filters */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </div>
              {filters.map((filter) => (
                <Button
                  key={filter.label}
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <filter.icon className="h-4 w-4" />
                  <span>{filter.label}</span>
                  <span className="ml-auto text-muted-foreground">
                    {filter.count}
                  </span>
                </Button>
              ))}
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Tag className="h-4 w-4" />
                <span>Tags</span>
              </div>
              {tags.map((tag) => (
                <Button
                  key={tag.label}
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <div className={`h-2 w-2 rounded-full ${tag.color}`} />
                  <span>{tag.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Email List and View */}
          <div className="md:col-span-10">
            <Card className="h-full">
              {selectedEmail ? (
                <EmailView
                  email={selectedEmail}
                  onBack={() => setSelectedEmail(null)}
                />
              ) : (
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {[...Array(10)].map((_, index) => (
                      <EmailPreview
                        key={index}
                        subject="Weekly Newsletter"
                        sender="Tech Updates"
                        preview="Discover the latest trends in AI and technology..."
                        time="2 hours ago"
                        onClick={() => setSelectedEmail(`email-${index}`)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}