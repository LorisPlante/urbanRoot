"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { icon } from "leaflet";
import L from "leaflet";

type Location = {
  title: string;
  img: string | false;
  slug: string;
  lat: string;
  lng: string;
  list_typeprojet: string[];
  list_typeactivite: string[];
  list_techniqueprod: string[];
  list_typeprod: string[];
  cp: string;
  ville: string;
  ouvertpublic: string | null;
  prixsolidaires: string | null;
  hlm: string | null;
  qpv: string | null;
};

export default function Map() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const ICON = icon({ iconUrl: "/medias/img/marker.png", iconSize: [32, 45] });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://www.observatoire-agriculture-urbaine.org/json/listsites.php?v=1720789221209");
        const data: Location[] = await response.json();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const filteredLocations = React.useMemo(() => {
    if (!selectedType) return locations;

    return locations.filter((location) => location.list_typeprojet.includes(selectedType));
  }, [locations, selectedType]);

  const southWest = L.latLng(-90, -180);
  const northEast = L.latLng(90, 180);
  const bounds = L.latLngBounds(southWest, northEast);

  return (
    <>
      <div className="flex w-full">
        <MapContainer
          center={[46.5397222, 2.4302777777777775]}
          zoom={6}
          minZoom={2}
          maxZoom={18}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          className="w-4/5 h-[calc(100vh-110px)] z-10">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerClusterGroup>
            {filteredLocations.map((location) => (
              <Marker key={location.slug} position={[parseFloat(location.lat), parseFloat(location.lng)]} icon={ICON}>
                <Popup>
                  <div className=" flex flex-col justify-start items-start gap-3 space-y-0">
                    <h3 className="font-bold">{location.title}</h3>
                    {location.img && <img src={location.img} alt={location.title} style={{ width: "100px" }} />}
                    <p>
                      {location.cp}, {location.ville}
                    </p>
                    <p className="text-darkGreen font-bold">
                      Type: <br />
                      <span className="text-primary font-normal">{location.list_typeprojet.join(", ")}</span>
                    </p>
                    {location.list_typeactivite && (
                      <p className="text-darkGreen font-bold">
                        Activités : <br />
                        <span className="text-primary font-normal">{location.list_typeactivite.join(", ")}</span>
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
        <div className="w-1/4 h-[calc(100vh-110px)] bg-secondary flex flex-col border-l-2 border-l-darkGreen gap-5 items-center justify-start pt-11 px-4">
          <p className="w-full text-3xl font-bold">Trier par :</p>
          <div className="flex flex-col space-y-2 w-full">
            <label className={`w-full flex justify-between items-center cursor-pointer px-4 py-2 rounded ${selectedType === null ? "bg-lightGreen font-bold" : "bg-white"}`}>
              <span>Tout</span>
              <input type="radio" name="typeFilter" value="" checked={selectedType === null} onChange={() => setSelectedType(null)} />
            </label>
            <label
              className={`w-full flex justify-between items-center cursor-pointer px-4 py-2 rounded ${selectedType === "jardin-potager" ? "bg-lightGreen font-bold" : "bg-white"}`}>
              <span>Jardin / Potager</span>
              <input type="radio" name="typeFilter" value="jardin-potager" checked={selectedType === "jardin-potager"} onChange={() => setSelectedType("jardin-potager")} />
            </label>
            <label
              className={`w-full flex justify-between items-center cursor-pointer px-4 py-2 rounded ${
                selectedType === "ferme-urbaine-participative" ? "bg-lightGreen font-bold" : "bg-white"
              }`}>
              <span>Ferme Urbaine Participative</span>
              <input
                type="radio"
                name="typeFilter"
                value="ferme-urbaine-participative"
                checked={selectedType === "ferme-urbaine-participative"}
                onChange={() => setSelectedType("ferme-urbaine-participative")}
              />
            </label>
            <label
              className={`w-full flex justify-between items-center cursor-pointer px-4 py-2 rounded ${
                selectedType === "ferme-urbaine-specialisee" ? "bg-lightGreen font-bold" : "bg-white"
              }`}>
              <span>Ferme Urbaine Spécialisée</span>
              <input
                type="radio"
                name="typeFilter"
                value="ferme-urbaine-specialisee"
                checked={selectedType === "ferme-urbaine-specialisee"}
                onChange={() => setSelectedType("ferme-urbaine-specialisee")}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
