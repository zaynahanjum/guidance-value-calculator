"use client";

import { useEffect, useState } from "react";

export default function ApartmentForm() {
  const [villages, setVillages] = useState([]);
  const [apartments, setApartments] = useState([]);

  const [village, setVillage] = useState("");
  const [apartment, setApartment] = useState("");
  const [area, setArea] = useState("");
  const [guidanceValue, setGuidanceValue] = useState(0);
  const [stampDuty, setStampDuty] = useState(0);

  useEffect(() => {
    async function getVillages() {
      const res = await fetch("/api/apartment/villages");
      const data = await res.json();
      setVillages(data);
    }

    getVillages();
  }, []);

  useEffect(() => {
    if (!village) {
      setApartments([]);
      setApartment("");
      return;
    }

    async function getApartments() {
      const res = await fetch(
        `/api/apartment/buildings?village=${village}`
      );

      const data = await res.json();
      setApartments(data);
      setApartment("");
    }

    getApartments();
  }, [village]);

  async function calculate() {
    const res = await fetch("/api/apartment/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        village,
        apartment,
        area,
      }),
    });

    const data = await res.json();

    setGuidanceValue(data.guidanceValue);
    setStampDuty(data.stampDuty);
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-black rounded-md p-6 space-y-4">

        <h2 className="text-2xl font-semibold text-center">
          Apartment
        </h2>

        <select
          value={village}
          onChange={(e) => {
            setVillage(e.target.value);
            setGuidanceValue(0);
            setStampDuty(0);
          }}
          className="w-full border border-black p-2 rounded"
        >
          <option value="">Select Village</option>
          {villages.map((v) => (
            <option key={v.village} value={v.village}>
              {v.village}
            </option>
          ))}
        </select>

        <select
          value={apartment}
          onChange={(e) => {
            setApartment(e.target.value);
            setGuidanceValue(0);
            setStampDuty(0);
          }}
          className="w-full border border-black p-2 rounded"
        >
          <option value="">Select Apartment</option>
          {apartments.map((a) => (
            <option
              key={a.apartment_name}
              value={a.apartment_name}
            >
              {a.apartment_name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Area (Sq. Meters)"
          value={area}
          onChange={(e) => {
            setArea(e.target.value);
            setGuidanceValue(0);
            setStampDuty(0);
          }}
          className="w-full border border-black p-2 rounded"
        />

        <button
          onClick={calculate}
          className="w-full border border-black p-2 rounded hover:bg-black hover:text-white transition"
        >
          Calculate
        </button>

        <div className="border border-black rounded p-4 space-y-4">

          <div className="text-center">
            <p className="text-sm font-medium">
              Calculated Guidance Value
            </p>
            <p className="text-xl font-bold">
              ₹ {Number(guidanceValue).toLocaleString("en-IN")}
            </p>
          </div>

          <hr />

          <div className="text-center">
            <p className="text-sm font-medium">
              Estimated Stamp Duty (7.65%)
            </p>
            <p className="text-xl font-bold">
              ₹ {Number(stampDuty).toLocaleString("en-IN")}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}