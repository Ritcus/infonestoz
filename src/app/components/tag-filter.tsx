"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Tag } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Badge } from "@/app/components/ui/badge";
import { Checkbox } from "@/app/components/ui/checkbox";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Input } from "@/app/components/ui/input";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
}

export function TagFilter({ tags, selectedTags, onTagChange }: TagFilterProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagChange([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    onTagChange([]);
    setSearchQuery("");
  };

  const removeTag = (tag: string) => {
    onTagChange(selectedTags.filter((t) => t !== tag));
  };

  // Filter tags based on search query
  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-purple-200 hover:border-purple-300"
          >
            <Tag className="mr-2 h-4 w-4" />
            Tags
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Search input */}
          <div className="px-2 py-1.5">
            <Input
              ref={searchInputRef}
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 text-sm"
            />
          </div>

          <DropdownMenuSeparator />

          {/* Scrollable tag list */}
          <ScrollArea className="h-60">
            <div className="p-2">
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2 py-1.5">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {tag}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-2 text-center">
                  No tags found
                </p>
              )}
            </div>
          </ScrollArea>

          <DropdownMenuSeparator />

          {/* Actions */}
          <div className="p-2 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              disabled={selectedTags.length === 0}
            >
              Clear All
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
              className="bg-purple-900 hover:bg-purple-800"
            >
              Apply
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Display selected tags as badges */}
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-purple-100 text-purple-900 hover:bg-purple-200 cursor-pointer flex items-center gap-1"
          >
            {tag}
            <X className="h-3 w-3" onClick={() => removeTag(tag)} />
          </Badge>
        ))}
      </div>
    </div>
  );
}
