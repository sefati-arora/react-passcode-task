import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layOut';
import LoginPage from "./Pages/LoginPage";
import PassCode from './Pages/PassCode';
import OtpVerify from './Pages/OtpVerify';
import DashBoard from './Pages/DashBoard';
import UserProfile from './Pages/UserProfile';
import BookingData from './Pages/BookingData';
import UserView from './Pages/UserViewPage';
import OtpPage from './Pages/otpPage';
function App()
{
  return(
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/otp/:email" element={<OtpVerify/>}/>
      <Route element={<Layout/>}>
      <Route path="/pass" element={<PassCode/>}/>
      <Route path="/Dash" element={<DashBoard/>}/>
      <Route path="/user" element={<UserProfile/>}/>
      <Route path="/booking" element={<BookingData/>}/>
      <Route path="/user/view/:id" element={<UserView/>}/>
      <Route path="/otpPage/:email" element={<OtpPage/>}/>
      </Route>
    </Routes>
  )
}
export default App;