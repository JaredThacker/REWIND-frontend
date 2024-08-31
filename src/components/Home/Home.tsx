"use client";

import React from "react";
import { Navbar } from "../Navbar/Navbar";
import MainFeed from "../MainFeed/mainFeed";
import { ThemeProvider } from "../theme-provider";

export const Home = () => {
  return (
    <header>
      <Navbar />
      <MainFeed />
    </header>
  );
};
