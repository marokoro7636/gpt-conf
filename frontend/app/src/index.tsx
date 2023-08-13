import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Consult from "./components/Consult";
import PostForm from "./components/PostForm";
import Root from "./components/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>Not Found</h1>,
        children: [
            {
                index: true,
                element: <PostForm />
            },
            {
                path: "consult",
                element: <Consult />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
