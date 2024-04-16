"use client"

import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/Sidebar"

export default function ProfileLayout({ children }) {
  const { status } = useSession()
  const url = process.env.NEXT_PUBLIC_HOST

  if (status === "loading") {
    return <div className="container pt-[4vh] text-center"> Loading...</div>
  } else {
    return (
      <main className="container min-h-[100vh-14] space-y-6 px-[2vw] pb-16 pt-[4vh] dark:text-white">
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row">
            <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
            <div className="ml-auto">
              <Button onClick={() => signOut({ callbackUrl: url })}>
                Sign Out
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Manage your account settings and see ticket history.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav />
          </aside>
          <div className="flex-1 grow">{children}</div>
        </div>
      </main>
    )
  }
}
