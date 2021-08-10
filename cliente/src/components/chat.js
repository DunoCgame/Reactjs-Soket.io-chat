import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {   BrowserRouter as Router,   Switch,   Route,   useParams } from "react-router-dom";

import socket from "./socket";
import "../App.css";

export default function Chat(){
	
	const [mensaje,setmensaje] = useState("");
	const [mensajes,setmensajes] = useState([]);	
	let { slug } = useParams();

	//client-side
	 useEffect(() => {
			socket.emit("connectado", slug);
	  },[slug]);
	  
	  /*************/
	useEffect(() => {
		socket.on("mensajes", (mensaje) => {
		  setmensajes([...mensajes, mensaje]);
		});

		return () => {
		  socket.off();
		};
		
	},[mensajes]);
	

	
	socket.on("disconnect", () => {
		console.log("disconnect",socket.id); 
	});
	

	const submit = (e) => {
		
		e.preventDefault();
		socket.emit("mensaje", slug, mensaje);
		setmensaje("");
		
	};
	
	const Typing =()=>{
		
		console.log("writynn");

	}
	

	return(
		<div className="area-chat">
		<h2 className="Title">Welcome: {slug}</h2>
				<section className="area-chat">
					<form onSubmit={submit}>
					<div className="chat">
						 {
							mensajes.map((e, i) => (
							  <div className={e.nombre} key={i}>
									{e.nombre}
									<br></br>
									{e.mensaje}						
							  </div>
						))
						}
					</div>
					<input  className="input-send" type="text" placeholder="mensaje" value={mensaje} onChange={(e) => setmensaje(e.target.value)} />
					<button className="btn-send" id="btnSend" >send</button>
					</form>
				</section>
		</div>
	)
	
}