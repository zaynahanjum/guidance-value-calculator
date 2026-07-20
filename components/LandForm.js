"use client";

import { useEffect, useState } from "react";

export default function LandForm() {
  const [villages, setVillages] = useState([]);
  const [wards, setWards] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [streets, setStreets] = useState([]);

  const [village, setVillage] = useState("");
  const [ward, setWard] = useState("");
  const [block, setBlock] = useState("");
  const [street, setStreet] = useState("");
  const [unit, setUnit] = useState("sqm");
  const [area, setArea] = useState("");

  const [guidanceValue, setGuidanceValue] = useState(0);
  const [stampDuty, setStampDuty] = useState(0);

  useEffect(() => {
    async function getVillages() {
      const res = await fetch("/api/land/villages");
      const data = await res.json();
      setVillages(data);
    }

    getVillages();
  }, []);

  useEffect(() => {
    if (!village) return;

    async function getWards() {
      const res = await fetch(`/api/land/wards?village=${village}`);
      const data = await res.json();
      setWards(data);

      setWard("");
      setBlocks([]);
      setBlock("");
      setStreets([]);
      setStreet("");

      setGuidanceValue(0);
      setStampDuty(0);
    }

    getWards();
  }, [village]);

  useEffect(() => {
    if (!ward) return;

    async function getBlocks() {
      const res = await fetch(
        `/api/land/blocks?village=${village}&ward=${ward}`
      );

      const data = await res.json();
      setBlocks(data);

      setBlock("");
      setStreets([]);
      setStreet("");

      setGuidanceValue(0);
      setStampDuty(0);
    }

    getBlocks();
  }, [ward]);

  useEffect(() => {
    if (!block) return;

    async function getStreets() {
      const res = await fetch(
        `/api/land/streets?village=${village}&ward=${ward}&block=${block}`
      );

      const data = await res.json();
      setStreets(data);

      setStreet("");

      setGuidanceValue(0);
      setStampDuty(0);
    }

    getStreets();
  }, [block]);

  async function calculate() {
    const res = await fetch("/api/land/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        village,
        ward,
        block,
        street,
        area,
        unit
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
          Land
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
          value={ward}
          onChange={(e) => {
            setWard(e.target.value);
            setGuidanceValue(0);
            setStampDuty(0);
          }}
          className="w-full border border-black p-2 rounded"
        >
          <option value="">Select Ward</option>
          {wards.map((w) => (
            <option key={w.ward} value={w.ward}>
              {w.ward}
            </option>
          ))}
        </select>

        <select
          value={block}
          onChange={(e) => {
            setBlock(e.target.value);
            setGuidanceValue(0);
            setStampDuty(0);
          }}
          className="w-full border border-black p-2 rounded"
        >
          <option value="">Select Block</option>
          {blocks.map((b) => (
            <option key={b.block} value={b.block}>
              {b.block}
            </option>
          ))}
        </select>

        <select
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
            setGuidanceValue(0);
            setStampDuty(0);
          }}
          className="w-full border border-black p-2 rounded"
        >
          <option value="">Select Street</option>
          {streets.map((s) => (
            <option key={s.street} value={s.street}>
              {s.street}
            </option>
          ))}
        </select>

        <div className="flex flex-row justify-between">
          <UnitBox text="sqm" unit={unit} setUnit={setUnit} />
          <UnitBox text="sqft" unit={unit} setUnit={setUnit} />
          <UnitBox text="cent" unit={unit} setUnit={setUnit} />
          <UnitBox text="gunta" unit={unit} setUnit={setUnit} />
          <UnitBox text="acre" unit={unit} setUnit={setUnit} />
        </div>

        <input
          type="number"
          placeholder={`Area (${unit})`}
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
              Estimated Stamp Duty (7.6%)
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

function UnitBox({ text, unit, setUnit }) {
  return (
    <div
      onClick={() => {
        setUnit(text);
      }}
      className={`rounded px-2 border cursor-pointer ${unit === text ? "bg-black text-white" : "bg-white"}`}
    >
      {text}
    </div>
  );
}