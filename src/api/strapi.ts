import axios from 'axios';

const strapiAPI = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL || 'https://api.dogwalksnearme.uk',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const fetchWalks = async () => {
  try {
    const response = await strapiAPI.get('/api/walks?populate=*');
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Invalid data structure received from API');
  } catch (error) {
    console.error('Error fetching walks:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};

export const fetchWalkBySlug = async (slug: string) => {
  try {
    const response = await strapiAPI.get(`/api/walks?filters[slug][$eq]=${slug}&populate=*`);
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data[0];
    }
    throw new Error('Walk not found');
  } catch (error) {
    console.error('Error fetching walk by slug:', error instanceof Error ? error.message : String(error));
    throw error;
  }
};