import { api } from "@/lib/api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface DeleteDriverDialogProps {
  onDeleteDriver: (driverId: string) => void
  driverId: string
}

export function DeleteDriverDialog({ onDeleteDriver, driverId }: DeleteDriverDialogProps) {
  const [isDeleteDriverDialogOpened, setIsDeleteDriverDialogOpened] = useState(false)

  async function deleteDriver() {
    try {
      const response = await api(`/driver/${driverId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error()
      }
      onDeleteDriver(driverId)
    } catch {
      toast.error('Erro ao adicionar o motorista')
      return
    }

    setIsDeleteDriverDialogOpened(false)

    toast.success('Motorista removido com sucesso')
  }

  return (
    <AlertDialog open={isDeleteDriverDialogOpened} onOpenChange={setIsDeleteDriverDialogOpened}>
      <AlertDialogTrigger className="p-1.25 bg-input rounded transition duration-200 hover:brightness-90 cursor-pointer">
        <Trash2 size={14} className="text-red-400" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza que deseja deletar este motorista?</AlertDialogTitle>
          <AlertDialogDescription>Quando deletado não é possível recuperar os dados.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDriver} className="bg-indigo-800 dark:bg-indigo-600 text-white hover:brightness-90 transition">Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}