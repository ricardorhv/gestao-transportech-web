/* eslint-disable @typescript-eslint/no-unused-vars */
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

const newDriverSchema = z.object({
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

type NewDriverType = z.infer<typeof newDriverSchema>

interface AddNewDriverFormProps {
  openDialog: (value: boolean) => void;
  handleAddNewDriver: (driver: Driver) => void;
}

export function AddNewDriverForm({ openDialog, handleAddNewDriver }: AddNewDriverFormProps) {
  const form = useForm<NewDriverType>({
    resolver: zodResolver(newDriverSchema)
  })
  const { handleSubmit, formState: { isSubmitting } } = form

  async function onSubmit(data: NewDriverType) {
    try {
      const response = await api('/driver', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error()
      }

      const driver: Driver = await response.json()
      handleAddNewDriver(driver)
    } catch(error) {
      toast.error('Erro ao adicionar o motorista')
      return
    }

    openDialog(false)

    toast.success('Motorista adicionado com sucesso')
  }

  return (
    <Form {...form}>
      <form className="space-y-4 max-h-[80vh] overflow-y-auto px-1" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: true
          }}
          render={({ field: { value, ...props } }) => (
            <FormItem>
              <FormControl>
                <Input className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Nome" {...props} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field: { value, ...props } }) => (
            <FormItem>
              <FormControl>
                <Input className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Sobrenome" {...props} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document"
          render={({ field: { value, ...props } }) => (
            <FormItem>
              <FormControl>
                <Input className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Documento" {...props} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverLicense"
          render={({ field: { value, ...props } }) => (
            <FormItem>
              <FormControl>
                <Input className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Carteira de motorista" {...props} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field: { value, ...props } }) => (
            <FormItem>
              <FormControl>
                <Input type="tel" className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Telefone" {...props} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field: { value, ...props } }) => (
            <FormItem>
              <FormControl>
                <Input type="email" className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Email" {...props} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field: { value, ...props } }) => (
            <FormItem>
              <FormControl>
                <Input type="password" className="p-5 focus-visible:ring-0 focus-visible:dark:border-indigo-600 focus-visible:border-indigo-800 text-sm" placeholder="Senha" {...props} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          defaultValue={false}
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormControl>
              <div className="flex flex-col gap-2">
                <Label className="font-normal text-zinc-800 dark:text-zinc-400">Ativar motorista</Label>
                <Switch checked={value} onCheckedChange={onChange} />
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-8 bg-indigo-800 dark:bg-indigo-600 text-white hover:brightness-90 transition rounded-md flex items-center justify-center px-3 py-2 text-sm">
          {isSubmitting ? <LoadingIndicator /> : 'Cadastrar'}
        </Button>
      </form>
    </Form>
  )
}