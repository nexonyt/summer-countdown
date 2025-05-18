import { useEffect } from 'react';

export default function RedirectToMain() {
  useEffect(() => {
    const currentHost = window.location.hostname;

    // Uniknij pętli — nie przekierowuj, jeśli już jesteśmy na domenie linków
    // if (!currentHost.includes('urlpretty.pl') || !currentHost.includes('wakacje.nexonstudio.pl')) {
    //   const targetURL = 'https://urlpretty.pl/v/odliczanie';
    //   window.location.href = targetURL;
    // }
  }, []);

  return null;
}
