import { Moon, Sun, SunMoon } from "lucide-react";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { useTheme } from "./context/theme-provider";

export function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <header className="flex flex-wrap max-sm:justify-center justify-between gap-4 items-center px-5 py-4 max-w-[1300px] mx-auto">
        <h2 className="text-2xl dark:text-gray-300 text-zinc-900 font-bold">Gestão<span className="dark:text-indigo-950 text-indigo-700">Transportech</span></h2>

        <Select
          defaultValue={theme} 
          onValueChange={toggleTheme}
        >
          <SelectTrigger className="focus-visible:ring-0 focus-visible:border-indigo-700 focus-visible:dark:border-indigo-950">
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
      </header>

      <main className="max-w-[1300px] mx-auto px-5 mt-12">
        <div>
          <Input 
            className="p-5 focus-visible:ring-0 focus-visible:border-indigo-700 focus-visible:dark:border-indigo-950" 
            placeholder="Busque por um motorista" 
          />
        </div>
      </main>
    </>
  )
}