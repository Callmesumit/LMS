import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Courses from "./pages/Courses.jsx"
import Login from "./pages/auth/Login.jsx"
import Signup from "./pages/auth/Signup.jsx"
import Contact from "./pages/Contact.jsx"
import Services from "./pages/Services.jsx"
import { Button } from "./components/ui/button.jsx"
import Footer from "./components/footer.jsx"
import About from "./pages/About.jsx"
// import InstructorPanel from "./components/dashboard/InstructorPanal.jsx"
import ForgotPassword from "./pages/auth/ForgetPassword.jsx"
import VerifyOtp from "./pages/auth/VerifyOtp.jsx"
import Reset from "./pages/auth/Reset.jsx"
import WebinarList from "./pages/WebinarList.jsx"
import Profile from "./pages/Profile.jsx"
import Admin from "./components/dashboard/Admin.jsx"
import Dashboard from "./components/dashboard/Dashboard.jsx"
import Course from "./components/dashboard/Course.jsx"
import CreateCourse from "./components/dashboard/CreateCourse.jsx"
import UpdateCourse from "./components/dashboard/UpdateCourse.jsx"
import CourseTab from "./components/dashboard/CourseTab.jsx"
import CreateLecture from "./components/dashboard/CreateLecture.jsx"
import EditLecture from "./components/dashboard/EditLecture.jsx"
// import CourseTab from "./components/dashboard/CourseTab.jsx"



// const router = createBrowserRouter([
const router = createBrowserRouter([
  {
    path:"/",
    element: <><Navbar/> <Home/></>
  },
  {
   path:"/courses",
   element:<> <Navbar /> <Courses />  </>
  },
  {
    path:"/about",
    element:<><Navbar/> <About/></>
  },
  {
    path:"/contact",
    element:<><Navbar/><Contact/></>
  },
  {
    path:"/services",
    element:<><Navbar/><Services/></>
  },
  {
    path:"/login",
    element:<><Navbar/><Login/></>
  },
  {
    path:"/signup",
    element:<><Navbar /> <Signup /></>
  },
  // {
  //   path:"/dashboard",
  //   element:<><Navbar /> <InstructorPanel/> </>
  // },
  {
    path:"/forget",
    element:<><ForgotPassword/></>
  },
  {
    path:"/verify",
    element:<><VerifyOtp/></>
  },
  {
    path:"/reset",
    element:<><Navbar/> <Reset/></>
  },
  {
    path:"/webinar",
    element:<><Navbar/> <WebinarList/></>
  },
  {
    path:"/profile",
    element:<> <Navbar/> <Profile/>  </>
  },
  {
    path:"/admin",
    element:<> <Navbar/> <Admin/> </>,
    children:[
      {
        path:"dashboard",
        element:<Dashboard />
      },
      {
        path:"course",
        element:<Course />
      },
      {
        path:"course/create",
        element:<CreateCourse/>
      },
      {
        path:"/admin/course/:courseId",
        element:<UpdateCourse/> 
      },
      {
        path:'course/:courseId/lecture',
        element:<CreateLecture />
      },
      {
        path:'course/:courseId/lecture/:lectureId',
        element:<EditLecture />
      }
    ]
  }
  
])


function App() {
  return (
    <>
     <RouterProvider router={router} />
     <Footer />
    </>
  )
}

export default App;
