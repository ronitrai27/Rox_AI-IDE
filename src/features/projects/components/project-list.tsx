import React from "react";
import { useProjectsPartial } from "./use-projects";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Doc } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Folder, FolderCheck, FolderX } from "lucide-react";

const FormatTimeStamp = (timestamp: number) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

const getProjectIcon = (project: Doc<"projects">) => {
  if (project.importStatus === "completed") {
    return <FolderCheck className="w-4 h-4" />;
  }

  if (project.importStatus === "failed") {
    return <FolderX className="w-4 h-4" />;
  }

  if (project.importStatus === "importing") {
    return <Spinner className="w-4 h-4" />;
  }
  return <Folder className="w-4 h-4" />;
};

interface ProjectsListProps {
  onViewAll: () => void;
}

const ContinueCard = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Last Updated</span>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="h-auto items-start justify-start p-3 rounded flex flex-col gap-2"
      >
        <Link href={`/projects/${data._id}`} className="group">
          <div className="flex items-center gap-2">
            {getProjectIcon(data)}
            <span className="text-sm font-medium group-hover:text-primary truncate">{data.name}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition ml-6" />
          </div>
          <span className="text-xs text-muted-foreground">{FormatTimeStamp(data.updatedAt)}</span>
        </Link>
      </Button>
    </div>
  );
};

const ProjectItem = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <Link href={`/projects/${data._id}`}>
      <div className="flex items-center justify-between py-1 px-3 rounded-md hover:bg-accent cursor-pointer">
        <div className="flex items-center gap-2">
          {getProjectIcon(data)}
          <span className="text-sm font-medium">{data.name}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {FormatTimeStamp(data.updatedAt)}
        </span>
      </div>
    </Link>
  );
};

export const ProjectList = ({ onViewAll }: ProjectsListProps) => {
  const projects = useProjectsPartial(6);

  if (projects === undefined) {
    return <Spinner className="size-6 text-ring mx-auto" />;
  }

  const [mostRecent, ...rest] = projects;
  return (
    <div className="flex flex-col gap-4">
      {mostRecent ? <ContinueCard data={mostRecent} /> : null}
      {rest.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            Recent Projects
            <Button onClick={onViewAll} size="sm" variant="ghost" className="text-xs">
              <span>View All</span>
              <Kbd>ctrl+k</Kbd>
            </Button>
          </div>
          <ul className="flex flex-col gap-2">
            {projects.map((project) => (
              <ProjectItem key={project._id} data={project} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
