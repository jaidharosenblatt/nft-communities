import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useAppSelector } from "./redux/hooks";
import ThemeSelector from "./themes/ThemeSelector";
import Collections from "./pages/collections/Collections";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubmitCollection from "./pages/submit-collections/SubmitCollection";

function App(): JSX.Element {
  const { darkMode } = useAppSelector((state) => state.status);

  return (
    <ThemeSelector isDark={darkMode}>
      <div className="grid">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Collections />}></Route>
            <Route path="/submit-collection" element={<SubmitCollection />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeSelector>
  );
}

export default App;
