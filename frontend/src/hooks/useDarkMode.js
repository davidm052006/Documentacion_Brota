import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('brota-theme') === 'dark'
  );

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('brota-theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('brota-theme', 'light');
    }
  }, [dark]);

  return [dark, () => setDark(d => !d)];
}
