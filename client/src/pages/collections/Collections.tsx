import Filters from "../../components/filters/Filters";
import Projects from "../../components/projects/Projects";
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import "./Collections.css";

export default function Collections() {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  return (
    <>
      {showFilters && <Filters />}
      <div className="hide-mobile">
        <Filters />
      </div>
      <Projects />
      <Footer showFilter={showFilters} onClick={() => setShowFilters(!showFilters)} />
    </>
  );
}
