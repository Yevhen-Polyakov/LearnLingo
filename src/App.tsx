import { createBrowserRouter, Navigate, RouterProvider, } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";
import Layout from "./components/Layout/Layout";
import PrivateRouter from "./components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children: [
      {index:true, element: <Navigate to={"/Home"}/>},
      {path:"Home", element: <HomePage/>},
      {path:"Teachers", element:<TeachersPage/>},
      {
        element: <PrivateRouter />,
        children: [
          {
            path: "favorites",
            element: <FavoritesPage />,
          },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
