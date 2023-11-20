import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Post as PostInterface } from "@/interfaces/Post";
import Image from "next/image";
import { Photo as PhotoInterface } from "@/interfaces/Photo";
import { getPostJPH } from "@/services/jsonPlaceHolder";
import { getPhotoUnsplash } from "@/services/unsplash";
import { getPostDB } from "@/services/db";

export const getServerSideProps = (async (context) => {
  const { id } = context.params as { id: string };
  try {
    let post= await getPostJPH(id)
    if (!post) post = await getPostDB(id)
    const photo = await  getPhotoUnsplash()
    if (post && photo) {
      return {
        props: {
          post,
          photo,
        },
      };
    }
    return {
      notFound: true,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<{
  post: PostInterface;
  photo: PhotoInterface;
}>;

const PostPage = ({
  post,
  photo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main
      className={`flex flex-col items-center justify-between px-6 my-8 mx-auto md:px-24 `}
    >
      <h1 className="mb-8 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-400">+ Detalle </span>del post</h1>
      <div className="flex flex-col items-center max-w-[700px] rounded-lg border shadow hover:shadow-2lg ">
        <h1 className="text-2xl lg:text-3xl font-extrabold my-5 px-4 text-center">{post.title}</h1>
        <div className="rounded-md">
          {photo ? (
            <Image
              src={photo?.urls.thumb}
              alt={post.title}
              width={200}
              height={photo.height}
              className="rounded-md"
            />
          ) : (
            ""
          )}
        </div>
        <div className="p-8">
          <p className="font-extrabold text-2xl my-4">Contenido:</p>
          <p className="break-words text-start">{post.body.toString()}</p>
        </div>
      </div>
    </main>
  );
};

export default PostPage;
