
import axios from "axios";
const API_KEY = `44528758-32c26e02cbc7bd56fd7d9b89c`;
const BASE_URL = `https://pixabay.com/api/`;

export async function fetchImages(query, page = 1) {
    const params = {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    };
  
  
    
  
    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
      } catch (error) {
        throw new Error('Fetch request failed');
      }
    }