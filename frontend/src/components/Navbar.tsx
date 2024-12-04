import Logo from "../assets/warehouse.svg";
import {Link} from "react-router-dom";
import {useAuth} from "../context/UseAuth.ts";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, setJwt, username, setUsername, role, setRole } = useAuth();

  const handleLogout = () => {
    setJwt(null);
    setUsername(null);
    setRole(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  }

  return (
    <nav className="bg-primary p-4 flex justify-between">
      <div className="flex justify-between gap-5 items-center align-center">
        <Link to="/" >
          <img src={Logo} alt="logo" className="w-12 h-12" />
        </Link>
        <h1 className="text-white text-2xl text-bold">Szarvas PC Inventory Manager</h1>
      </div>
      <div className="flex justify-between gap-5 items-center align-center">
        {isLoggedIn ? (
          <>
            <span className="text-white">{username}</span>
            <span className="text-white">{role}</span>
            <button onClick={handleLogout} className="text-white px-4 py-2 bg-cred rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="text-white px-4 py-2">Register</Link>
            <Link to="/login" className="text-white px-4 py-2">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
