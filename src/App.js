import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css';
import Login from './superadmin/Login';
import Dashboard from './superadmin/Dashboard';
import Rooms from './superadmin/Rooms';
import Bookings from './superadmin/Bookings';
import Calendar from './superadmin/Calendar';
import Leads from './superadmin/Leads';
import Gallery from './superadmin/Gallery';
import Reviews from './superadmin/Reviews';
import Home from './user/Home';
import UserRooms from './user/UserRooms';
import UserGallery from './user/UserGallery';
import Contact from './user/Contact';
import BookNow from './user/BookNow';
import Settings from './superadmin/Settings';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/superadmin/' element={<Login />}></Route>
          <Route path='/superadmin/Dashboard' element={<Dashboard />}></Route>
          <Route path='/superadmin/Rooms' element={<Rooms />}></Route>
          <Route path='/superadmin/Bookings' element={<Bookings />}></Route>
          <Route path='/superadmin/Calendar' element={<Calendar />}></Route>
          <Route path='/superadmin/Leads' element={<Leads />}></Route>
          <Route path='/superadmin/Gallery' element={<Gallery />}></Route>
          <Route path='/superadmin/Reviews' element={<Reviews />}></Route>
          <Route path='/superadmin/Settings' element={<Settings />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/user/UserRooms' element={<UserRooms />}></Route>
          <Route path='/user/UserGallery' element={<UserGallery />}></Route>
          <Route path='/user/Contact' element={<Contact />}></Route>
          <Route path='/user/BookNow' element={<BookNow />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
