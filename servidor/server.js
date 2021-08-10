const express = require('express');
const path = require('path');
const app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);


app.get('/', (req, res) => {
  res.send('<center><h1>Hello World!</h1></center>')
  console.log("ssrver ok");
})

// settings
app.set('port', process.env.PORT || 3000);

// listen the server
const server = app.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});


const socket = require('socket.io');

const io = socket(server,{
  cors: {
    origin:"http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


io.on('connection', (socket) => {
  
  const counter = socket.client.conn.server.clientsCount;
  
   let nombre;
   
	console.log('user connection:', socket.id);
	console.log('Number connection:', io.sockets.sockets.length);
	console.log('Number connection:',counter);
	

  //detectar connection
   socket.on('connectado',(nom) => {
			
			nombre=nom;
			console.log("connection user is",nom);
			 socket.broadcast.emit("mensajes", {
				  nombre: nombre,
				  mensaje: `${nombre} ha entrado en la sala del chat`,
				})

	  });
	  
	   socket.on("mensaje", (nombre, mensaje) => {
			//io.emit manda el mensaje a todos los clientes conectados al chat
			io.emit("mensajes", { nombre, mensaje });
		  });

		  socket.on("disconnect", () => {
			io.emit("mensajes", {
			  servidor: "Servidor",
			  mensaje: `${nombre} ha abandonado la sala`,
			});
		  });
	
	  

	////obtienene la informacion del chat
	  socket.on('chat:typing', function(data) {
		socket.broadcast.emit('chat:typing', data); //emitir mensage
	  });
  

});
