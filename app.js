let express = require("express");
let socketio = require("socket.io");
let app = express();

app.use(express.static(__dirname + "/public"));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("pages/index.ejs");
})

let server = app.listen(app.get("port"), () => {
    console.log("Server open at port: ", app.get("port"));
})

let io = socketio(server);

io.on("connection", (socket)=> {
    console.log("New connection", socket.id);

    socket.on("mensaje", (data) => {
        io.sockets.emit("mensaje", {
            data, 
            "socket.id": socket.id
        });
    })
})