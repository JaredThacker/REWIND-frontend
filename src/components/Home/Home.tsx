"use client";

import React, { useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import MainFeed from "../MainFeed/mainFeed";

export const Home = () => {
  return (
    <>
      <Navbar />
      <MainFeed />
    </>
  );
};
