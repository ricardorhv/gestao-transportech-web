/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
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
  }),
  document: z.string({
    message: 'Este campo é obrigatório!'
  }),
  phone: z.string({
    message: 'Este campo é obrigatório!'
  }),
  isActive: z.boolean({
    message: 'Este campo é obrigatório!'
  }),
  email: z.string({
    message: 'Este campo é obrigatório!'
  }),
  password: z.string({
    message: 'Este campo é obrigatório!'
  }),
})

type NewUserType = z.infer<typeof newUserSchema>

export function AddNewUserForm() {
  const form = useForm<NewUserType>({
    resolver: zodResolver(newUserSchema)
  })
  const { handleSubmit, formState: { isSubmitting } } = form

  async function onSubmit(data: NewUserType) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data);
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
          render={({ field: { value, ...props } }) => (
            <FormItem>
              <FormControl>
              <div className="flex flex-col gap-2">
                <Label className="font-normal text-zinc-800 dark:text-zinc-400">Ativar motorista</Label>
                <Switch value={`${value}`} {...props} />
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