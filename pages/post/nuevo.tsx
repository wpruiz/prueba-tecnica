import NewPostForm from "@/components/post/Nuevo";

const NuevoPostPage = () => {
  return (
    <main
      className={`flex flex-col items-center justify-between px-6 my-8 mx-auto md:px-24 `}
    >
      <h1 className="mb-8 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-400">+ Nuevo Post</span></h1>
      <NewPostForm />
    </main>
  );
};

export default NuevoPostPage;
