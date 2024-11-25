import { Route, Routes } from "react-router-dom";
import SummerCountdown from "./pages/SummerCountdown";
import ChristmasCountdown from "./pages/ChristmasCountdown";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SummerCountdown />} />
      <Route path="/x-mas" element={<ChristmasCountdown />} />
    </Routes>
  );
}
