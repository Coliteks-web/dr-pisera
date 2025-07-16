"use client";

import Navbar from "../components/Navbar";

export default function StartPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-white text-white">
        <h1 className="text-4xl font-light">Hello World</h1>
      </main>
    </>
  );
}
