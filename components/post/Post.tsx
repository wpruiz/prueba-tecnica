import { Post as InterfacePost } from "@/interfaces/Post";
import Link from "next/link";
import { useState } from "react";

const Post = ({
  post,
  handleDelete,
  handleEdit,
}: {
  post: InterfacePost;
  handleDelete: Function;
  handleEdit: Function;
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleEditPost = () => {
    setIsEdit(!isEdit)
    handleEdit({...post, title, body})
  }

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  return (
    <li className="border my-4 lg:m-8 py-4 px-2 rounded shadow hover:shadow-2lg hover:bg-gray-100" key={post.id}>
      {!isEdit ? 
        <Link className="hover:shadow-2xl" href={`/post/${post.id}`}>
          <h2 className="text-xl font-extrabold">{post.title}</h2>
          <p className="mt-2 pl-3 overflow-hidden ">{post.body}</p>
        </Link> :
      <>
        <input
          value={title}
          type="text"
          className="text-black w-full min-h-[40px] text-xl font-extrabold px-2"
          onChange={handleTitle}
        />
        <textarea
          value={body}
          className="text-black w-full min-h-[100px] px-2 mt-1"
          onChange={handleBody}
        />
      </>
    }
    <div className="flex justify-end mt-5">
      { isEdit ? 
      <button className="font-extrabold mx-2 text-blue-600" onClick={handleEditPost}>Guardar</button>
      :
      <button className="font-extrabold mx-2 text-blue-400" onClick={() => setIsEdit(true)}>Editar</button>
    }
      <button className="font-extrabold mx-2 text-red-600"  onClick={() => handleDelete(post.id)}>Eliminar</button>
    </div>
    </li>
  );
};

export default Post;
