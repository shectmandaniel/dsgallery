import "server-only";
import { db } from ".";
import { auth } from "@clerk/nextjs/server";
import { images } from "./schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface DeleteImageFormState {
  errors: {
    _form?: string[];
  };
  success?: boolean;
}

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  return images;
}

export async function getImageById(id: string) {
  console.log("getImageById", id);
  const numId = parseInt(id);
  if (isNaN(numId)) throw new Error("Invalid ID");

  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.id, numId), eq(model.userId, user.userId)),
  });

  if (!image) return null;
  return image;
}

export async function deleteImage(
  imageId: number,
): Promise<DeleteImageFormState> {
  const user = auth();
  if (!user.userId)
    return {
      errors: {
        _form: ["Unauthorized please sign in"],
      },
      success: false,
    };

  const image = await db.query.images.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.id, imageId), eq(model.userId, user.userId)),
  });
  if (!image)
    return {
      errors: {
        _form: ["Image not found"],
      },
      success: false,
    };

  try {
    await db
      .delete(images)
      .where(and(eq(images.id, imageId), eq(images.userId, user.userId)));
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
        success: false,
      };
    } else {
      return {
        errors: {
          _form: ["An error occurred"],
        },
        success: false,
      };
    }
  }
  redirect("/");
}
