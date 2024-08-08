const express = require('express');
const connectDB = require('./db/config');
const errorHandler = require('./middleware/errormiddleware');
const cors = require('cors');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/userroutes'));
app.use('/products', require('./routes/productroutes'));
app.use('/cart', require('./routes/cartroutes'));

app.use(errorHandler);


app.listen(8080, () => {
    console.log("Server is running on 8080");
});