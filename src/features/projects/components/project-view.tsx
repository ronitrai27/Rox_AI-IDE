"use client";

import { Github, LucideSparkle, Pyramid } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { ProjectList } from "./project-list";
import { useCreateProjects } from "./use-projects";
import {
  adjectives,
  animals,
  colors,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { useEffect, useState } from "react";
import { ProjectsCommandDialog } from "./projects-command-dialog";
import Image from "next/image";

export const ProjectView = () => {
  const createProjects = useCreateProjects();
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          setCommandDialogOpen(true);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <ProjectsCommandDialog
        open={commandDialogOpen}
        onOpenChange={setCommandDialogOpen}
      />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-16">
        <div className="flex flex-col gap-5 mx-auto max-w-[440px]  w-full">
          <div className="flex items-center justify-center gap-5 mb-5">
            {/* <Pyramid className="w-10 h-10" /> */}
            <div>
              <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
            />
            </div>
            <h1
              className={cn("text-3xl md:text-4xl font-semibold font-poppins ")}
            >
              Rox -{" "}
              <span className="font-serif tracking-tight text-muted-foreground">
                Agentic IDE{" "}
              </span>
            </h1>
          </div>
          <div className="flex gap-4 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const projectName = uniqueNamesGenerator({
                  dictionaries: [adjectives, colors, animals, names],
                  length: 3,
                  style: "capital",
                  separator: "-",
                });
                createProjects({ name: projectName });
              }}
              className="cursor-pointer p-3 flex flex-col gap-5 h-full flex-1 items-start justify-start"
            >
              <div className="w-full flex items-center justify-between">
                <LucideSparkle className="w-4 h-4" />
                <Kbd>ctrl+j</Kbd>
              </div>
              <div>
                <p className="text-sm">New</p>
              </div>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer p-3 flex flex-col gap-5 h-full items-start justify-start flex-1"
            >
              <div className="w-full flex items-center justify-between">
                <Github className="w-4 h-4" />
                <Kbd>ctrl+i</Kbd>
              </div>
              <div>
                <p className="text-sm">Import</p>
              </div>
            </Button>
          </div>

          <ProjectList onViewAll={() => setCommandDialogOpen(true)} />
        </div>
      </div>
    </>
  );
};
