import "./App.css";
import Navbar from "./navbar/Navbar";
import Filters from "./filters/Filters";
import { useAppSelector } from "../redux/hooks";
import ThemeSelector from "../themes/ThemeSelector";
import Projects from "./projects/Projects";

function App(): JSX.Element {
  const { darkMode } = useAppSelector((state) => state.status);

  return (
    <ThemeSelector isDark={darkMode}>
      <div className="grid">
        <Navbar showCount />
        <Filters />
        <Projects />
      </div>
    </ThemeSelector>
  );
}

export default App;
