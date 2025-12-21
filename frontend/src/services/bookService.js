import axios from 'axios';

const API_URL = 'http://localhost:5000/api/kitaplar';

export const getBooks = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}?categoryId=${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Kitaplar sayfaya yüklenirken hata oluştu:", error);
        return [];
    }
};

