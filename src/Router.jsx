import { Route, Routes } from "react-router-dom";
import SummerCountdown from "./pages/SummerCountdown";
import ChristmasCountdown from "./pages/ChristmasCountdown";
import RedirectToMain from "./components/RedirectToMain";
import { Navigate } from 'react-router-dom';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/wakacje" />} />
      <Route path="/wakacje" element={<SummerCountdown />} />
    </Routes>
  );
}
