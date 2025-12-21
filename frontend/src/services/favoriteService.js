import axios from 'axios';

const API_URL = 'http://localhost:5000/api/favoriler';

export const addFavorite = async (userId, bookId) => {
    try {
        const response = await axios.post(`${API_URL}/kitapekle`, { userId, bookId });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Favorilere eklenirken bir hata oluştu.";
    }
};

export const getFavorites = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Favori çekme hatası:", error);
        return [];
    }
};

export const deleteFavorite = async (favId) => {
    try {
        const response = await axios.delete(`${API_URL}/kitapsil/${favId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Kitap silinirken bir hata oluştu.";
    }
};