"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { icon } from "leaflet";
import L from "leaflet";
import Modal from "@/components/map/modal";

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

const Map: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (searchQuery) {
      const newSuggestions = locations.filter(
        (location) =>
          (location.title && location.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (location.ville && location.ville.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (location.cp && location.cp.startsWith(searchQuery))
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, locations]);

  const filteredLocations = React.useMemo(() => {
    let filtered = locations;

    if (selectedType) {
      filtered = filtered.filter((location) => location.list_typeprojet.includes(selectedType));
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (location) =>
          (location.title && location.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (location.ville && location.ville.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (location.cp && location.cp.startsWith(searchQuery))
      );
    }

    return filtered;
  }, [locations, selectedType, searchQuery]);

  const southWest = L.latLng(-90, -180);
  const northEast = L.latLng(90, 180);
  const bounds = L.latLngBounds(southWest, northEast);

  return (
    <>
      <div className="flex w-full flex-col lg:flex-row">
        <MapContainer
          center={[46.5397222, 2.4302777777777775]}
          zoom={6}
          minZoom={2}
          maxZoom={18}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          className="w-full lg:w-4/5 h-[calc(100vh-438px)] md:h-[calc(100vh-270px)] lg:h-[calc(100vh-110px)] z-10">
          <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
          <MarkerClusterGroup>
            {filteredLocations.map((location) => (
              <Marker key={location.slug} position={[parseFloat(location.lat), parseFloat(location.lng)]} icon={ICON}>
                <Popup>
                  <div className="flex flex-col justify-start items-start gap-3 space-y-0 w-48">
                    <span className="font-bold font-tanker tracking-widest leading-1 text-xl">{location.title}</span>
                    {location.img && <img src={location.img} alt={location.title} className="w-full" />}
                    <p>
                      {location.cp} {location.ville}
                    </p>
                    <button onClick={() => setSelectedLocation(location)} className="bg-darkGreen text-white px-5 py-3 rounded mt-2">
                      {`Plus d'infos`}
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
        <div className="w-full lg:w-1/4 h-auto md:h-[calc(100vh-110px)] bg-secondary flex flex-col border-l-2 border-l-darkGreen gap-5 items-center justify-start py-11 px-4">
          <p className="w-full max-w-[500px] text-3xl font-bold text-darkGreen block">Rechercher :</p>
          <div className="relative w-full max-w-[500px] h-fit">
            <input
              type="text"
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nom / Ville / Code postal"
              className="w-full pl-4 pr-11 py-3 rounded border border-darkGreen"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <svg viewBox="0 0 512 512" className="absolute top-1/2 right-4 h-6 transform -translate-y-1/2 fill-darkGreen">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            {isInputFocused && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border border-darkGreen rounded mt-1 max-h-48 overflow-y-auto z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.slug}
                    className="px-4 py-2 cursor-pointer hover:bg-lightGreen"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSearchQuery(suggestion.title);
                      setSuggestions([]);
                      setIsInputFocused(false);
                      if (searchInputRef.current) {
                        searchInputRef.current.blur();
                      }
                    }}>
                    {suggestion.title} - {suggestion.ville} - {suggestion.cp}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="w-full max-w-[500px] text-3xl font-bold text-darkGreen block mt-5">Trier par :</p>
          <div className="flex flex-col space-y-2 w-full max-w-[500px]">
            <label
              className={`w-full max-w-[500px] flex justify-between items-center cursor-pointer px-4 py-3 rounded ${
                selectedType === null ? "bg-lightGreen font-bold" : "bg-white"
              }`}>
              <span>Tout</span>
              <input type="radio" name="typeFilter" value="" checked={selectedType === null} onChange={() => setSelectedType(null)} />
            </label>
            <label
              className={`w-full max-w-[500px] flex justify-between items-center cursor-pointer px-4 py-3 rounded ${
                selectedType === "jardin-potager" ? "bg-lightGreen font-bold" : "bg-white"
              }`}>
              <span>Jardin / Potager</span>
              <input type="radio" name="typeFilter" value="jardin-potager" checked={selectedType === "jardin-potager"} onChange={() => setSelectedType("jardin-potager")} />
            </label>
            <label
              className={`w-full max-w-[500px] flex justify-between items-center cursor-pointer px-4 py-3 rounded ${
                selectedType === "ferme-urbaine-participative" ? "bg-lightGreen font-bold" : "bg-white"
              }`}>
              <span>Ferme urbaine participative</span>
              <input
                type="radio"
                name="typeFilter"
                value="ferme-urbaine-participative"
                checked={selectedType === "ferme-urbaine-participative"}
                onChange={() => setSelectedType("ferme-urbaine-participative")}
              />
            </label>
            <label
              className={`w-full max-w-[500px] flex justify-between items-center cursor-pointer px-4 py-3 rounded ${
                selectedType === "ferme-urbaine-specialisee" ? "bg-lightGreen font-bold" : "bg-white"
              }`}>
              <span>Ferme urbaine spécialisée</span>
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
      {selectedLocation && <Modal location={selectedLocation} onClose={() => setSelectedLocation(null)} />}
    </>
  );
};

export default Map;
