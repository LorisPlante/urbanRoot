import React from "react";
import Header from "@/components/header";
import Map from "@/components/map/importMap";

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
