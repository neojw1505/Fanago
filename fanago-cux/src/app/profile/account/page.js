"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/Toaster/use-toast"

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!").optional(),
})

export default function AccountForm() {
  const { data: session, status } = useSession()
  const email = session?.user?.email
  const { toast } = useToast()

  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    async function getUserProfile() {
      try {
        const url = `/api/user?email=${email}`
        const res = await fetch(url)
        const data = await res.json()
        setUserProfile(data.data.data)
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
        toast({
          title: "Error",
          description: "Failed to fetch user profile.",
          status: "error",
        })
      }
    }
    if (email) {
      getUserProfile()
    }
  }, [email, toast])

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: userProfile?.username || "",
      email: userProfile?.email || "",
      phoneNumber: userProfile?.phoneNumber || "",
    },
  })

  useEffect(() => {
    form.setValue("email", email ? email : "john@gmail.com", {
      shouldValidate: true,
    })
  }, [email, form])

  async function onSubmit(data) {
    console.log(data)
    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const resData = await res.json()
    console.log(resData)
    if (resData.status == "success") {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        status: "success",
      })
    } else {
      toast({
        title: "Profile update failed",
        description: "There was an error updating your profile.",
        status: "error",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account details.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            className="focus:outline-none focus:ring-0"
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input placeholder={email} {...field} disabled />
                <FormDescription>
                  This is the email address associated with your account. This
                  is non-editable.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder={userProfile?.username || ""} {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name. It can be your real name or
                  a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  placeholder={userProfile?.phoneNumber || ""}
                  {...field}
                />
                <FormDescription>
                  Please enter a valid phone number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="secondary">
            Update profile
          </Button>
        </form>
      </Form>
    </div>
  )
}
