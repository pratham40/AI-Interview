"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type FormType = "sign-in" | "sign-up"

const AuthFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(2, "Name is too short").max(50) : z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

function AuthForm({ type }: { type: FormType }) {

    const router = useRouter();
  const formSchema = AuthFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const isSignIn = type === "sign-in"

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if (type === "sign-up") {
            toast.success("Account created successfully!")
            router.push("/sign-in")
        }else{
            toast.success("Signed in successfully!")
            router.push("/")
        }
    } catch (error) {
        console.error("Error during form submission:", error)
        toast.error("An error occurred while processing your request. Please try again.")
    }
  }

  return (
    <div className="caret-sidebar-border lg:min-w-[566px] space-y-6">
      <h1 className="text-2xl font-bold">{isSignIn ? "Sign In" : "Create Account"}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your mail" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {isSignIn ? "Sign In" : "Create Account"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-center">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-primary">
          {isSignIn ? "Create account" : "Sign in"}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm
