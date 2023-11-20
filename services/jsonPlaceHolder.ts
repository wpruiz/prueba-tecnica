import { Post as InterfacePost } from '@/interfaces/Post';
import { makeGetRequest } from '@/utils/httpAdapterAxios';

export const getPostsJPH = async (
  page: number
): Promise<InterfacePost[]> => {
  const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  const response = await makeGetRequest<InterfacePost[] | null>(url, {})
  return response ? response : []
}

export const getPostJPH = async (
  id: string
): Promise<InterfacePost | null> => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  const response = await makeGetRequest<InterfacePost | null>(url, {})
  return response
}