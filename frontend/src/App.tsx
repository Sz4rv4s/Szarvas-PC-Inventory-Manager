import {Route, BrowserRouter, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

const App= () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;
