"use server";

import { revalidatePath } from "next/cache";
import { updatePostLikeStatus } from "./posts";

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
}
