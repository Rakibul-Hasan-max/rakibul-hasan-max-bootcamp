"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function savePageContent(projectId: string, content: any) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Check if project belongs to user
    const project = await prisma.project.findUnique({
      where: { id: projectId, userId: session.user.id },
    });

    if (!project) return { error: "Project not found" };

    // Update the main page (for now, we assume there's one page per project in this MVP)
    // In a real app, you'd specify the pageId
    const page = await prisma.page.findFirst({
      where: { projectId },
    });

    if (page) {
      await prisma.page.update({
        where: { id: page.id },
        data: { content },
      });
    } else {
      await prisma.page.create({
        data: {
          name: "Home",
          slug: "home",
          projectId,
          content,
        },
      });
    }

    revalidatePath(`/editor/${projectId}`);
    return { success: "Page saved successfully" };
  } catch (error) {
    console.error("Save error:", error);
    return { error: "Failed to save page" };
  }
}

export async function getPageContent(projectId: string) {
  try {
    const page = await prisma.page.findFirst({
      where: { projectId },
    });
    return page?.content || null;
  } catch (error) {
    return null;
  }
}
