import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/alert/AlertState";


const App = () => {

  return (
    <>

      <AlertState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
              </Routes>
            </div>
          </Router>
        </NoteState>
      </AlertState>

    </>
  );
};

export default App;
