// var os = require("os");
// console.log(os.platform())


var fs = require ("fs")
// fs.appendFileSync("my.txt", "Helo")

var obj = {
  name: "Armen" ,
  age: 24 ,
  email: "armen.com"

}

fs.appendFileSync("my.txt", JSON.stringify(obj))