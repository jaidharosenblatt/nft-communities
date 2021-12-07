import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Filters from "./components/filters/Filters";
import { useAppSelector } from "./redux/hooks";
import ThemeSelector from "./themes/ThemeSelector";
import Projects from "./components/projects/Projects";
import { useState } from "react";
import Footer from "./components/footer/Footer";

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
