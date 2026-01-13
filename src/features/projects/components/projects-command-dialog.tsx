"use client";
import { useRouter } from "next/navigation";
import { useProjects } from "./use-projects";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Folder, FolderCheck, FolderX } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface ProjectCommandDialogProps {
    open : boolean;
    onOpenChange : (open : boolean) => void;
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

export const ProjectsCommandDialog = ({open, onOpenChange} : ProjectCommandDialogProps) => {
    const router = useRouter();
    const projects = useProjects();

    const handleSelect = (projectId: string)=>{
        router.push(`/projects/${projectId}`);
        onOpenChange(false);
    }

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange} description="Search and navigate to your Projects">
            <CommandInput placeholder="Search projects..." />
            <CommandList>
               <CommandEmpty>No Projects Found..</CommandEmpty>
               <CommandGroup id="Projects">
                {projects?.map((project)=>(
                    <CommandItem key={project._id} value={`${project.name}-${project._id}`} onSelect={()=>handleSelect(project._id)}>
                        {getProjectIcon(project)}
                        <span>{project.name}</span>
                    </CommandItem>
                ))}
               </CommandGroup>
            </CommandList>
        </CommandDialog>
    )

};