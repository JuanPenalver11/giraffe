import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
//recoil
import { userAtom } from "./atoms/userAtom";
//pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
//component
import Navbar from "./component/Navbar";
//helper
import RedirectHome from "./helpers/RedirectHome";
import YourPosts from "./pages/YourPosts";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/redirecthome" element={<RedirectHome />} />
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/post/:id" element={user ? <Post /> : <Home />} />
        <Route path="/profile" element={""} />
        <Route path="/createpost" element={user ? <CreatePost /> : <Home/>} />
        <Route path="/yourposts" element={user ? <YourPosts /> : <Home/>} />

      </Routes>
    </div>
  );
}

export default App;
