"use client";

import { Id } from "../../../convex/_generated/dataModel";
import { Navbar } from "./components/navbar";

import { Allotment } from "allotment";
import "allotment/dist/style.css";

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 400;
const DEFAULT_MAIN_SIZE = 1000;
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 400;

export const ProjectIdLayout = ({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: Id<"projects">;
  // projectId: string;
}) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar projectId={projectId} />
      <div className="flex-1 relative">
        <Allotment
          className="flex-1"
          defaultSizes={[DEFAULT_MAIN_SIZE, DEFAULT_CONVERSATION_SIDEBAR_WIDTH]}
        >
          <Allotment.Pane
            snap
            minSize={MIN_SIDEBAR_WIDTH}
            maxSize={MAX_SIDEBAR_WIDTH}
            preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
          >
            {" "}
            <div className="bg-sidebar h-full border-r">conversation sidebar</div>
          </Allotment.Pane>
          <Allotment.Pane>
            <div className="h-full">
              {children}
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
};
