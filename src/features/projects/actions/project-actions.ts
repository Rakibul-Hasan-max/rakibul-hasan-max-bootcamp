"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { ProjectRepository } from "../repositories/project-repository";
import { createProjectSchema, updateProjectSchema } from "../validations/project";
import prisma from "@/lib/prisma";

export async function getProjects() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return ProjectRepository.findAllByUserId(session.user.id);
}

export async function createProject(values: any) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized. Please log in again." };

  // Guard against stale JWT: verify the user actually exists in DB
  const userExists = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true },
  });

  if (!userExists) {
    return { error: "Session expired. Please log out and register/log in again." };
  }

  const validatedFields = createProjectSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  try {
    const project = await ProjectRepository.create(session.user.id, validatedFields.data);
    revalidatePath("/projects");
    return { success: "Project created", data: project };
  } catch (error) {
    console.error("[CREATE_PROJECT_ERROR]", error);
    return { error: "Failed to create project. Please try again." };
  }
}

export async function updateProject(id: string, values: any) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const validatedFields = updateProjectSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  try {
    await ProjectRepository.update(id, session.user.id, validatedFields.data);
    revalidatePath("/dashboard/projects");
    return { success: "Project updated" };
  } catch (error) {
    return { error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    await ProjectRepository.softDelete(id, session.user.id);
    revalidatePath("/dashboard/projects");
    return { success: "Project deleted" };
  } catch (error) {
    return { error: "Failed to delete project" };
  }
}

export async function duplicateProject(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const project = await ProjectRepository.duplicate(id, session.user.id);
    revalidatePath("/dashboard/projects");
    return { success: "Project duplicated", data: project };
  } catch (error) {
    return { error: "Failed to duplicate project" };
  }
}
