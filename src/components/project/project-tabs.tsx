"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectMasterTab } from "@/components/project/project-master-tab";
import { ProjectOrgTab } from "@/components/project/project-org-tab";
import { ProjectWbsTab } from "@/components/project/project-wbs-tab";
import { ProjectOutputTab } from "@/components/project/project-output-tab";
import { ProjectOpenIssueTab } from "@/components/project/project-open-issue-tab";
import type { Project } from "@/types/project";

interface ProjectTabsProps {
  project: Project;
}

export function ProjectTabs({ project }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="master">
      <TabsList>
        <TabsTrigger value="master">프로젝트 Master</TabsTrigger>
        <TabsTrigger value="org">조직</TabsTrigger>
        <TabsTrigger value="wbs">WBS</TabsTrigger>
        <TabsTrigger value="output">산출물</TabsTrigger>
        <TabsTrigger value="issue">Open-Issue</TabsTrigger>
      </TabsList>

      <TabsContent value="master" className="mt-4">
        <ProjectMasterTab project={project} />
      </TabsContent>

      <TabsContent value="org" className="mt-4">
        <ProjectOrgTab project={project} />
      </TabsContent>

      <TabsContent value="wbs" className="mt-4">
        <ProjectWbsTab project={project} />
      </TabsContent>

      <TabsContent value="output" className="mt-4">
        <ProjectOutputTab />
      </TabsContent>

      <TabsContent value="issue" className="mt-4">
        <ProjectOpenIssueTab />
      </TabsContent>
    </Tabs>
  );
}
