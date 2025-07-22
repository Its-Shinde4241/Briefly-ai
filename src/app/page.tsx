"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ErrorContext } from "better-auth/react";
export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data: session } = authClient.useSession();

  const onsignUp = () => {
    console.log(name, email, password);
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onError: (error: ErrorContext) => {
          window.alert("womething went wrong : " + error.error.message);
        },
        onSuccess: () => {
          window.alert("signup successful");
          setName("");
          setEmail("");
          setPassword("");
        },
      }
    );
  };
  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (error: ErrorContext) => {
          window.alert("womething went wrong : " + error.error.message);
        },
        onSuccess: () => {
          window.alert("login successful");
          setName("");
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="h-screen w-screen flex gap-4 flex-col items-center justify-center">
        <h1 className="text-2xl">Welcome {session.user.name}</h1>
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => authClient.signOut()}
        >
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <>
      <div className=" pt-72 flex gap-4 flex-col items-center justify-center">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-60"
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-60"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-60"
        />
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={onsignUp}
        >
          signup
        </Button>
      </div>

      <div className=" flex gap-4 flex-col items-center justify-center">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-60"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-60"
        />
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={onLogin}
        >
          login
        </Button>
      </div>
    </>
  );
}
