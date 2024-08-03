import { useState } from "react";
import { loginUserApi } from "../api/userAuthApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const Login = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  //client side validation
  const validateForm = () => {

    if (!username) {
      setError("Username is required");
      return false;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleLoginForm = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop the form submission if client side validation fails
    }

    const userCredidentals = { username, password };
    console.log(userCredidentals);

    loginUserApi(userCredidentals)
      .then((response) => {
        console.log(response.data);
        login(username);
        navigate("/welcome"); // Navigate to the welcome page on successful login
      })
      // .catch((error) => {
      //   console.error(error);
      //   setError(error.response.data); // Set error message
      // });
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          setError(error.response.data);
        } else {
          setError("Unable to connect to the server. Please try again later.");
        }
      });
  };

  return (
    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
      <div className="flex-1">
        <div className="text-center">
          <img src="/assets/download.svg" alt="Logo" className="h-8 mx-auto" />
          <p className="mt-3 text-gray-500 dark:text-gray-300">
            Log In to access your account
          </p>
        </div>

        <div className="mt-8">
          {error && <p className="text-red-500 p-1">{error}</p>}
          <form onSubmit={handleLoginForm}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username} // Bind the state to the input
                onChange={(e) => setUsername(e.target.value)} // Update the state on input change
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm text-gray-600 dark:text-gray-200"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={password} // Bind the state to the input
                onChange={(e) => setPassword(e.target.value)} // Update the state on input change
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Log In
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <a
              href="#"
              className="text-blue-500 focus:outline-none focus:underline hover:underline"
              onClick={toggleForm}
            >
              Register now
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
