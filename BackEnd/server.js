const express = require('express')  //using express server.
const app = express()
const port = 4000   //local host port changed from 3000 to 4000 to not confuse the web.
const cors = require('cors');   //installed cors package, cross origin resource sharing. to be able to access javascript remotely.
const bodyParser = require("body-parser");  //using the bod-parser package for the post method.
const mongoose = require('mongoose');    //including mongoose to open a connection to the test database on our local running machine.
const path = require('path'); // needed to access server thorugh path.

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//using the connection string here to connect to my mongo database.
const myConnectionString = 'mongodb+srv://Admin:Admin@cluster0.xpj5x.mongodb.net/cars?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, { useNewUrlParser: true });

//generated a schema for the data.
const Schema = mongoose.Schema;

// defining how the database will look like
var carSchema = new Schema({
    brand: String,
    models: String
});

// using schema to generate a model.
var CarModel = mongoose.model('car', carSchema);

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); //using cros. should be able to call from front end.

//configurations to find the build and static folders.
app.use(express.static(path.join(__dirname, '../build')));  //this will allow the server to find the build folder.
app.use('/static', express.static(path.join(__dirname, 'build//static'))); //this will find the static folder.

app.get('/api/cars', (req, res) => {
    // const cars = [
    //     {
    //         "brand": "Seat", "models": ["Alhambra, ", "Altea, ", "Altea XL, ", "Arosa, ", "Cordoba, ", "Cordoba Vario, ", "Exeo"]
    //     },
    //     {
    //         "brand": "Renault", "models": ["Captur, ", "Clio, ", "Clio Grandtour, ", "Espace, ", "Express",]
    //     }
    // ];

    //using car model and find method to find all the documents in that database. it will call back an error or data.
    CarModel.find((err, data) => {
        res.json(data);
    });


    // res.status(200).json({
    //     message: 'Posts fetched succesfully!',
    //     cars: cars
    // });

})

//using a get method here to request a car by using an id.
app.get('/api/cars/:id', (req, res) => {
    console.log(req.params.id);

    //once the data is found then using this method to send back the data.
    CarModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

//using a put method here so that it can find the car by id and update it. 
app.put('/api/cars/:id', (req, res) => {
    console.log("update car: " + req.params.id);
    console.log(req.body);

    //once the new data has been submitted and override then it will send me back the data.
    CarModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data);
        })
})

//listen for a delete method and log data that has been deleted 
app.delete('/api/cars/:id', (req, res) => {
    console.log(req.params.id);

    CarModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data);
    })
})

//post request, using body parser. this will recieve data that is past up from the web.
app.post('/api/cars', (req, res) => {
    console.log('Car Recieved');
    console.log(req.body.brand);
    console.log(req.body.models);

    //using the post method to call car model to create list of cars and for them to be added to the database.
    CarModel.create({
        brand: req.body.brand,
        models: req.body.models
    });
    //responding to client that the car has been added. 
    res.send('Car added');
})

//the get request will send back the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html')); // will send the index.html file to the user.
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})