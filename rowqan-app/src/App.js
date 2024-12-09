import "./App.css";
import SideBar from "./Components/SideBar";
import {Route,Routes} from 'react-router-dom'
import DashboardPage from "./Pages/DashboardPage";
import UsersPage from "./Pages/UsersPages/UsersPage";
import ChaletsOwners from './Pages/ChaletsOwnersPages/ChaletsOwnersPage'
import EventsOwners from './Pages/EventsOwnersPages/EventsOwnersPage'
import LandsOwners from './Pages/LandsOwnersPages/LandsOwnersPage'
import BookingDetailsPage from "../src/Pages/BookingDetailsPage";
import RefundsPage from "../src/Pages/RefundsPage";
import MessagesPage from "../src/Pages/MessagesPage";
import SettingsPage from "../src/Pages/SettingsPage";
import CreateUsers  from '../src/Pages/UsersPages/CreateUserPage'
import UpdateUser from "./Pages/UsersPages/UpdateUser";
import UpdateChaletsOwners from "./Pages/ChaletsOwnersPages/UpdateChaletsOwners";
import UpdateEventsOwner from "./Pages/EventsOwnersPages/UpdateEventsOwner";
import UpdatEventsOwners from "./Pages/EventsOwnersPages/UpdateEventsOwner";
import UpdateLandOwner from "./Pages/LandsOwnersPages/UpdateLandOwnerPage";
import ReservationsDetails from "./Pages/ReservationsDetails";
import DetailsChaletPage from "./Pages/ChaletsPages/DetailsChaletPage";
import DetailsEventsPage from "./Pages/EventsPages/DetailsEventsPage";
import LandsDetails from "./Pages/LandsPages/LandsDetails";
import ChaletSettings from "./Pages/ChaletsPages/ChaletSettings";
import EventSettings from "./Pages/EventsPages/EventSettings";
import LandSttings from "./Pages/LandsPages/LandSttings";
import Home from "./Pages/HomePageSettings";
import UpdateLogo from "./Pages/LogoPages/UpdateLogo";
import CreateLogo from "./Pages/LogoPages/CreateLogo";
import AddHeroSection from "./Pages/HerosPages/AddHeroSection";
import UpdateHeroSections from "./Pages/HerosPages/UpdateHeroSections";
import CreateHeader from "./Pages/HeadersPage/CreateHeader";
import UpdateHeader from "./Pages/HeadersPage/UpdateHeader";
import AddServicePage from "./Pages/ServicesPages/AddServicePage";
import UpdateService from "./Pages/ServicesPages/UpdateService";
import CreateHeroChalet from "./Pages/HeroChaletsPages/CreateHeroChalet";
import UpdateHeroChalet from "./Pages/HeroChaletsPages/UpdateHeroChalet";

export const API_URL1 = "https://rowqanbackend.rowqan.com"
export const API_IMAGE_URL = "https://res.cloudinary.com/durjqlivi"




function App() {
  return (
    <>
      <div className="row">
        <div className="col-md-2"><SideBar/>
        </div>
        <div className="col-md-10">
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
          <Route path="/reservations" element={<ReservationsDetails/>}   />
          <Route path="/users/createuser" element={<CreateUsers/>}   />
          <Route path="/updateuser/:id" element={<UpdateUser/>}   />
          <Route path="/updatechaletsowners/:id" element={<UpdateChaletsOwners/>}   />
          <Route path="/updateventsowners/:id" element={<UpdatEventsOwners/>}   />
          <Route path="/updatelandsowner/:id" element={<UpdateLandOwner/>}   />
          <Route path="/detailsChaletPage/:id" element={<DetailsChaletPage/>}   />
          <Route path="/detailsEventsPage/:available_event_id" element={<DetailsEventsPage/>}   />
          <Route path="/landsDetails/:available_land_id" element={<LandsDetails/>}   />
          <Route path="/chaletsettings" element={<ChaletSettings/>}   />
          <Route path="/eventsettings" element={<EventSettings/>}   />
          <Route path="/landsettings" element={<LandSttings/>}   />
          <Route path="/homesettings" element={<Home/>}   />
          <Route path="/updatelogo/:id" element={<UpdateLogo/>}   />
          <Route path="/createlogo" element={<CreateLogo/>}   />
          <Route path="/addHeroSection" element={<AddHeroSection/>}   />
          <Route path="/updateHeroSection/:id" element={<UpdateHeroSections/>}   />
          <Route path="/addHeader" element={<CreateHeader/>}   />
          <Route path="/updateHeader/:id" element={<UpdateHeader/>}   />
          <Route path="/:header_name/:lang" element={<ChaletSettings/>}   />
          <Route path="/addService" element={<AddServicePage/>}   />
          <Route path="/updateservice/:id" element={<UpdateService/>}   />
          <Route path="/createHeroChalet" element={<CreateHeroChalet/>}   />
          <Route path="/updateHeroChalet/:id" element={<UpdateHeroChalet/>}   />

        </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
