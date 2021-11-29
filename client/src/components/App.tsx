import "./App.css";
import Navbar from "./navbar/Navbar";
import Filters from "./filters/Filters";
import { useAppSelector } from "../redux/hooks";
import ThemeSelector from "../themes/ThemeSelector";
import Projects from "./projects/Projects";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useState } from "react";

function App(): JSX.Element {
  const { darkMode } = useAppSelector((state) => state.status);
  const [showFilters, setShowFilters] = useState<boolean>(true);

  return (
    <ThemeSelector isDark={darkMode}>
      <div className="grid">
        <Navbar />
        {showFilters && <Filters />}
        <Projects />
      </div>
    </ThemeSelector>
  );
}

export default App;
