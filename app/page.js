"use client";

import { useState } from "react";
import LandForm from "@/components/LandForm";
import ApartmentForm from "@/components/ApartmentForm";

export default function Home() {
  const [type, setType] = useState("land");

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">

      <h1 className="text-3xl font-bold mb-8">
        Guidance Value Calculator
      </h1>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setType("land")}
          className={`border border-black px-6 py-2 rounded ${type === "land" ? "bg-black text-white" : ""
            }`}
        >
          Land
        </button>

        <button
          onClick={() => setType("apartment")}
          className={`border border-black px-6 py-2 rounded ${type === "apartment" ? "bg-black text-white" : ""
            }`}
        >
          Apartment
        </button>
      </div>

      {type === "land" ? <LandForm /> : <ApartmentForm />}
    </div>
  );
}