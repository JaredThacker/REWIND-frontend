"use client";

import { Bell, Menu, Search, Video } from "lucide-react";
import Link from "next/link";
import { FormEvent, useRef } from "react";

export const Navbar = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchInputRef.current) {
      console.log(searchInputRef.current.value);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-screen z-20 dark:bg-black bg-inherit min-h-16">
      <div className="flex justify-between items-center px-2 md:px-7 h-16">
        <div className="flex items-center">
          <span className="hover:bg-background-dark/30 md:block hidden hover:text-white cursor-pointer rounded-full p-2 mr-3">
            <Menu onClick={(handleSubmit) => {}} size={30} />
          </span>
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden md:block text-2xl font-bold">REWIND</span>
          </Link>
        </div>

        <div className="md:flex items-center justify-center hidden">
          <form
            onSubmit={handleSubmit}
            className="flex items-center h-10 mx-auto"
          >
            <input
              type="search"
              placeholder="Search"
              ref={searchInputRef}
              className="px-4 h-full md:w-48 lg:w-96 border dark:border-gray-50 border-gray-300 rounded-l-full focus:outline-none"
            />
            <div className="h-full px-5 grid place-content-center bg-background-light text-gray rounded-r-full">
              <Search />
            </div>
          </form>
        </div>
        <div className="flex items-center space-x-7">
          <div className="md:hidden">{/* theme toggler */}</div>
          <Video />
          <Bell />
        </div>
      </div>
    </nav>
  );
};
