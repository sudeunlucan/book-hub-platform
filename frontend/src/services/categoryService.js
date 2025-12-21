import axios from 'axios';

const API_URL = 'http://localhost:5000/api/anasayfa';

export const getCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Kategoriler sayfaya yüklenirken hata oluştu: ", error);
        return [];
    }
};