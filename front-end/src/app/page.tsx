'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();

  const quips = [
    "the only place where searching for flights is easier than deciding what to watch on Netflix.",
    "where you can explore the world without selling a kidney.",
    "Affordable flights—because who needs a yacht anyway?",
    "Fast flights...relativly fast results.",
    "with more flight optionss than your doom-scroll feed.",
    "helping you out of you couch, into paradise.",
    "the Breakable Toy everyone is talking about!",
  ]

  const [quip, setQuip] = useState("");

  useEffect(() =>{
    setQuip(quips[Math.floor(Math.random() * quips.length)])
  },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-500 to-cyan-900 text-white p-8">
      <main className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold sm:text-6xl mb-6">
          Ready for Takeoff?
        </h1>
        <p className="text-lg sm:text-xl mb-10">
          Welcome to <strong className="text-yellow-300">FlightSearcher</strong> | {quip}
        </p>

        <button
          onClick={() => router.push('/search')}
          className="bg-cyan-600 text-white text-lg font-semibold px-8 py-4 rounded-md shadow-lg hover:bg-cyan-500 transition-transform transform hover:scale-105"
        >
          Let's Find Some Flights 🚀
        </button>
      </main>

      <footer className="mt-16 text-sm text-white/80 justify-self-baseline">
        Built with <span className="text-red-500">♥</span> by Erik.
      </footer>
    </div>
  );
}
