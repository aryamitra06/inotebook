import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import '../src/globalStyle.css';
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
function App() {
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <Alert msg="Success!"/>
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
      </NoteState>
    </>
  );
}
export default App;