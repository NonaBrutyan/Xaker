var fs = require('fs'); 

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static("public"));


fs.writeFileSync('public/data.json','');
app.get('/', (req, res) => {
    res.redirect('index.html');
});

app.get('/stats', (req, res) => {
    res.redirect('stats.html');
});



var data = []

io.on('connection', (socket) => {
    for(var i in data)
    socket.emit("send data", data[i])
    
    socket.on("send data", (data) => {  
        fs.appendFileSync('public/data.json', JSON.stringify(data)+'\n'); 
        io.sockets.emit('show data', data)
    })
    
});

server.listen(3000);





