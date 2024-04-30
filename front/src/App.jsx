import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddWords from "./pages/AddWords";

function App() {
  return (
    <div className=" flex flex-col items-center ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addwords" element={<AddWords />} />
      </Routes>
    </div>
  );
}

export default App;
