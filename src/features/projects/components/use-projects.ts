import { useMutation, useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";

export const useProjects = () => {
  return useQuery(api.projects.get);
};

export const useProjectsPartial = (limit: number) => {
  return useQuery(api.projects.getPartial, {
    limit,
  });
};

export const useCreateProjects = () => {
//   const { userId } = useAuth();
  return useMutation(api.projects.create).withOptimisticUpdate(
    (localStorage, args) => {
      const existingProjects = localStorage.getQuery(api.projects.get);

      if (existingProjects !== undefined) {
        const now = Date.now();
        const newProject = {
          _id: crypto.randomUUID() as Id<"projects">,
          name: args.name,
          _creationTime: now,
          ownerId: "anonymous",
          updatedAt: now,
        };

        localStorage.setQuery(api.projects.get, {}, [
          newProject,
          ...existingProjects,
        ]);
      }
    }
  );
};
