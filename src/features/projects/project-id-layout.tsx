"use client";

import { Id } from "../../../convex/_generated/dataModel";
import { Navbar } from "./components/navbar";

export const ProjectIdLayout = ({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: Id<"projects">;
// projectId: string;
}) => {
  return <div>

    <Navbar projectId={projectId} />
    {children}</div>;
};
