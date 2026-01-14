"use client";
import React, { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Brain, LucideGithub } from "lucide-react";

const Tab = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex text-center gap-2 h-full px-5 py-2 cursor-pointer text-muted-foreground border-r border-accent hover:bg-accent/30",
        isActive && "bg-accent/70 text-foreground"
      )}
    >
      <span className="text-sm">{label}</span>
    </div>
  );
};

const ProjectIdView = ({ projectId }: { projectId: Id<"projects"> }) => {
  const [activeView, setActiveView] = useState<"editor" | "preview">("editor");
  return (
    <div className="h-full flex flex-col">
      <nav className="h-10 flex items-center bg-sidebar border-b">
        <Tab
          label="Code"
          isActive={activeView === "editor"}
          onClick={() => setActiveView("editor")}
        />
        <Tab
          label="Preview"
          isActive={activeView === "preview"}
          onClick={() => setActiveView("preview")}
        />

        <div className="flex-1 flex justify-end pr-10 h-full">
          {/* AI button */}
          <div className="flex items-center gap-2 px-5 bg-orange-600/70 text-sm h-full border-l border-accent hover:bg-accent/30">
            <Brain className="w-4 h-4" />
            AI
          </div>
          {/* gITHUB button */}
          <div className="flex items-center gap-2 px-3 text-sm h-full border-l border-r border-accent hover:bg-accent/30">
            <LucideGithub className="w-4 h-4" />
            Export
          </div>
        </div>
      </nav>

      <div className="flex-1 relative">
        {/* editor */}
        <div
          className={cn(
            "absolute inset-0",
            activeView === "editor" ? "visible" : "invisible"
          )}
        >
          <div>editor</div>
        </div>
        {/* preview */}
        <div
          className={cn(
            "absolute inset-0",
            activeView === "preview" ? "visible" : "invisible"
          )}
        >
          <div>preview</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdView;
