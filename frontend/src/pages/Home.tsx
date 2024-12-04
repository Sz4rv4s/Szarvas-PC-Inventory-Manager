import {useAuth} from "../context/UseAuth.ts";

const Home = () => {
  const { isLoggedIn, username } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      { isLoggedIn ? (
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Welcome, {username}!<br/>You are <span className="text-cgreen">logged in</span>.
        </h1>
      ) : (
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Welcome! Please <span className="text-cblue">Login</span> or{" "}
          <span className="text-cgreen">Register</span> to continue.
        </h1>
      )}
    </div>
  )
}
export default Home;
