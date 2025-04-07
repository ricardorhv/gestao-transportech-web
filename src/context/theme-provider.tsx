import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system"

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeContextProps {
  theme: string
  toggleTheme: (theme: Theme) => void
}

const defaultContext: ThemeContextProps = {
  theme: "light",
  toggleTheme: () => null
}

const ThemeContext = createContext<ThemeContextProps>(defaultContext)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "fag@dashboard-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) ?? defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
 
    root.classList.remove("light", "dark")
 
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
 
      root.classList.add(systemTheme)
      return
    }
 
    root.classList.add(theme)
  }, [theme]) 

  function toggleTheme(theme: Theme) {
    localStorage.setItem(storageKey, theme)
    setTheme(theme)
  }

  return (
    <ThemeContext.Provider {...props} value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  return context
}