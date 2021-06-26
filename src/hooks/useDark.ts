import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export function useDark() {
  const value = useContext(ThemeContext)

  return value
}