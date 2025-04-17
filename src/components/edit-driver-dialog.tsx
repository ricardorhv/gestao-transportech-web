import { Driver } from "@/interfaces/driver";
import { UserPen } from "lucide-react";
import { EditUserDialog } from "./edit-user-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface EditDriverDialogProps {
  driver: Driver
}

export function EditDriverDialog({ driver }: EditDriverDialogProps) {
  return (
    <Dialog key={driver.id}>
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

        <EditUserDialog driver={driver}  />
      </DialogContent>
    </Dialog>
  )
}