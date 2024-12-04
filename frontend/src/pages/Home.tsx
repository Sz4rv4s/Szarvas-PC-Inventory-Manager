import {useAuth} from "../context/UseAuth.ts";

const Home = () => {
  const { isLoggedIn, username } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      { isLoggedIn ? (
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Welcome, {username}! You are <span className="text-green-500">logged in</span>.
        </h1>
      ) : (
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Welcome! Please <span className="text-blue-500">Login</span> or{" "}
          <span className="text-green-500">Register</span> to continue.
        </h1>
      )}
    </div>
  )
}
export default Home;
