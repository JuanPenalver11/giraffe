import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {useState} from 'react'
//recoil
import { userAtom } from "./atoms/userAtom";
//pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import ModifyProfile from "../src/component/Profile/ModifyProfile";
import ModifyYourPost from "./pages/ModifyYourPost";
//component
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
//helper
import RedirectHome from "./helpers/RedirectHome";
import YourPosts from "./pages/YourPosts";

function App() {
  const user = useRecoilValue(userAtom);

  const [profile, setProfile] = useState(null);

  return (
    <div className="App">
      <Navbar profile = {profile}/>
      <Routes >
        <Route path="/redirecthome" element={<RedirectHome />} />
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/post/:idpost" element={user ? <Post /> : <Home />} />
        <Route path="/profile" element={user ? <Profile /> : <Home />} />
        <Route
          path="/profile/:iduser"
          element={user ? <ModifyProfile setProfile={setProfile}/> : <Home />}
        />
        <Route path="/createpost" element={user ? <CreatePost /> : <Home />} />
        <Route path="/yourposts" element={user ? <YourPosts /> : <Home />} />
        <Route
          path="/modify/:idpost"
          element={user ? <ModifyYourPost /> : <Home />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
