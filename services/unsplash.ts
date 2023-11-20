import { Photo as PhotoInterface } from "@/interfaces/Photo";
import { makeGetRequest } from '@/utils/httpAdapterAxios';

const ACCESS_KEY = "Y6Da71ZJaaIUlfxMhTG0OjwXHaVaKgA0G09qP6psiTo";
const API_URL = `https://api.unsplash.com/photos/random`;

export const getPhotoUnsplash = async (): Promise<PhotoInterface | null> => {
  const response = await makeGetRequest<PhotoInterface | null>(API_URL, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    })
  return response
}
