import React from "react";
import Header from "@/components/header";
import Map from "@/components/map/importMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La carte des jardins - Urban Roots",
  description: "Découvrez la carte intéractive de tous nos jardins urbains collaboratif connus à ce jour.",
};

export default function Carte() {
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-110px)] w-full mt-[110px]">
        <Map />
      </main>
    </>
  );
}
