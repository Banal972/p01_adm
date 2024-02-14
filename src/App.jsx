import { Route, Routes } from "react-router-dom";
import Manager from "./component/Manager/Manager";
import Main from "./router/Main/Main";

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/*" element={<Manager/>}/>

        <Route path="complete" element={<Main/>}/>

      </Routes>

    </div>
  );
}

export default App;
