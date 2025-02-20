import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";

import { Navigate, RouterProvider, useNavigate } from "react-router";
import Layout from "./components/Layout";
import Home from "./Pages.jsx/Home";
import Cart from "./Pages.jsx/Cart";
import Login from "./Pages.jsx/Login";
import { Provider } from "react-redux";
import { store } from "./store";
import Checkout from "./Pages.jsx/checkout";
import AuthProvider, { useAuthentication } from "./firebase/Auth";
import Register from "./Pages.jsx/Register";

function ProtectedRoute({ children }) {
  const { user } = useAuthentication();
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route
          path="/checkout"
          index
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/cart" index element={<Cart />}></Route>
      </Route>
      <Route path="/login" index element={<Login />}></Route>
      <Route path="/register" index element={<Register />}></Route>
    </>
  )
);
function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  );
}

export default App;
