
import Header from "./components/Header"
import {BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

const App = () => {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
