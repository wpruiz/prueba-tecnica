import type { NextApiRequest, NextApiResponse } from 'next'
import { Post as InterfacePost } from '@/interfaces/Post';
import { createPostDB, getPostDB, getPostsDB } from '@/services/db';
type Data =
  | { message: string }
  | InterfacePost[]
  | InterfacePost

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return await handleGetPostsDB(req, res);
    case 'POST':
      return await handlePostPostDB(req, res);
    default:
      return res.status(400).json({ message: 'Endpoint no existe' });
  }
}

const handleGetPostsDB = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const posts = await getPostsDB();
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error al cargar los posts:', error);
    return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' });
  }
}

const handlePostPostDB = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { title, body, id, userId } = req.body;
  try {
    await createPostDB({ title, body, id, userId });
    return res.status(201).json({ message: 'El post ha sido agregado exitosamente.' });
  } catch (error) {
    console.error('Error al agregar el post:', error);
    return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' });
  }
}