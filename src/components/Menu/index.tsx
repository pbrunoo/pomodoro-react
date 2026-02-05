import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
    return storageTheme;
  });

  const nextThemIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />
  }

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme)
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink className={styles.menuLink} href='/' aria-label='Ir para Home' title='Ir para Home'>
        <HouseIcon />
      </RouterLink>
      <RouterLink className={styles.menuLink} href='/history' aria-label='Ver Histórico' title='Ver Histórico'>
        <HistoryIcon />
      </RouterLink>
      <RouterLink className={styles.menuLink} href='/settings' aria-label='Configurações' title='Configurações'>
        <SettingsIcon />
      </RouterLink>
      <a className={styles.menuLink} href='#' onClick={handleThemeChange} aria-label='Mudar Tema' title='Mudar Tema'>
        {nextThemIcon[theme]}
      </a>
    </nav>
  );
}