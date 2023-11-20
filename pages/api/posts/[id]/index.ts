import type { NextApiRequest, NextApiResponse } from 'next'
import { Post as InterfacePost } from '@/interfaces/Post';
import { deletePostDB, getPostDB, updatePostDB } from '@/services/db';

type Data =
  | { message: string }
  | InterfacePost[]
  | InterfacePost

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return await handleGetPostDB(req, res);
    case 'DELETE':
      return await handleDeletePostDB(req, res);
    case 'PUT':
      return await handlePutPostDB(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint no existe' });
  }
}

const handleGetPostDB = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { id } = req.query;
    if(typeof id === "string"){
      const post = await getPostDB(id);
      return res.status(200).json(post);
    }
  } catch (error) {
    console.error('Error al cargar el post:', error);
    return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' });
  }
}

const handleDeletePostDB = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    if(typeof id === "string"){
      const postDeleted = await deletePostDB(id);
      if (!postDeleted) {
        return res.status(404).json({ message: 'El post no fue encontrado.' });
      }
      return res.status(200).json({ message: 'El post ha sido eliminado exitosamente.' });
    }
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    return res.status(500).json({ message: 'Algo salió mal, revisa la consola del servidor.' });
  }
};

const handlePutPostDB = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id, title, body, userId } = req.body;
  try {
    const postUpdated = await updatePostDB({ id, title, body, userId });
    if (!postUpdated) {
      return res.status(404).json({ message: 'El post no fue encontrado.' });
    }
    return res.status(200).json({ message: 'El post ha sido actualizado exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    return res.status(500).json({ message: 'Algo salió mal, revisa la consola del servidor.' });
  }
};
