import Home from './pages/home/Home';
import Login from './pages/authUser/Login';
import Register from './pages/authUser/Register';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Posts from './pages/posts/Posts';

import Footer from '../src/components/footer/Footer';
import Navbar from '../src/components/navbar/Navbar';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer /> 
    </>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/write",
        element: <Write/>
      },
      {
        path:"/post/:id",
        element: <Single/>
      },
      {
        path:"/posts/:uid",
        element: <Posts />
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  
]);


function App() {
  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;