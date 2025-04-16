import { Driver } from "@/interfaces/driver";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

import { format } from 'date-fns';
import { EditUserDialog } from "./edit-user-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface DriversTableProps {
  drivers: Driver[]
}

export function DriversTable({ drivers }: DriversTableProps) {
  const isDriversEmpty = drivers.length === 0

  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow>
          <TableHead className="py-3">Nome</TableHead>
          <TableHead className="py-3">Documento</TableHead>
          <TableHead className="py-3">Email</TableHead>
          <TableHead className="py-3">Status</TableHead>
          <TableHead className="py-3">Data de criação</TableHead>
        </TableRow>
      </TableHeader>

      {
        isDriversEmpty 
          ? (
            <TableBody>
              <TableRow>
                <TableCell className="text-lg py-4 dark:text-zinc-400 text-zinc-500" colSpan={10}>Nenhum motorista encontrado</TableCell>
              </TableRow>
            </TableBody>
          )
          : (
            <TableBody>
              {
                drivers.map((driver) => {
                  const {id, name, lastName, document, email, isActive, createdAt} = driver
                  const formattedDate = format(new Date(createdAt), "dd/MM/yyyy")

                  return (
                    <Dialog>
                      <DialogTrigger asChild>
                      <TableRow className="cursor-pointer" key={id}>
                        <TableCell className="py-4 dark:text-zinc-400 text-zinc-500">{name} {lastName}</TableCell>
                        <TableCell className="py-4 dark:text-zinc-400 text-zinc-500">{document}</TableCell>
                        <TableCell className="py-4 dark:text-zinc-400 text-zinc-500">{email}</TableCell>
                        <TableCell className={`py-4 dark:text-zinc-400 text-zinc-500 ${isActive ? 'text-emerald-500 dark:text-emerald-500' : 'text-red-500 dark:text-red-500'}`}>{isActive ? 'Ativo' : 'Inativo'}</TableCell>
                        <TableCell className="py-4 dark:text-zinc-400 text-zinc-500">{String(formattedDate)}</TableCell>
                      </TableRow>
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
                })
              }
            </TableBody>
          )
      }
    </Table>
  )
}