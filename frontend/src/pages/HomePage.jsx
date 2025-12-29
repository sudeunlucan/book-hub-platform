import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from '../layouts/Layout.jsx';
import CategoryCard from "../components/CategoryCard.jsx";
import { getCategories } from "../services/categoryService.js";
import '../styles/components.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getCategories();
                console.log("Gelen Veri Tipi:", typeof data);
                console.log("Gelen Veri İçeriği:", data);

                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error("Veri gönderilirken bir hata oluştu.");
                    setError("Hatalı formatta veri gönderildi.");
                }
            } catch (err) {
                console.error("Veri yüklenirken bir hata oluştu: ", err);
                setError("Sunucuya bağlanma hatası oluştu.");
            }
        };

        loadData();
    }, []);

    return (
        <Layout>
            <div>

                <h2 style={{ 
                            textAlign: 'center', 
                            margin: '20px 0', 
                            color:"#483d43", 
                            fontStyle: "italic", 
                            fontWeight: "100", 
                            fontSize: "22px"
                            }}>Bir sonraki keşfin, sıradaki kitabın.</h2>

                <div className="category-grid">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <CategoryCard 
                                key={category.category_id} 
                                title={category.name}
                                image={`/images/categories/${category.name ? category.name.toLowerCase() : 'default'}.jpg`}
                                onClick={() => navigate(`/kategori/${category.category_id}`)}
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', width: '100%' }}>
                            Henüz yüklenmiş kategoriler yok.
                        </p>
                    )}
                </div>

            </div>
        </Layout>
    );
};

export default HomePage;