import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { Driver } from "@/interfaces/driver";
import { api } from "@/lib/api";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from 'zod';
import { LoadingIndicator } from "./loading-indicator";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const newUserSchema = z.object({
  name: z.string({
    message: 'Este campo é obrigatório!'
  }),
  lastName: z.string({
    message: 'Este campo é obrigatório!'
  }),
  driverLicense: z.string({
    message: 'Este campo é obrigatório!'
  }).min(11, {
    message: 'Formato inválido!'
  }),
  document: z.string({
    message: 'Este campo é obrigatório!'
  }).refine((value) => {
    const formattedValue = value.replace(/[^\d]+/g, "")
    const isCpf = formattedValue.length === 11
    const isCnpj = formattedValue.length === 14

    return isCpf || isCnpj
  }, {
    message: 'Formato inválido!'
  }),
  phone: z.string({
    message: 'Este campo é obrigatório!'
  }).refine((value) => {
    const formattedValue = value.replace(/[^\d]+/g, "")
    const isPhoneNumber = formattedValue.length === 11

    return isPhoneNumber
  }, {
    message: 'Formato inválido!'
  }),
  isActive: z.boolean({
    message: 'Este campo é obrigatório!'
  }),
  email: z.string({
    message: 'Este campo é obrigatório!'
  }),
  password: z.string({
    message: 'Este campo é obrigatório!'
  }).min(6, {
    message: 'É necessário no mínimo 6 caracteres!'
  }),
})

type EditDriverType = z.infer<typeof newUserSchema>

interface EditDriverFormProps {
  driver: Driver
  openDialog: (value: boolean) => void;
  onEditDriver: (driver: Driver) => void;
}

export function EditDriverForm({ driver, openDialog, onEditDriver }: EditDriverFormProps) {
  const form = useForm<EditDriverType>({
    resolver: zodResolver(newUserSchema)
  })

  const { handleSubmit, formState: { isSubmitting } } = form
  
  async function onSubmit(data: EditDriverType) {
    try {
      const response = await api(`/driver/${driver.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error()
      }

      const updatedDriver: Driver = await response.json()
      onEditDriver(updatedDriver)
    } catch {
      toast.error('Erro ao alterar o motorista')
      return
    }

    openDialog(false)

    toast.success('Motorista alterado com sucesso')
  }

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto px-1">
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

        <FormField
          control={form.control}
          name="isActive"
          defaultValue={isActive}
          render={({ field: { value, onChange }}) => (
            <FormItem>
              <FormControl>
              <div className="flex flex-col gap-2">
                <Label className="font-normal text-zinc-800 dark:text-zinc-400">Ativar motorista</Label>
                <Switch defaultChecked={isActive} checked={value} onCheckedChange={onChange} />
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-8 bg-indigo-800 dark:bg-indigo-600 text-white hover:brightness-90 transition rounded-md flex items-center justify-center px-3 py-2 text-sm">
          {isSubmitting ? <LoadingIndicator /> : 'Salvar'}
        </Button>
      </form>
    </Form>
  )
}