import Navbar  from "./Components/Navbar.js"
import  "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import HomeScreen from "./Screens/HomeScreen.js";
 




function App() {
  return (
    <div className="App">
   
      <Navbar/>
      <HomeScreen/>
    </div>
  );
}

export default App;
