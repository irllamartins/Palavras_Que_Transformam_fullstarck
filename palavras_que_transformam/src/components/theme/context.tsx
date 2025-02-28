import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, Box, createTheme, CssBaseline } from '@mui/material';
import { DarkTheme, LightTheme } from './themes';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
interface IThemeContextData {
  themeName: Theme
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);


//  permite passar e usar (consumir) dados em qualquer componente que precisamos em nossa aplicação do React sem usar propriedades
// analogia: variaveis globais, mas nn pode ser aplicado em valores muito mutavel
export const useAppThemeContext = () => useContext(ThemeContext)

export const AppThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  
  // procurando thema armazenado
  const localTheme = localStorage.getItem('theme')?.toUpperCase()

  const variableTheme = localTheme && localTheme in Theme 
  ? Theme[localTheme as keyof typeof Theme] 
  : undefined;


  const [themeName, setThemeName] = useState<Theme>(variableTheme || Theme.LIGHT);

  // armazena função e executa de acordo com o parametros
  // troca de tema
  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => oldThemeName === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', themeName)
  }, [themeName]);

  // armazena valores (o tema atual) 
  const theme = useMemo(() => themeName === Theme.LIGHT ? LightTheme : DarkTheme, [themeName]);


  return <ThemeContext.Provider value={{ themeName, toggleTheme }}>
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <Box width="100vw" height="100vh" style={{ margin: 0, padding: 0 }} bgcolor={theme.palette.background.default}>
        {children}
      </Box>
    </ThemeProvider>
  </ThemeContext.Provider>

}
