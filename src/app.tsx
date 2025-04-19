import { ChangeEvent, useEffect, useState } from "react";
import { AddNewUserDialog } from "./components/add-new-user-dialog";
import { DriversTable } from "./components/drivers-table";
import { SkeletonTable } from "./components/skeleton-table";
import { ThemeSelect } from "./components/theme-select";
import { Input } from "./components/ui/input";
import { Driver } from "./interfaces/driver";
import { api } from "./lib/api";

export function App() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [textFilter, setTextFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const filteredDrivers = drivers.filter(({ name, lastName }) => {
    const fullname = `${name} ${lastName}`
    return fullname.toLowerCase().includes(textFilter.toLowerCase())
  })
  const isTextFilterEmpty = textFilter.trim().length === 0

  function handleFilterDrivers(event: ChangeEvent<HTMLInputElement>) {
    setTextFilter(event.target.value)
  }

  function handleAddNewDriver(driver: Driver) {
    setDrivers((prevState) => [
      driver,
      ...prevState
    ])
  }

  useEffect(() => {
    async function fetchDrivers() {
      setIsLoading(true)
      try {
        const response = await api('/driver')
        const data = await response.json()
        setDrivers(data)
        setIsLoading(false)
      } catch (error) {
        console.error(`Error to fetch drivers. Error: ${error}`)
        setIsLoading(false)
      }
    }

    fetchDrivers()
  }, [])

  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between gap-4 items-center px-5 py-8 max-w-[1300px] mx-auto">
        <h2 className="text-2xl dark:text-gray-300 text-zinc-900 font-bold">
          Gestão<span className="text-indigo-800 dark:text-indigo-600">Transportech</span>
        </h2>

        <ThemeSelect />
      </header>

      <main className="max-w-[1300px] mx-auto px-5 my-12">
        <div className="flex gap-4 items-stretch flex-col sm:flex-row">
          <Input 
            className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800" 
            placeholder="Busque por um motorista"
            onChange={handleFilterDrivers}
          />

          <AddNewUserDialog handleAddNewDriver={handleAddNewDriver} />
        </div>

        {
          isLoading ? <SkeletonTable /> : <DriversTable drivers={isTextFilterEmpty ? drivers : filteredDrivers} />
        }
      </main>
    </>
  )
}