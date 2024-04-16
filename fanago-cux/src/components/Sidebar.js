"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const items = [
  {
    title: "Tickets",
    href: "/profile",
  },
  {
    title: "Account",
    href: "/profile/account",
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap lg:flex-col">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-indigo-800 hover:bg-indigo-500"
              : "hover:bg-transparent hover:underline",
            "my-2 mr-2 justify-start md:my-1"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
