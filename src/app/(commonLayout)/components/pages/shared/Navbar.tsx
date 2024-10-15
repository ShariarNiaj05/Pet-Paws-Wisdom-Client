"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function NavBar() {
  const role = "user";
  console.log("user from navbar", role);
  const routeMap: Record<string, string> = {
    user: "/dashboard",
    // admin: "/dashboard/admin",
    admin: "/admin-dashboard",
  };
  // if (!user) return <p>Loading...</p>;
  return (
    <Navbar maxWidth="2xl">
      <NavbarBrand>
        <Link className="flex" href="/">
          <p className="font-bold text-inherit px-4">Pet Paws Wisdom</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/pet-stories">
            Pet Stories
          </Link>
        </NavbarItem>
        {/* <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem> */}
        <NavbarItem>
          {role && <Link href={routeMap[role]}>Dashboard</Link>}
          {/* {user && <Link href={routeMap[user?.role]}>Dashboard</Link>} */}
          {/* <Link href={routeMap.user}>Dashboard</Link> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        {role ? (
          <NavbarItem>
            <Button color="primary" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
