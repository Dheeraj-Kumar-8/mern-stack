import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import URLshortner from './Pages/ShortUrl/UrlShortner';
import URLHistory from './Pages/ShortUrl/Url_History';
import './index.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu';


function App() {
  return (
    <Router>
        <HeaderMegaMenu/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<LoginPage/>} />
              <Route element={<PrivateRoute/>}>
              <Route path='/profile' element={<ProfilePage/>}/>
              <Route path='/shorten' element={<URLshortner/>}/>
              <Route path='/history' element={<URLHistory/>}/>
              </Route>
          </Routes>
      </Router>
  )
}

export default App
