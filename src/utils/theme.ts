import { Theme } from '../types';

export const applyTheme = (themeMode: Theme) => {
  let actualTheme = themeMode;
  if (themeMode === 'auto') {
    actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // 移除之前的主题类
  document.documentElement.classList.remove('light', 'dark');
  // 添加新的主题类
  document.documentElement.classList.add(actualTheme);
  
  // 更新body类
  if (actualTheme === 'light') {
    document.body.className = 'bg-white text-slate-900';
  } else {
    document.body.className = 'bg-slate-900 text-white';
  }
};

export const getStoredTheme = (): Theme => {
  return (localStorage.getItem('theme') as Theme) || 'dark';
};

export const setStoredTheme = (theme: Theme) => {
  localStorage.setItem('theme', theme);
};