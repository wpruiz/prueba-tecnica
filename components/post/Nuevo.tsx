import { useState } from "react";
import { useRouter } from "next/router";
import { handleAddPost } from "@/utils/helpersPosts";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  const handleSubmit = async(event: React.SyntheticEvent) => {
    event.preventDefault();
    if(title && body){
      await handleAddPost({title, body});
      setTitle("");
      setBody("");
      router.push("/listado");
    } 
  };

  return (
    <form onSubmit={handleSubmit} className="border py-2 px-10 flex flex-col rounded shadow hover:shadow-2lg ">
      <div className="flex flex-wrap items-center">
        <label htmlFor="title" className="px-2 font-extrabold">Título:</label>
        <input
          className="text-black my-4 h-10 px-2 border rounded"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
        />
      </div>
      <div className="flex flex-wrap">
        <label  htmlFor="title" className="px-2 font-extrabold">Cuerpo:</label>
        <textarea
          className="text-black my-4 h-10 px-2 border rounded min-h-[100px]"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Agregar Publicación</button>
    </form>
  );
};

export default NewPostForm;
