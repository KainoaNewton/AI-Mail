"use client";

import { useState } from "react";
import { X, InboxIcon, Star, Archive, Trash2, Tag, Filter, CircleDot, Circle, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import EmailPreview from "./email-preview";
import EmailView from "./email-view";

interface InboxPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterType = "inbox" | "unread" | "read" | "starred" | "archived" | "trash";
type TagType = "Work" | "Personal" | "Projects" | "Updates";

export default function InboxPanel({ isOpen, onClose }: InboxPanelProps) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("inbox");
  const [activeTags, setActiveTags] = useState<TagType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { icon: InboxIcon, label: "inbox", count: 24 },
    { icon: CircleDot, label: "unread", count: 12 },
    { icon: Circle, label: "read", count: 12 },
    { icon: Star, label: "starred", count: 5 },
    { icon: Archive, label: "archived", count: 123 },
    { icon: Trash2, label: "trash", count: 3 },
  ] as const;

  const tags = [
    { color: "bg-blue-500", label: "Work" as TagType, count: 15 },
    { color: "bg-green-500", label: "Personal" as TagType, count: 8 },
    { color: "bg-purple-500", label: "Projects" as TagType, count: 12 },
    { color: "bg-yellow-500", label: "Updates" as TagType, count: 5 },
  ] as const;

  const emailsByFilter: Record<FilterType, Array<{
    id: number;
    subject: string;
    sender: string;
    preview: string;
    time: string;
    tags: TagType[];
    isUnread: boolean;
  }>> = {
    inbox: Array(24).fill(null).map((_, i) => ({
      id: i,
      subject: "Weekly Newsletter",
      sender: "Tech Updates",
      preview: "Discover the latest trends in AI and technology...",
      time: "2 hours ago",
      tags: [i % 2 === 0 ? "Work" : "Personal", i % 3 === 0 ? "Projects" : "Updates"],
      isUnread: i % 2 === 0
    })),
    unread: Array(12).fill(null).map((_, i) => ({
      id: i,
      subject: "Unread Message",
      sender: "Important Sender",
      preview: "This message requires your attention...",
      time: "1 hour ago",
      tags: [i % 2 === 0 ? "Work" : "Personal"],
      isUnread: true
    })),
    read: Array(12).fill(null).map((_, i) => ({
      id: i,
      subject: "Read Message",
      sender: "Regular Sender",
      preview: "This message has been read...",
      time: "3 hours ago",
      tags: [i % 2 === 0 ? "Projects" : "Updates"],
      isUnread: false
    })),
    starred: Array(5).fill(null).map((_, i) => ({
      id: i,
      subject: "Important Update",
      sender: "Project Lead",
      preview: "Please review the latest changes to the project...",
      time: "1 day ago",
      tags: ["Projects", "Work"],
      isUnread: i % 3 === 0
    })),
    archived: Array(123).fill(null).map((_, i) => ({
      id: i,
      subject: "Past Discussion",
      sender: "Team Member",
      preview: "Regarding the previous meeting outcomes...",
      time: "1 week ago",
      tags: [i % 2 === 0 ? "Personal" : "Work"],
      isUnread: false
    })),
    trash: Array(3).fill(null).map((_, i) => ({
      id: i,
      subject: "Deleted Item",
      sender: "Various",
      preview: "This email has been moved to trash...",
      time: "1 month ago",
      tags: ["Updates"],
      isUnread: false
    })),
  };

  const filteredEmails = emailsByFilter[activeFilter]
    .filter(email => 
      activeTags.length === 0 || activeTags.some(tag => email.tags.includes(tag))
    )
    .filter(email => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        email.subject.toLowerCase().includes(query) ||
        email.sender.toLowerCase().includes(query) ||
        email.preview.toLowerCase().includes(query)
      );
    });

  const handleTagClick = (tag: TagType) => {
    setActiveTags(currentTags => {
      const tagIndex = currentTags.indexOf(tag);
      if (tagIndex === -1) {
        return [...currentTags, tag];
      } else {
        return currentTags.filter(t => t !== tag);
      }
    });
  };

  const clearFilters = () => {
    setActiveFilter("inbox");
    setActiveTags([]);
  };

  const hasActiveFilters = activeFilter !== "inbox" || activeTags.length > 0;

  return (
    <div
      className={cn(
        "fixed inset-0 bg-background transform transition-transform duration-300 ease-in-out overflow-hidden",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold capitalize">
                {activeTags.length > 0 
                  ? `${activeTags.join(", ")} - ${activeFilter}` 
                  : activeFilter}
              </h2>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear filters
                </Button>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-12 flex-1 min-h-0">
          {/* Sidebar */}
          <div className="md:col-span-2 space-y-6 overflow-auto">
            {/* Filters */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </div>
              {filters.map((filter) => (
                <Button
                  key={filter.label}
                  variant={activeFilter === filter.label ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    activeFilter === filter.label && "bg-muted"
                  )}
                  onClick={() => setActiveFilter(filter.label)}
                >
                  <filter.icon className="h-4 w-4" />
                  <span className="capitalize">{filter.label}</span>
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
                  variant={activeTags.includes(tag.label) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    activeTags.includes(tag.label) && "bg-muted"
                  )}
                  onClick={() => handleTagClick(tag.label)}
                >
                  <div className={`h-2 w-2 rounded-full ${tag.color}`} />
                  <span>{tag.label}</span>
                  <span className="ml-auto text-muted-foreground">
                    {tag.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Email List and View */}
          <div className="md:col-span-10 min-h-0">
            <Card className="h-full flex flex-col">
              {selectedEmail ? (
                <EmailView
                  email={selectedEmail}
                  onBack={() => setSelectedEmail(null)}
                />
              ) : (
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    {filteredEmails.map((email) => (
                      <EmailPreview
                        key={email.id}
                        subject={email.subject}
                        sender={email.sender}
                        preview={email.preview}
                        time={email.time}
                        tags={email.tags}
                        isUnread={email.isUnread}
                        onClick={() => setSelectedEmail(`email-${email.id}`)}
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