import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./components/pages/error/errorPage.jsx";
import Schedule from "./components/pages/schedule/ScheduleFullCalendar.jsx";
import Tasks from "./components/pages/tasks/Tasks.jsx";
import Home from "./components/pages/home/Home.jsx";
import Reset from "./components/pages/reset/Reset.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "reset",
        element: <Reset />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
