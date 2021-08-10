import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import SelectUser from './components/SelectUser';
import logo from './logo.svg';
import './App.css';

import Chat from "./components/chat";

function App(){
  return(
		<div className="App">
					<Router>
						<Switch>
							<Route exact path="/">
								  <SelectUser/>
							</Route>
							<Route path="/chat/:slug">
								 <Chat/>
							</Route>  
					   </Switch>		   
					</Router>
				
		</div>
  );
}

export default App;
