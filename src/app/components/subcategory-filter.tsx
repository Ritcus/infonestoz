"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Badge } from "@/app/components/ui/badge";

interface SubCategoryFilterProps {
  subCategories: string[];
  selectedSubCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export function SubCategoryFilter({
  subCategories,
  selectedSubCategories,
  onCategoryChange,
}: SubCategoryFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleCategory = (subCategory: string) => {
    if (selectedSubCategories.includes(subCategory.toLowerCase())) {
      onCategoryChange(selectedSubCategories.filter((c) => c !== subCategory.toLowerCase()));
    } else {
      onCategoryChange([...selectedSubCategories, subCategory.toLowerCase()]);
    }
  };

  const clearFilters = () => {
    onCategoryChange([]);
    setOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-purple-200 hover:border-purple-300"
          >
            Categories
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {subCategories?.map((subCategory) => (
            <DropdownMenuCheckboxItem
              key={subCategory}
              checked={selectedSubCategories.includes(subCategory.toLowerCase())}
              onCheckedChange={() => toggleCategory(subCategory)}
            >
              {subCategory}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <div className="p-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Display selected categories as badges */}
      <div className="flex flex-wrap gap-2">
        {selectedSubCategories?.map((subCategory) => (
          <Badge
            key={subCategory}
            variant="secondary"
            className="bg-purple-100 text-purple-900 hover:bg-purple-200 cursor-pointer"
            onClick={() => toggleCategory(subCategory)}
          >
            {subCategory}
            <span className="ml-1">×</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
