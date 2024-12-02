import "./App.css";
import SideBar from "./Components/SideBar";
import {Route,Routes} from 'react-router-dom'
import DashboardPage from "./Pages/DashboardPage";
import UsersPage from "./Pages/UsersPages/UsersPage";
import ChaletsOwners from './Pages/ChaletsOwnersPages/ChaletsOwnersPage'
import EventsOwners from '../src/Pages/EventsOwnersPage'
import LandsOwners from '../src/Pages/LandsOwnersPage'
import BookingDetailsPage from "../src/Pages/BookingDetailsPage";
import RefundsPage from "../src/Pages/RefundsPage";
import MessagesPage from "../src/Pages/MessagesPage";
import SettingsPage from "../src/Pages/SettingsPage";
import CreateUsers  from '../src/Pages/UsersPages/CreateUserPage'
import UpdateUser from "./Pages/UsersPages/UpdateUser";
import UpdateChaletsOwners from "./Pages/ChaletsOwnersPages/UpdateChaletsOwners";
export const API_URL = "http://localhost:5000"


function App() {
  return (
    <>
      <div className="row">
        <div className="col-md-4"><SideBar/>
        </div>
        <div className="col-md-8">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage/>}   />
          <Route path="/users" element={<UsersPage/>}   />
          <Route path="/chaletsowners" element={<ChaletsOwners/>}   />
          <Route path="/eventsowners" element={<EventsOwners/>}   />
          <Route path="/landsowners" element={<LandsOwners/>}   />
          <Route path="/bookingdetails" element={<BookingDetailsPage/>}   />
          <Route path="/refunds" element={<RefundsPage/>}   />
          <Route path="/messages" element={<MessagesPage/>}   />
          <Route path="/settings" element={<SettingsPage/>}   />
          <Route path="/users/createuser" element={<CreateUsers/>}   />
          <Route path="/updateuser/:id" element={<UpdateUser/>}   />
          <Route path="/updatechaletsowners/:id" element={<UpdateChaletsOwners/>}   />
        </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
