"use client";

import React, { useState, useRef, FormEvent, useContext } from "react";
import { Bell, Menu, Search, Video } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "../Theme/ThemeToggle";
import UserSignIn from "../userAuth/signIn";
import { redirect, useRouter } from "next/navigation";
import AppContext from "@/context/appContext";

export const Navbar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { setShowNav } = useContext(AppContext);

  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchInputRef.current) {
      const searchQuery = searchInputRef.current.value;

      setDialogOpen(false);
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const handleSignIn = (username: string | null) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setCurrentUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 w-screen z-20 dark:bg-black bg-inherit min-h-16 animate-fadeInDown">
      <div className="flex justify-between items-center px-2 md:px-7 h-16">
        <div className="flex items-center">
          <span className="hover:bg-background-dark/30 md:block hidden hover:text-white cursor-pointer rounded-full p-2 mr-3">
            <Menu
              className="animate-fadeIn animate-duration-[3000ms]"
              onClick={() => setShowNav((prevState) => !prevState)}
            />
          </span>
          <button className="btn btn-ghost">
            <Link href="/" className="flex items-center space-x-2">
              <span className="hidden md:block text-2xl font-bold animate-fadeInLeft">
                REWIND
              </span>
            </Link>
          </button>
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
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => router.push("/upload")}
          >
            <Video />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Bell />
          </button>
          <div className="md:hidden">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger>
                <Search onClick={() => setDialogOpen(true)} />
              </DialogTrigger>
              <DialogContent>
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
              </DialogContent>
            </Dialog>
          </div>
          <div className="hidden md:block">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar>
                    <AvatarImage src="/genericpfp.jpg" alt="Profile Picture" />
                    <AvatarFallback>PFP</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72">
                  <DropdownMenuLabel>
                    <div className="flex space-x-4">
                      <Avatar>
                        <AvatarImage
                          src="/genericpfp.jpg"
                          alt="Profile Picture"
                        />
                        <AvatarFallback>PFP</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-3 text-base">
                        <span>
                          <p>{currentUser}</p>
                          <p>@{currentUser}</p>
                        </span>
                        <Link href={`/channels`} className="text-blue-500">
                          View your channel
                        </Link>
                        <button onClick={handleLogout} className="text-red-500">
                          Logout
                        </button>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2 flex items-center">
                    <span className="mr-2">Appearance:</span>
                    <ThemeToggle />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <UserSignIn onSignIn={handleSignIn} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
