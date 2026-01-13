"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useProjectById, useRenameProject } from "../hooks/use-projects";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CloudCheck, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const Navbar = ({
  projectId,
}: {
  projectId: Id<"projects">;
  // projectId: string;
}) => {
  const project = useProjectById(projectId);
  const renameProject = useRenameProject(projectId);

  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState("");

  const handleStartRename = () => {
    if (!project) return;
    setIsRenaming(true);
    setName(project.name);
  };

  const handleSubmit = () => {
    if (!project) return;
    setIsRenaming(false);

    const trimmedName = name.trim();
    if (trimmedName === "") return;
    if (trimmedName === project.name) return;

    renameProject({ id: projectId, name: trimmedName });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsRenaming(false);
    }
  };

  return (
    <nav className="flex items-center justify-between gap-x-2 p-2 bg-muted border-b">
      <div className="flex items-center gap-x-3">
        <Breadcrumb>
          <BreadcrumbList className="gap-0!">
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center" asChild>
                <Button variant="ghost" className="">
                  <Link href="/" className="flex items-center gap-x-1.5">
                    <Image src="/logo.svg" alt="Logo" width={30} height={30} />
                    <span className="text-lg text-primary font-semibold">
                      ROX
                    </span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="ml-0! mr-3" />
            <BreadcrumbItem>
              {isRenaming ? (
                <Input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => {}}
                  onKeyDown={handleKeyDown}
                  className="bg-card text-sm outline-none"
                />
              ) : (
                <BreadcrumbPage
                  onClick={handleStartRename}
                  className="text-sm cursor-pointer font-medium max-w-40 truncate hover:animate-pulse duration-200 hover:text-primary hover:scale-105 transition-all"
                >
                  {project?.name ?? "Loading..."}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {project?.importStatus === "importing" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Loader2 className="w-4 h-4 animate-spin" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Importing project...</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          project?.updatedAt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <CloudCheck className="w-5 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Saved {formatDistanceToNow(project.updatedAt)}</p>
              </TooltipContent>
            </Tooltip>
          )
        )}
      </div>

      <UserButton />
    </nav>
  );
};
