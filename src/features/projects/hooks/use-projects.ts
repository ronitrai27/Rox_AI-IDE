import { useMutation, useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";

export const useProjectById = (projectId: Id<"projects">) => {
  const { userId } = useAuth();
  return useQuery(api.projects.getById, { id: projectId });
};

export const useProjects = () => {
  return useQuery(api.projects.get);
};

export const useProjectsPartial = (limit: number) => {
  return useQuery(api.projects.getPartial, {
    limit,
  });
};

export const useCreateProjects = () => {
  return useMutation(api.projects.create)
  // .withOptimisticUpdate(
  //   (localStorage, args) => {
  //     const existingProjects = localStorage.getQuery(api.projects.get);

  //     if (existingProjects !== undefined) {
  //       const now = Date.now();
  //       const newProject = {
  //         _id: crypto.randomUUID() as Id<"projects">,
  //         name: args.name,
  //         _creationTime: now,
  //         ownerId: "anonymous",
  //         updatedAt: now,
  //       };

  //       localStorage.setQuery(api.projects.get, {}, [
  //         newProject,
  //         ...existingProjects,
  //       ]);
  //     }
  //   }
  // );
};

export const useRenameProject = (projectId: Id<"projects">) => {
  return useMutation(api.projects.rename)
  // .withOptimisticUpdate(
  //   (localStorage, args) => {
  //     const existingProjects = localStorage.getQuery(api.projects.getById, {
  //       id: projectId,
  //     });
  //     if (existingProjects !== undefined && existingProjects !== null) {
  //       localStorage.setQuery(
  //         api.projects.getById,
  //         {
  //           id: projectId,
  //         },
  //         {
  //           ...existingProjects,
  //           name: args.name,
  //           updatedAt: Date.now(),
  //         }
  //       );
  //     }
  //   }
  // );
};
