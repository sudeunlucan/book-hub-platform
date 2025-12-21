import axios from 'axios';

const API_URL = 'http://localhost:5000/api/detaylar';

export const getBookDetails = async (bookId) => {
    try {
        const response = await axios.get(`${API_URL}/${bookId}`);
        return response.data;
    } catch (error) {
        console.error("Kitap detayları yüklenemedi:", error);
        return null;
    }
};