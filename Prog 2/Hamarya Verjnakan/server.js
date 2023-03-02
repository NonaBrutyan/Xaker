var fs = require('fs'); 

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var statArr = [];


if (fs.existsSync("public/data.json")) {
    var statArr = require("./public/data.json");
}


app.use(express.static("public"));
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/p5', express.static(__dirname + '/node_modules/p5/lib/'));


app.get('/', (req, res) => {
    res.redirect('index.html');
});

app.get('/stats', (req, res) => {
    res.redirect('stats.html');
});


server.listen(3000);


io.on('connection', (socket) => {
    socket.on("send data", (data) => { 
        statArr.push(data); 
        fs.writeFile('public/data.json', JSON.stringify(statArr, null, 4)); 
    })

    socket.on("get stats",  () => { 
        fs.readFile('public/data.json', "utf8", (err, statisticsFromFile) => {
            socket.emit("send stats", statisticsFromFile);    
        });  
    })
});