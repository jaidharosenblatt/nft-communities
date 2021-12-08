import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import ThemeSelector from "./themes/ThemeSelector";
import Collections from "./pages/collections/Collections";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SubmitCollection from "./pages/submit-collections/SubmitCollection";
import { notification } from "antd";

import { useEffect } from "react";
import { setError } from "./redux/status";

function App(): JSX.Element {
  const { darkMode, error } = useAppSelector((state) => state.status);
  const dispatch = useAppDispatch();

  useEffect(
    function (): () => void {
      if (error) {
        notification.error({
          message: "Something went wrong...",
          description: error,
        });
      }

      return () => {
        if (error) {
          dispatch(setError(undefined));
        }
      };
    },
    [error, dispatch]
  );
  return (
    <ThemeSelector isDark={darkMode}>
      <div className="grid">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Collections />} />
            <Route path="/submit-collection" element={<SubmitCollection />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeSelector>
  );
}

export default App;
