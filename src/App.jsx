/* eslint-disable no-unused-vars */
import "bootstrap/dist/js/bootstrap.bundle";
import { Suspense, lazy, useEffect, useState } from 'react';
import './App.scss';
import './components/styles/main.css'
import { finabeelight, logoDynomo } from './components/icons/icon';
import { CircularProgress } from "@mui/material"
import { Route, Routes, useLocation } from 'react-router-dom';
import PublicRoutes from "./components/authRoutes/publicRoutes";
import PrivateRoutes from "./components/authRoutes/privateRoutes";
import Children from "./components/pages/children";
import Courses from "./components/pages/courses";
import AddCourse from "./components/pages/courseComponents/addCourse";
import Quiz from "./components/pages/quiz";
import AddQuestion from "./components/pages/quizComponents/addQuestions";
import PreviewCourse from "./components/pages/courseContentComponent/previewCourse";
import Blog from "./components/pages/blog";
import AddBlog from "./components/pages/blogComponents/addBlog";
import PreviewBlog from "./components/pages/blogComponents/previewBlog";
import DigitalProducts from "./components/pages/digitalProducts";
import AddProduct from "./components/pages/digitalProductComp/addProduct";
import BlogSetting from "./components/pages/blogSetting";
import AddBlogHoneypots from "./components/pages/blogComponents/addBlogHoneypots";
import CourseContent from "./components/pages/courseContent";
import AddCourseContent from "./components/pages/courseContentComponent/addCourseContent";
import UpdateCourse from "./components/pages/courseContentComponent/updateCourse";
import CreateQuiz from "./components/pages/createQuiz";
import QuizDetail from "./components/pages/quizComponents/quizDetail";
import UpdateBlog from "./components/pages/blogComponents/updateBlog";
import ParentsChild from "./components/pages/parentsChild";
import DigitalProductsChild from "./components/pages/digitalProductsChild";
import AddProductChild from "./components/pages/digitalProductComp/addProductChild";
import Faq from "./components/pages/faq";
import AddFaq from "./components/pages/faqComponents/addFaq";
import CustomerSupport from "./components/pages/customerSupport";

import Users from "./components/pages/users";
import ConfiDates from "./components/pages/confiDates";
import LegalResources from "./components/pages/SafetyResources/legalResources";
import AddLegalResources from "./components/pages/SafetyResources/addLegalResources";
import SafetyResources from "./components/pages/SafetyResources/safetyResources";
import AddSafetyResources from "./components/pages/SafetyResources/addSafetyResources";
import TestResults from "./components/pages/testResults";
import PaymentUsers from "./components/pages/paymentsUsers";
import Questions from "./components/pages/question";
import CreateQuetions from "./components/pages/createQuetions";
import Grade from "./components/pages/grade";
import CreateGrade from "./components/pages/createGrade";
import GradeDetail from "./components/pages/gradeDetail";
import CreateGradeDetail from "./components/pages/createGradeDetail";
import Zones from "./components/pages/zones";
import CreateZones from "./components/pages/createZones";
import { GoogleMap, LoadScript, Polygon, Autocomplete, Marker, useLoadScript,useJsApiLoader } from "@react-google-maps/api";
import UserZoneData from "./components/pages/userZoneData";


const NavHeader = lazy(() => import('./components/header/navHeader'));
const SidebarMenu = lazy(() => import('./components/pages/sidebar'));
const LoginPage1 = lazy(() => import('./components/auth/dynomoLogin1'));
const Dashboard = lazy(() => import('./components/pages/dashboard'));
const Parents = lazy(() => import('./components/pages/parents'));
const ZoneExcel = lazy(() => import('./components/pages/zoneExcel'));

function App() {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();

  const token = window.localStorage.getItem('login_admin_token')
  global.GoogleApiKey = "AIzaSyBqVDx99KnqA9QE-pCDqR61EsEtPsT8B78"

  // console.log(token);

  useEffect(() => {
    global.BASEURL = 'http://192.168.0.104:8090/api/'
    global.TOKEN = token
  }, [])

  useEffect(() => {
    const isLoginData = JSON.parse(localStorage.getItem("isLogin_finabee_admin") || false);
    setIsLogin(isLoginData);
  }, [pathname]);


  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <>
      <SidebarMenu toggled={toggled} setBroken={setBroken} broken={broken} setToggled={setToggled}>
           <LoadScript googleMapsApiKey={global.GoogleApiKey} libraries={["places"]}>
        {isLogin && <NavHeader toggled={toggled} setBroken={setBroken} broken={broken} setToggled={setToggled} />}
        <Suspense fallback={
          <main className='h-screen flex flex-col justify-center items-center'>
            <CircularProgress className='text_darkprimary' size={40} thickness={2} />
            {/* <img style={{ width: '3rem', height: "auto" }} src={finabeelight} className='absolute' alt="" /> */}
          </main>
        }>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicRoutes />} >
              <Route index element={<LoginPage1 />}></Route>
              <Route path='/login' element={<LoginPage1 />}></Route>
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
          
              <Route path="/zone" element={<Zones />} />
              <Route path="/zone/create" element={<CreateZones />} />
              <Route path="/accident-data" element={<ZoneExcel />} />
              <Route path="/user-zone" element={<UserZoneData />} />


          
            </Route>
          </Routes>
        </Suspense>
        </LoadScript>
      </SidebarMenu>
    </>
  );
}
export default App;
