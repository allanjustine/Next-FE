"use client";

import { useState, useEffect, useRef } from "react";
import ActiveLink from "../utils/NavbarActiveLink";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isAuthenticated, user, logout, userRoles }: any = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-50 shadow-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2065/2065254.png"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Blog App
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          {isAuthenticated && (
            <button
              ref={buttonRef}
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={toggleDropdown}
              aria-expanded={dropdownOpen ? "true" : "false"}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
                alt="user photo"
              />
            </button>
          )}

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 min-w-52 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 right-12 top-9 md:right-0 md:top-6"
            >
              <div className="absolute right-3 top-[-4px] transform rotate-45 bg-white dark:bg-gray-700 w-2 h-2"></div>
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user?.name}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </Link>
                </li>
                <li></li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      logout();
                      toggleDropdown();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
          <button
            data-collapse-toggle="navbar-user"
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            menuOpen ? "" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              {isAuthenticated ? (
                <ActiveLink href="/dashboard">Dashboard</ActiveLink>
              ) : (
                <ActiveLink href="/">Home</ActiveLink>
              )}
            </li>
            <li>
              <ActiveLink href="/about">About</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/services">Services</ActiveLink>
            </li>
            <li>
              <ActiveLink href="/tallies">Tallies</ActiveLink>
            </li>
            {isAuthenticated && (
              <li>
                <ActiveLink href="/blog">Blogs</ActiveLink>
              </li>
            )}
            {isAuthenticated &&
              (userRoles?.includes("admin") ||
                userRoles?.includes("superadmin")) && (
                <li>
                  <ActiveLink href="/users">Users</ActiveLink>
                </li>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;