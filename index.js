const path = require('path');

// init read from COM deps
const { SerialPort, ReadlineParser } = require('serialport')
// const port = new SerialPort({ path: '/dev/cu.usbmodem11201', baudRate: 115200 })
const port = new SerialPort({ path: '/dev/cu.usbmodem11101', baudRate: 115200 })
const parser = new ReadlineParser()
port.pipe(parser)

// setup our web server that socketio will run on top of
const express = require('express');
const app = express()
// Set EJS as templating engine + external js files for front end
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views/js')));

// web server online
var express_port = process.env.PORT
if (express_port == null || express_port === '') {
    express_port = 8080
}
const server = app.listen(express_port, () => {
    console.log(`Listening at http://localhost:${express_port}`)
})

// setup/attach socketio
const { Server } = require('socket.io');
const io = new Server(server);


app.get('/', (req, res) => {
    res.render('home');
});

io.on('connection', (socket) => {
    socket.on('page ready', (msg) => {
        console.log('page ready at:', msg)
        // begin parsing from arduino + send to client
        parser.on('data', (data) => {
            socket.emit('graph data', data)
        })
    })
    socket.on('btnPress', (msg) => {    
        console.log('button pressed:', msg)
        port.write(msg)
    })
})




