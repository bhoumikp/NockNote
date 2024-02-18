require('dotenv').config()
const connectToMongo = require('./db')
const express = require("express");
const cors = require('cors')
const username = process.env.USERNAME
const password = process.env.PASSWORD
console.log(username, password, process.env.H)
connectToMongo()
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send("API is running");
    })
}


//available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'))
app.use('/api/otppwrst',require('./routes/emails'))

app.listen(port,()=>{
    console.log("server started")
})
