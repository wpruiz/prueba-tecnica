import { pool } from '@/config/db';
import { Post as InterfacePost } from '@/interfaces/Post';

export const getPostsDB = async (): Promise<InterfacePost[]> => {
  try {
    const rowsDataPacket = await pool.query<InterfacePost[]>("SELECT * FROM post ORDER BY createdAt DESC");
    return rowsDataPacket.map((rowDataPacket): InterfacePost => {
      return {
        id: rowDataPacket.id,
        userId: rowDataPacket.userId,
        title: rowDataPacket.title,
        body: rowDataPacket.body,
      }
    })
  } catch (error) {
    console.error('Error al consultar los posts:', error);
    throw error;
  }
};

export const getPostDB = async (
  id: string
): Promise<InterfacePost> => {
  try {
    const rowDataPacket = await pool.query<InterfacePost[]>(
      "SELECT * FROM post WHERE id = ?",
      [id]
    );
    return {
      id: rowDataPacket[0].id,
      userId: rowDataPacket[0].userId,
      title: rowDataPacket[0].title,
      body: rowDataPacket[0].body,
    }
  } catch (error) {
    console.error('Error al consultar el post:', error);
    throw error;
  }
};

export const createPostDB = async (post: InterfacePost): Promise<number | null> => {
  try {
    const result = await pool.query('INSERT INTO post SET ?', post);
    return result ? post.id : null;
  } catch (error) {
    console.error('Error al crear el post:', error);
    throw error;
  }
};

export const deletePostDB = async (id: number | string): Promise<boolean> => {
  try {
    const result = await pool.query('DELETE FROM post WHERE id = ?', [id]);
    return result ? true : false;
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    throw error;
  }
};

export const updatePostDB = async (post: InterfacePost): Promise<boolean> => {
  try {
    const { id, userId, title, body } = post;
    const result = await pool.query(
      'UPDATE post SET userId = ?, title = ?, body = ? WHERE id = ?',
      [userId, title, body, id]
    );
    return result ? true : false;
  } catch (error) {
    console.error('Error al actualizar el post:', error);
    throw error;
  }
};