let express = require("express");
let socketio = require("socket.io");
let mysql = require("mysql");
let connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    database: "chat",
    user: "root",
    password: "admin"
})

connection.connect();

let app = express();

app.use(express.static(__dirname + "/public"));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    connection.query("SELECT * FROM mensajes ORDER BY id asc", (err, rows)=>{
        if(err) {
            req.flash("error", err);

            res.render("pages/index.ejs",{data:""});
        } else {
            res.render("pages/index.ejs", {data:rows})
        }
        
    });
})

let server = app.listen(app.get("port"), () => {
    console.log("Server open at port: ", app.get("port"));
})

let io = socketio(server);

io.on("connection", (socket)=> {
    console.log("New connection", socket.id);
    socket.on("mensaje", (data) => {
        connection.query(`INSERT INTO mensajes(mensaje) VALUES ('${data.message}')`)
        io.sockets.emit("mensaje", data);
    })
})