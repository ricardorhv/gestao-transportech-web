import { PlusCircleIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

import { Driver } from "@/interfaces/driver";
import { useState } from "react";
import { AddNewUserForm } from "./add-new-user-form";

interface AddNewUserDialogProps {
  handleAddNewDriver: (driver: Driver) => void
}

export function AddNewUserDialog({ handleAddNewDriver }: AddNewUserDialogProps) {
  const [isNewUserDialogOpened, setIsNewUserDialogOpened] = useState(false)

  function handleOpenDialog(value: boolean) {
    setIsNewUserDialogOpened(value)
  }

  return (
    <Dialog open={isNewUserDialogOpened} onOpenChange={handleOpenDialog}>
      <DialogTrigger className="bg-indigo-800 dark:bg-indigo-600 text-white cursor-pointer hover:brightness-90 transition rounded-md shrink-0 flex items-center justify-center px-3 py-2 text-sm gap-2">
        <PlusCircleIcon size={20} />
        Novo motorista
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar motorista</DialogTitle>
          <DialogDescription>
          Insira as informações necessárias para cadastrar um motorista.
          </DialogDescription>
        </DialogHeader>

        <AddNewUserForm openDialog={handleOpenDialog} handleAddNewDriver={handleAddNewDriver} />
      </DialogContent>
  </Dialog>
  )
}