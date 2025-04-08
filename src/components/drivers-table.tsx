import { Driver } from "@/interfaces/driver";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

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
            <TableRow>
              <TableCell className="text-lg py-4 dark:text-zinc-400 text-zinc-500" colSpan={10}>Nenhum motorista encontrado</TableCell>
            </TableRow>
          )
          : (
            <TableBody>
              {
                drivers.map(({id, name, lastName, document, email, isActive, createdAt}) => (
                  <TableRow key={id}>
                    <TableCell className="py-4 dark:text-zinc-400 text-zinc-500">{name} {lastName}</TableCell>
                    <TableCell className="py-4 dark:text-zinc-400 text-zinc-500">{document}</TableCell>
                    <TableCell className="py-4 dark:text-zinc-400 text-zinc-500">{email}</TableCell>
                    <TableCell className="py-4 dark:text-zinc-400 text-zinc-500">{isActive ? 'Ativo' : 'Inativo'}</TableCell>
                    <TableCell className="py-4 dark:text-zinc-400 text-zinc-500">{String(createdAt)}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          )
      }
    </Table>
  )
}