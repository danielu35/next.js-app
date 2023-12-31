"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex bg-slate-200 p-5 space-x-3">
      <Link href={"/"} className="mr-5">
        Next.Js
      </Link>
      <Link href={"/users"} className="mr-5">
        Users
      </Link>
      <Link href={"/admin"} className="mr-5">
        Admin
      </Link>
      <Link href={"/products"} className="mr-5">
        Products
      </Link>
      {status === "loading" && (
        <span className="loading loading-spinner loading-sm absolute right-10" />
      )}
      {status === "authenticated" && (
        <div className="absolute right-10">
          {`Signed in as: ${session.user!.name}`}
          <Link className="ml-5" href="/api/auth/signout">
            Sign out
          </Link>
        </div>
      )}
      {status === "unauthenticated" && (
        <div className="absolute right-10">
          <Link href={"/api/auth/signin"} className="mr-5">Login</Link>
          <Link href="/auth/create">Create account</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
