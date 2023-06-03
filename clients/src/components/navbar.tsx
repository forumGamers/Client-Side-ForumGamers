"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export interface DropDown {
  href: string;
  name: string;
}

interface navbarProps {
  dropdown: DropDown[];
  isLoggedUser: boolean;
}

function dropDownHandler(
  dropDown: DropDown[],
  isLoggedIn: boolean
): JSX.Element {
  const handleSignOut = (e: React.FormEvent) => {
    e.preventDefault();
    signOut();
  };
  return (
    <ul
      tabIndex={0}
      className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      {dropDown.map((el: DropDown, idx: number) => {
        return (
          <li className="hover-bordered" key={idx}>
            <Link href={el.href}>{el.name}</Link>
          </li>
        );
      })}
      <li className="hover-bordered">
        {isLoggedIn ? (
          <a onClick={handleSignOut}>Sign out</a>
        ) : (
          <Link href="/login">Sign Up</Link>
        )}
      </li>
    </ul>
  );
}

export default function Navbar(props: navbarProps): JSX.Element {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            {dropDownHandler(props.dropdown, props.isLoggedUser)}
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">Forum Gamers</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="https://ik.imagekit.io/b8ugipzgo/FrontEnd/guest__1_.svg?updatedAt=1683775010676"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
