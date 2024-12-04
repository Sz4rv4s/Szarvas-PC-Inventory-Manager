import Logo from "../assets/warehouse.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth.ts";

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
  };

  const displayRole = role ? role.replace("ROLE_", "") : "";

  return (
    <nav className="bg-primary p-4 flex justify-between">
      <div className="flex justify-between gap-5 items-center align-center">
        <Link to="/" >
          <img src={Logo} alt="logo" className="w-12 h-12" />
        </Link>
        <h1 className="text-white text-2xl text-bold">Szarvas PC Inventory Manager</h1>
      </div>
      <div className="flex justify-between gap-20 items-center align-center">
        {isLoggedIn ? (
          <>
            <div className="flex justify-between gap-7 items-center align-center">
              <Link to="/parts" className="text-white w-32 text-center px-4 py-2 bg-cblue rounded hover:bg-cbluehover">Parts</Link>
              <Link to="/warehouses" className="text-white w-32 text-center px-4 py-2 bg-cblue rounded hover:bg-cbluehover">Warehouses</Link>
            </div>
            <div className="flex justify-between gap-7 items-center align-center">
              {role === "ROLE_ADMIN" && (
                <Link to="/register-admin" className="text-white px-4 py-2 bg-cgreen rounded hover:bg-cgreenhover">
                  Register User
                </Link>
              )}
              <span className="text-white">{username}</span>
              <span className="text-white">{displayRole}</span>
              <button onClick={handleLogout} className="text-white px-4 py-2 bg-cred rounded hover:bg-credhover">
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-5 items-center align-center">
              <Link to="/register" className="text-white px-4 py-2 bg-cblue rounded hover:bg-cbluehover">Register</Link>
              <Link to="/login" className="text-white px-4 py-2 bg-cblue rounded hover:bg-cbluehover">Login</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
