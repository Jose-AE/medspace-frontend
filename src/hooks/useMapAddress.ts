import { useState } from "react";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export function useMapAddress(initialCoords: Coordinates) {
  const [coordinates, setCoordinates] = useState<Coordinates>(initialCoords);
  const [address, setAddress] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [addressCountry, setAddressCountry] = useState("");

  async function fetchAddressFromCoordinates(lat: number, lon: number) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      const addr = data?.address;

      setAddress(data?.display_name ?? "Dirección no encontrada");
      setAddressCity(addr?.city || addr?.town || addr?.village || "");
      setAddressState(addr?.state || "");
      setAddressZip(addr?.postcode || "");
      setAddressCountry(addr?.country || "");
    } catch {
      setAddress("Dirección no encontrada");
      setAddressCity("");
      setAddressState("");
      setAddressZip("");
      setAddressCountry("");
    }
  }

  async function updateLocation(newCoords: Coordinates) {
    setCoordinates(newCoords);
    await fetchAddressFromCoordinates(newCoords.latitude, newCoords.longitude);
  }

  return {
    coordinates,
    address,
    addressCity,
    addressState,
    addressZip,
    addressCountry,
    updateLocation
  };
}
