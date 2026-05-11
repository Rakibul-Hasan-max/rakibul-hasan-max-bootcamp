import prisma from "@/lib/prisma";
import { CreateProjectInput, UpdateProjectInput } from "../validations/project";
import { generateSlug } from "@/lib/utils";

export class ProjectRepository {
  static async findAllByUserId(userId: string) {
    return prisma.project.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      include: {
        template: true,
        _count: {
          select: { pages: true },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  static async findById(id: string, userId: string) {
    return prisma.project.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
      include: {
        template: true,
        pages: true,
      },
    });
  }

  static async create(userId: string, data: CreateProjectInput) {
    const slug = generateSlug(data.name);
    
    return prisma.project.create({
      data: {
        ...data,
        userId,
        slug,
      },
    });
  }

  static async update(id: string, userId: string, data: UpdateProjectInput) {
    return prisma.project.updateMany({
      where: {
        id,
        userId,
      },
      data,
    });
  }

  static async softDelete(id: string, userId: string) {
    return prisma.project.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        isDeleted: true,
      },
    });
  }

  static async duplicate(id: string, userId: string) {
    const original = await this.findById(id, userId);
    if (!original) throw new Error("Project not found");

    const newName = `${original.name} (Copy)`;
    const newSlug = generateSlug(newName);

    return prisma.project.create({
      data: {
        name: newName,
        description: original.description,
        slug: newSlug,
        userId,
        templateId: original.templateId,
        settings: original.settings || {},
      },
    });
  }
}
