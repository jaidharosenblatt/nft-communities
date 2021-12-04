import "./App.css";
import Navbar from "./navbar/Navbar";
import Filters from "./filters/Filters";
import { useAppSelector } from "../redux/hooks";
import ThemeSelector from "../themes/ThemeSelector";
import Projects from "./projects/Projects";
import { useState } from "react";
import Footer from "./footer/Footer";

function App(): JSX.Element {
  const { darkMode } = useAppSelector((state) => state.status);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  return (
    <ThemeSelector isDark={darkMode}>
      <div className="grid">
        <Navbar />
        {showFilters && <Filters />}
        <div className="hide-mobile">
          <Filters />
        </div>
        <Projects />
        <Footer showFilter={showFilters} onClick={() => setShowFilters(!showFilters)} />
      </div>
    </ThemeSelector>
  );
}

export default App;
