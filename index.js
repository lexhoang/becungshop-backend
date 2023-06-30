const express = require('express');
const mongoose = require('mongoose');

var cors = require('cors');


const OrderRouter = require('./routers/OrderRouter');
const ProductRouter = require('./routers/ProductRouter');
const TypesRouter = require('./routers/TypesRouter');
const AuthRouter = require('./routers/AuthRouter');


const app = express();
app.use(cors());
//Sử dụng Middleware JSON
app.use(express.json());
//Sự dụng unicode
app.use(express.urlencoded({
    urlencoded: true
}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



const mongoAtlasUri = "mongodb+srv://lehoang999113:becungshop999@becungshop.b0iyq9x.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))


app.get('/', (request, response) => {
    response.status(200).json({
        test: 1111
    })
});

app.use('/', OrderRouter);
app.use('/', TypesRouter);
app.use('/', ProductRouter);
app.use('/', AuthRouter);

console.log('hello')

const PORT = 8080;
app.listen(PORT, () => console.log(`Server listen onport ${PORT}`));