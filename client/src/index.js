import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './stylesheets/index.css';
import App from './components/App';
import Projects from './components/home/projects/Projects';
import Project from './components/home/projects/Project';
import Content from './components/home/Content';
import reportWebVitals from './javascript/reportWebVitals';
import NotFoundPage from "./components/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Content />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:projectId",
        element: <Project />,
      }
    ],
  },
  {
    path: "contacts/:contactId",
    element: <Projects />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
