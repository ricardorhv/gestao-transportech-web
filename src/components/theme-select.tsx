import { useTheme } from "@/context/theme-provider";
import { Moon, Sun, SunMoon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function ThemeSelect() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Select
      defaultValue={theme} 
      onValueChange={toggleTheme}
    >
      <SelectTrigger className="focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 ml-auto sm:m-0">
        <SelectValue placeholder="Escolha um tema"/>
      </SelectTrigger>

      <SelectContent className="font-poppins">
        <SelectItem value="system">
          <SunMoon />
          Sistema
        </SelectItem>
        <SelectItem value="light">
          <Sun />
          Claro
        </SelectItem>
        <SelectItem value="dark">
          <Moon />
          Escuro
        </SelectItem>
      </SelectContent>
    </Select>
  )
}