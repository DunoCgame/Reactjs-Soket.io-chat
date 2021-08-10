import React, {useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";

export default function SelectUser(){
	
	const [User,setUser] = useState();
	let history = useHistory();
		

	function CaptureUser(e){
				e.preventDefault();
				console.log(User);
				history.push("/chat/"+User);
	}
	
	return(
		<div className="Select-User">
			<form onSubmit={CaptureUser} className="form-user-select">	
				<label className="Title-Select-User">Select User</label>				
				<select className="Btn-select-user" id="select" name="user" onClick={e =>setUser(e.target.value)} >
					<option  value="User1" id="user1">User1</option>
					<option  value="User2" id="user2">User2</option>
					<option  value="User3" id="user3">User3</option>
					<option  value="User4" id="user4">User4</option>
				</select>
				<button className="btn-Iniciar-Secion" type="submit" value="Submit">Login In</button>
			</form>
		</div>
	);

}