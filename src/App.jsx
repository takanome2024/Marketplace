import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router";
import HomePage from './pages/homePages';
import RegisterPage from './pages/registerPages';
import AdminLayouts from './layouts/adminLayouts';
import MainLayouts from './layouts/mainLayouts';
import LoginPage from './pages/loginPages';



const router = createBrowserRouter([ //array object yang me-representasikan object path
  {
    path: "/",
    element: <MainLayouts />,
    children:[
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  {
    path: "/auth",
    element: <AdminLayouts />,
    children:[
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "login",
        element: <LoginPage />
      }
      ]
    },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
