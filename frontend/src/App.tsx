import {Route, BrowserRouter, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import Parts from "./pages/Parts.tsx";
import Warehouses from "./pages/Warehouses.tsx";
import RegisterAdmin from "./pages/RegisterAdmin.tsx";

const App= () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/register-admin" element={<RegisterAdmin/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/parts" element={<Parts/>}/>
            <Route path="/warehouses" element={<Warehouses/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;
