"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === "authenticated" && isAuthenticated === false) {
      console.log("Session: ", session.user)
      console.log("Status: ", status)
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [status])
  const pathname = usePathname()
  return (
    <div className="container flex h-14 max-w-screen-2xl items-center px-[4vw] sm:p-[32px]">
      <Link className="mr-[3vw] flex items-center space-x-2" href="/">
        <span className="font-bold">fanago</span>
      </Link>
      <div className="mr-4 hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href="/events"
                legacyBehavior
                passHref
                className={`link ${pathname === "/events" ? "active" : ""}`}
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Events
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/venue"
                legacyBehavior
                passHref
                className={`link ${pathname === "/venue" ? "active" : ""}`}
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Venue
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div className="w-full flex-1 md:w-auto md:flex-none">
          {/* <Input
            type="search"
            placeholder="Search Events"
            className="relative inline-flex h-9 w-full md:w-40 lg:w-64 whitespace-nowrap rounded-[0.5rem] bg-background text-sm font-normal"
          /> */}
        </div>
        <div className="mr-4 hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Suspense fallback={<span>Loading...</span>}>
                  {isAuthenticated ? (
                    <Link
                      href="/profile"
                      legacyBehavior
                      passHref
                      className={`link ${pathname === "/auth" ? "active" : ""}`}
                    >
                      <NavigationMenuLink className="m-3">
                        <Button variant="secondary" className="h-9">
                          My Profile
                        </Button>
                      </NavigationMenuLink>
                    </Link>
                  ) : (
                    <Link
                      href="/auth"
                      legacyBehavior
                      passHref
                      className={`link ${pathname === "/auth" ? "active" : ""}`}
                    >
                      <NavigationMenuLink className="m-3">
                        <Button variant="secondary" className="h-9">
                          Login/Register
                        </Button>
                      </NavigationMenuLink>
                    </Link>
                  )}
                </Suspense>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="m-0 mr-[3vw] flex h-9 items-center rounded p-2 text-white md:hidden">
            <Menu className="h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href="/events" passHref className="text-center">
              <DropdownMenuItem>Events</DropdownMenuItem>
            </Link>
            <Link href="/venue" passHref className="text-center">
              <DropdownMenuItem>Venue</DropdownMenuItem>
            </Link>
            <Suspense fallback={<span>Loading...</span>}>
              {isAuthenticated ? (
                <Link href="/profile" passHref className="text-center">
                  <DropdownMenuItem>My Profile</DropdownMenuItem>
                </Link>
              ) : (
                <Link href="/auth" passHref className="text-center">
                  <DropdownMenuItem>Login/Register</DropdownMenuItem>
                </Link>
              )}
            </Suspense>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}