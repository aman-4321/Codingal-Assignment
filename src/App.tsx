import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
