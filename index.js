const express = require('express');
const mongoose = require('mongoose');

var cors = require('cors');


const TypesRouter = require('./routers/TypesRouter');
const ProductForRouter = require('./routers/ProductForRouter');
const ProductRouter = require('./routers/ProductRouter');


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


// app.get('/', (req, res) => res.send('Hello, world!'));

const mongoAtlasUri = "mongodb+srv://lehoang999113:becungshop999@becungshop.b0iyq9x.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))


app.use('/', TypesRouter);
app.use('/', ProductForRouter);
app.use('/', ProductRouter);



const PORT = 8000;
app.listen(PORT, () => console.log(`Server listen onport ${PORT}`));