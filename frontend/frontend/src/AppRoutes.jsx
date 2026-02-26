import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Feed from "./features/posts/pages/feed"
import CreatePost from "./features/posts/pages/CreatePost";


function AppRoutes() {
  return (
 
    <Routes>
      <Route path="/" element={<Feed/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
   
  );
}

export default AppRoutes;
