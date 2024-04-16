"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import config from "@/amplifyconfiguration.json"
import { Amplify } from "aws-amplify"
import { confirmSignUp, signUp } from "aws-amplify/auth"
import { signIn, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/Toaster/use-toast"

Amplify.configure(config)

const newUserTextKeys = {
  title: "Create an account",
  description: "Enter your email below to create your account",
  button: "Create account",
  footer: "Have an account?",
  footerLink: "Login",
  confirmButton: "Confirm account",
}

const existingUserTextKeys = {
  title: "Welcome back!",
  description: "Enter your email below to login to your account",
  button: "Login",
  footer: "Not registered?",
  footerLink: "Create an account",
}

export function AuthCard() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [showEmailError, setShowEmailError] = React.useState(false)
  const [password, setPassword] = React.useState("")
  const [showPwdError, setShowPwdError] = React.useState(false)
  const [isNewUser, setIsNewUser] = React.useState(false)
  const [textKeys, setTextKeys] = React.useState(newUserTextKeys)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSignUpSuccessful, setIsSignUpSuccessful] = React.useState(false)
  const [confirmationCode, setConfirmationCode] = React.useState("")

  // Set Role
  const [roleId, setRoleId] = React.useState(''); // 'event_manager' or 'ticketing_officer'


  const { data: session, status } = useSession()
  const { toast } = useToast()

  React.useEffect(
    () =>
      isNewUser
        ? setTextKeys(newUserTextKeys)
        : setTextKeys(existingUserTextKeys),
    [isNewUser]
  )

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email)
  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,25}$/
    return passwordRegex.test(password)
  }

  const register = async (email, password) => {
    setIsLoading(true)
    try {
      const res = await signUp({
        username: email,
        password: password,
        attributes: {
          email,
        },
      })
      setIsSignUpSuccessful(true)
      setTextKeys((prevKeys) => ({
        ...prevKeys,
        button: prevKeys.confirmButton,
      }))
      console.log(res)
    } catch (error) {
      console.log("error signing up:", error)
      toast({
        variant: "destructive",
        title: "Error signing up: " + error.message,
      })
    }
  }

  const confirmRegistration = async (email, confirmationCode) => {
    setIsLoading(true);
    try {
      const res = await confirmSignUp({
        username: email,
        confirmationCode,
      });
      console.log(res);
      if (res.isSignUpComplete) {
        let endpoint = '';
        if (role === 2) {
          endpoint = '/api/user_event_manager/';
        } else if (role === 'ticketing_officer') {
          endpoint = '/api/user_ticketing_officer/';
        }
  
        try {
          const userServiceRes = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const data = await userServiceRes.json();
          console.log(data);
          setTextKeys(existingUserTextKeys);
          setIsNewUser(false);
        } catch (err) {
          console.log("error registering user in database:", err);
          toast({
            variant: "destructive",
            title: "Error registering user in database: " + err.message,
          });
        }
      }
    } catch (error) {
      console.log("error confirming sign up:", error);
      toast({
        variant: "destructive",
        title: "Error confirming sign up: " + error.message,
      });
    }
    setIsLoading(false);
  }

  const login = async (email, password) => {
    if (session?.user) {
        // If there's already a user session, redirect to home page
        router.push('/');
        return;
    }
    try {
        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });
        if (res?.ok) {
            router.push('/');
        } else {
            toast({
                variant: "destructive",
                title: "Error signing in: " + res.error,
            });
        }
    } catch (error) {
        console.log("error signing in:", error);
        toast({
            variant: "destructive",
            title: "Error signing in: " + error.message,
        });
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) {
      toast({
        variant: "destructive",
        title: "Please select a role",
      });
      return;
    }
    if (!isEmailValid(email)) {
      setShowEmailError(true);
      return;
    }
    if (isNewUser && !isPasswordValid(password)) {
      setShowPwdError(true);
      return;
    }
    setIsLoading(true);
    isNewUser ? await register(email, password) : await login(email, password);
    setIsLoading(false);
  }
  

  const handleConfirmRegistration = async (e) => {
    e.preventDefault()
    await confirmRegistration(email, confirmationCode)
  }

  return (
    <>
      <div className="h-[calc(100vh-3.5rem)] items-center justify-center">
        
        <form
          onSubmit={
            isSignUpSuccessful ? handleConfirmRegistration : handleSubmit
          }
        >
          <Card className="border-0 p-20">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">{textKeys.title}</CardTitle>
              <CardDescription>{textKeys.description}</CardDescription>
            </CardHeader>

            {/* Select Role */}
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Select your role</Label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              disabled={isLoading}
              className="input-field-class"
              style={{ fontSize: '12px' }}>
              <option value="2">Event Manager</option>
              <option value="3">Ticketing Officer</option>
            </select>
          </div>
          {/* Existing form fields for email, password, etc. */}
        </CardContent>

            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                {showEmailError ? (
                  <div className="text-xs text-destructive">
                    Please enter a valid email address
                  </div>
                ) : null}
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                {showPwdError ? (
                  <div className="text-xs text-rose-300">
                    <li>8-25 characters</li>
                    <li>upper and lowercase letters</li>
                    <li>at least 1 number</li>
                    <li>at least 1 special character</li>
                  </div>
                ) : null}
                <Input
                  id="password"
                  type="password"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {isSignUpSuccessful && isNewUser && (
                <div className="grid gap-2">
                  <Label htmlFor="code">Confirmation Code</Label>
                  <Input
                    id="confirmationCode"
                    type="text"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                type="submit"
                disabled={
                  !email ||
                  !password ||
                  (isSignUpSuccessful && !confirmationCode)
                }
              >
                {isLoading ? (
                  <Icons.spinner className="animate-spin" />
                ) : (
                  textKeys.button
                )}
              </Button>
            </CardFooter>
            <CardFooter>
              <div className="relative w-full">
                <div className="relative flex gap-1 text-xs">
                  {textKeys.footer}
                  <span
                    className="cursor-pointer font-medium text-primary underline"
                    onClick={() => setIsNewUser(!isNewUser)}
                  >
                    {textKeys.footerLink}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  )
}
