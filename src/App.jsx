import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import Add from "./Pages/Add"
import View from "./Pages/View"
import Edit from "./Pages/Edit"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/add" element={<Add/>}></Route>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/sign" element={<Signup/>}></Route>
            <Route path="/view" element={<View/>}></Route>
            <Route path="/edit" element={<Edit/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
