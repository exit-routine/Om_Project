import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetBlog from "./components/GetBlog";
import PostBlog from "./components/PostBlog";
import SinglePost from "./components/SingleBlogView";
import EditBlog from "./components/EditBlog";
import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
    <div className="App">
      <BrowserRouter>      
          <Routes>
          <Route path="/"  element={<GetBlog />}> </Route>
          <Route path="/PostBlog" element={<PostBlog/>}> </Route>
          <Route path="/SingleBlogView/:id" element={<SinglePost />}> </Route>
          <Route path="/EditBlog/:id" element={<EditBlog />}> </Route>
          <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
