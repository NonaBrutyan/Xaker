var statListHTML = "";

var allStats = document.getElementById("all-stats");

var statNumCount = 0;


setInterval(() => {
    socket.emit("get stats", []);
}, 10000);


socket.on("send stats", (statistics) => {
    statNumCount++;
    
    statistics = JSON.parse(statistics);
    statListHTML += "<p class='stat-count-text'>Stats " + statNumCount + ":</p>";
    for (var stat of statistics) {
        statListHTML += "<ul id='stat-list'>";
        for (var st in stat) {
            if (stat.hasOwnProperty(st)) {
                statListHTML += "<li>";
                statListHTML += st + ": " + stat[st];
                statListHTML += "</li>";
            }
        }
        statListHTML += "</ul>";
    }
    allStats.innerHTML = statListHTML;
})