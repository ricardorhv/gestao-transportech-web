import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const newUserSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  driverLicense: z.string(),
  document: z.string(),
  phone: z.string(),
  isActive: z.boolean(),
  email: z.string(),
  password: z.string(),
})

type EditUserType = z.infer<typeof newUserSchema>

interface EditUserDialogProps {
  driver: EditUserType
}

export function EditUserDialog({ driver }: EditUserDialogProps) {
  const form = useForm<EditUserType>({
    resolver: zodResolver(newUserSchema)
  })

  const { 
    document,
    driverLicense,
    email,
    isActive,
    lastName,
    name,
    password,
    phone
   } = driver

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          defaultValue={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          defaultValue={lastName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Sobrenome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document"
          defaultValue={document}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Documento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverLicense"
          defaultValue={driverLicense}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Carteira de motorista" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          defaultValue={phone}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="tel" className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Telefone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          defaultValue={email}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          defaultValue={password}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <Label className="font-normal text-zinc-800 dark:text-zinc-400">Ativar motorista</Label>
          <Switch defaultChecked={isActive} />
        </div>

        <Button className="w-full mt-8 bg-indigo-800 dark:bg-indigo-600 text-white hover:brightness-90 transition rounded-md flex items-center justify-center px-3 py-2 text-sm">Salvar</Button>
      </form>
    </Form>
  )
}