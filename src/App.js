import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
function App() {

  useEffect(() => {
  const setVh = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  };

  setVh();
  window.addEventListener("resize", setVh);
  return () => window.removeEventListener("resize", setVh);
}, []);


  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
