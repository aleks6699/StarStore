"use client";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import type { NavigationLink } from "./types";
import { useContext } from "react";
import { AuthContext } from "@/context/authProvider";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={100} height={40} priority />
      </Link>
      <Navigation>
        <Navigation.Main href="/">Main</Navigation.Main>
        <Navigation.Catalog href="/catalog">Catalog</Navigation.Catalog>
        <Navigation.Auth />
        <Navigation.Profile href="/profile">Profile</Navigation.Profile>
        <Navigation.Cart href="/cart">Cart</Navigation.Cart>
      </Navigation>
    </header>
  );
};
const Navigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav>
      <ul className={styles.nav}>{children}</ul>
    </nav>
  );
};

const NavigationLink = ({ children, href }: NavigationLink) => {
  return (
    <li>
      <Link href={href}> {children}</Link>
    </li>
  );
};

const NavigationAuth = () => {
  const { isLoggedIn} = useContext(AuthContext);

  return isLoggedIn ? (
    <button aria-label="Logout" onClick={() => console.log("logout")}>
      Logout
    </button>
  ) : (
    <>
      <NavigationLink href="/signIn">Sign In</NavigationLink>
      <NavigationLink href="/signUp">Sign Up</NavigationLink>
    </>
  );
};

Navigation.Main = NavigationLink;
Navigation.Catalog = NavigationLink;
Navigation.Profile = NavigationLink;
Navigation.Cart = NavigationLink;
Navigation.Auth = NavigationAuth;
