import { Post as PostInterface } from "@/interfaces/Post";
import { makeGetRequest, makePostRequest } from "./httpAdapterAxios";

export const handleAddPost = async({ title, body }: { title: string, body: string }) => {
  let id = 100
  const posts = await makeGetRequest<PostInterface[]>("/api/posts")
  if (posts?.length){
    id = posts[0].id
  }
  await makePostRequest<PostInterface[]>("/api/posts/", {title, body, id: id + 1, userId: 1})
};

