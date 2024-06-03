import PostForm from "@/components/post-form";
import { uploadImage } from "@/lib/cloudinary";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function NewPostPage() {
  async function createPost(formData) {
    "use server";
    const title = formData.get("title");
    const image = formData.get("image");
    const content = formData.get("content");

    let imageUrl;

    try {
      imageUrl = await uploadImage(image);
    } catch (error) {
      throw new Error("Failed to upload image");
    }

    await storePost({
      imageUrl: imageUrl,
      title,
      content,
      userId: 1,
    });

    revalidatePath("/", "layout");
    redirect("/feed");
  }

  return <PostForm onSubmit={createPost} />;
}
