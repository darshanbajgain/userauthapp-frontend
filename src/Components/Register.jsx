import { useState } from "react";
import { registerUserApi } from "../api/userAuthApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const Register = ({ toggleForm }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegistrationForm = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop the form submission if client side validation fails
    }

    const userDetails = { username, email, password };
    console.log(userDetails);

    registerUserApi(userDetails)
      .then((response) => {
        console.log(response.data);
        login(username); // Set isAuthenticated to true
        navigate("/welcome"); // Navigate to the welcome page on successful login
      })
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
            Register & Create a new account
          </p>
        </div>

        <div className="mt-8">
          {error && <p className="text-red-500 p-1">{error}</p>}
          <form onSubmit={handleRegistrationForm}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Your Username"
                value={username} // Bind the state to the input
                onChange={(e) => setUsername(e.target.value)} // Update the state on input change
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                value={email} // Bind the state to the input
                onChange={(e) => setEmail(e.target.value)} // Update the state on input change
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
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
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <a
              href="#"
              className="text-blue-500 focus:outline-none focus:underline hover:underline"
              onClick={toggleForm}
            >
              Log In
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
