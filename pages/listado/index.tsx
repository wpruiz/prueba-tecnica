import React, { useState } from "react";
import Link from "next/link";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Post as PostInterface } from "@/interfaces/Post";
import Post from "@/components/post/Post";
import { getPostsJPH } from "@/services/jsonPlaceHolder";
import { getPostsDB } from "@/services/db";
import { makeDeleteRequest, makePutRequest } from "@/utils/httpAdapterAxios";

export const getServerSideProps = (async (context) => {
  try {
    const postLocal = await getPostsDB();
    const response = await getPostsJPH(1)
    const initialPosts = [...postLocal, ...response];
    return {
      props: {
        initialPosts,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<{
  initialPosts: PostInterface[];
}>;

const ListadoPage = ({
  initialPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [posts, setPosts] = useState<PostInterface[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMoreData = async() => {
    const response = await getPostsJPH(page + 1)
    setPosts([...posts, ...response]);
    setPage(page + 1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setSearchTerm(event.target.value);
  };

  const handleDelete = async(postIdToDelete: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postIdToDelete);
    if(updatedPosts.length){
      await makeDeleteRequest(`/api/posts/${postIdToDelete}`)
    }
    return setPosts(updatedPosts);
  };

  const handleEdit = async(postIdToEdit: PostInterface) => {
    const updatedPosts = posts.map((post) => {
      if(post.id === postIdToEdit.id) return postIdToEdit
      return post
    });
    if(updatedPosts.length){
      await makePutRequest(`/api/posts/${postIdToEdit.id}`, postIdToEdit)
    }
    return setPosts(updatedPosts)
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main
      className={`flex flex-col items-center justify-between px-6 my-8 mx-auto md:px-24 `}
    >
      <h1 className="mb-8 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-400">Lista de Publicaciones</span></h1>
      <Link className="text-4xl my-3 font-extrabold hover:underline "href="/post/nuevo">+ Nuevo post</Link>
      
      <div className="self-end">
        <label htmlFor="search" className="px-2 font-extrabold">Buscar:</label>
        <input
          className="text-black my-4 h-10 px-2 border rounded"
          type="text"
          placeholder="Buscar publicaciones..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {searchTerm.length > 0 ? (
        <ul className="my-4">
          {filteredPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </ul>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Cargando...</h4>}
        >
          <ul className="my-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </main>
  );
};

export default ListadoPage;
