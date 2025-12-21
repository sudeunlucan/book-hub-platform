const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./config/db');

app.use(cors()); 
app.use(express.json()); 

const categoryRoute = require('./routes/CategoryRoute');
const bookRoute = require('./routes/BookRoute');
const userRoute = require('./routes/UserRoute');
const favoriteRote = require('./routes/FavoriteRoute');
const bookDetailsRoute = require('./routes/BookDetailsRoute');

dbConnection();

app.use('/api/anasayfa', categoryRoute);
app.use('/api/kitaplar', bookRoute);
app.use('/api/kullanici', userRoute);
app.use('/api/favoriler', favoriteRote);
app.use('/api/detaylar', bookDetailsRoute);

app.listen(5000, () => console.log("Sunucu 5000 portunda çalışıyor."));