# UserAuth Frontend Documentation
## Project Overview: This project implements user authentication using React for the frontend and Spring Boot for the backend. Users can register, log in, and access a protected welcome page after successful login. The application includes client-side validation to ensure user inputs meet specific criteria before sending requests to the server.

## Project Structure
```graphql
src
│
├── api
│   └── userAuthApi.js          # API calls to the backend for user authentication
│
├── assets
│   └── react.svg               # Image assets used in the application
│
├── AuthContext
│   └── AuthContext.jsx         # Context for managing authentication state
│
├── Components
│   ├── Header.jsx              # Header component with navigation and logout functionality
│   ├── Login.jsx               # Login form component
│   └── Register.jsx            # Register form component
│
├── Pages
│   ├── About.jsx               # About page component
│   ├── Home.jsx                # Home page component containing login/register toggle
│   └── Welcome.jsx             # Protected welcome page component
│
├── App.css                     # Global CSS styles
├── App.jsx                     # Main App component with routing
├── index.css                   # Additional CSS styles
└── main.jsx                    # Entry point for the React application
```

##Key Features
### 1. User Registration and Login:
- Users can register with a unique username, valid email, and a password that meets length criteria.
- Login requires correct username and password combination.
  
### 2. Protected Routes:
- Users can only access the Welcome page after logging in. If they are not authenticated, they will be redirected to the Home page.

### 3. Context for Authentication:
- Authentication state is managed globally using React Context API (AuthContext). This allows the application to easily check whether a user is logged in and display relevant content accordingly.

### 4. Client-Side Validation:
- Forms are validated on the client side before sending data to the server. This ensures that inputs like email format and password length meet the requirements.


## Detailed Explanation of Components

#### App.jsx
- This is the main component of the application. It sets up routing using react-router-dom and defines a PrivateRoute component to protect certain routes from unauthenticated access.

```jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";
import { AuthProvider, useAuth } from "./AuthContext/AuthContext";
import About from "./Pages/About";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/welcome"
            element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
```

#### Home.jsx
- This component manages the state for toggling between the login and registration forms.

```jsx
import { useState } from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo...)',
          }}
        >
          {/* Background image and text */}
        </div>

        {isLogin ? <Login toggleForm={toggleForm} /> : <Register toggleForm={toggleForm} />}
      </div>
    </div>
  );
};

export default HomePage;
```

#### Register.jsx and Login.jsx
- These components handle the registration and login forms, respectively. They perform client-side validation and send user data to the backend API for authentication.

**Register.jsx**

```jsx
import { useState } from "react";
import { registerUserApi } from "../api/userAuthApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const Register = ({ toggleForm }) => {
  // State management and form handling
  // API call to register user
};

export default Register;
```

**Login.jsx**

```jsx
import { useState } from "react";
import { loginUserApi } from "../api/userAuthApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const Login = ({ toggleForm }) => {
  // State management and form handling
  // API call to login user
};

export default Login;
```

#### AuthContext.jsx
- This component provides a context for managing authentication state throughout the application.

```jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const login = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

#### userAuthApi.js
- This module contains functions to make API calls for user authentication. It uses Axios to send POST requests to the backend.

```jsx
import axios from "axios";

const AUTH_REST_API_BASE_URL = 'http://localhost:8080/api/user'

// Registration API call
export const registerUserApi = (userDetails) => axios.post(AUTH_REST_API_BASE_URL + '/register', userDetails);

// Login API call
export const loginUserApi = (userCredidentals) => axios.post(AUTH_REST_API_BASE_URL + '/login', userCredidentals);
```

## Missing Features and Potential Improvements
### Error Handling:
- The application currently handles basic error cases like invalid credentials or server connectivity issues. More granular error handling could be added to improve the user experience.

### Form Enhancements:
- Consider implementing more robust form validation (e.g., using Formik and Yup) for better maintainability.

### Responsive Design:
- The design is partially responsive, but additional work is needed to ensure a seamless experience across all devices.

### Security:
- Since authentication is managed on the frontend using local state, it is less secure. Consider integrating JWT tokens with secure storage for better security.

### Routing Enhancements:
- Expand the routing structure to include more pages and features, such as password recovery.
