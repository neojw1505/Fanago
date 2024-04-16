"use client"
import Dashboard from "@/components/Dashboard/Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()
  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session); // Logs the session data to console
    if (status === "unauthenticated") {
      router.push("/auth")
    }
  }, [status, router])

  return (
    <>
      <DefaultLayout children={undefined}>
        <Dashboard />
        <br></br>
      </DefaultLayout>
    </>
  );
}
