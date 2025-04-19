import { Driver } from "@/interfaces/driver";
import { UserPen } from "lucide-react";
import { useState } from "react";
import { EditDriverForm } from "./edit-driver-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface EditDriverDialogProps {
  driver: Driver
  handleEditDriver: (driver: Driver) => void
}

export function EditDriverDialog({ driver, handleEditDriver }: EditDriverDialogProps) {
  const [isEditDriverDialogOpened, setIsEditDriverDialogOpened] = useState(false)
  
  function handleOpenDialog(value: boolean) {
    setIsEditDriverDialogOpened(value)
  }

  return (
    <Dialog open={isEditDriverDialogOpened} onOpenChange={handleOpenDialog} key={driver.id}>
      <DialogTrigger className="p-1.25 bg-input rounded transition duration-200 hover:brightness-90 cursor-pointer">
        <UserPen size={14} className="text-indigo-400" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar motorista</DialogTitle>
          <DialogDescription>
          Edite as informações do motorista selecionado.
          </DialogDescription>
        </DialogHeader>

        <EditDriverForm onEditDriver={handleEditDriver} driver={driver} openDialog={handleOpenDialog} />
      </DialogContent>
    </Dialog>
  )
}