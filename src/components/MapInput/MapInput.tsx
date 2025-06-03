"use client";

import Map, { MapLayerMouseEvent, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData {
  coordinates: Coordinates;
  displayName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country: string;
}

interface Props {
  //The initial coordinates to display on the map if current location is denied or not available.
  defaultCoordinates?: Coordinates;
  //Callback function triggered when the location changes, providing the new coordinates.
  onLocationChange?: (data: LocationData) => void;
  //URL for the custom map style to be applied to the map.
  mapStyleURL?: string;
  //Additional CSS class names to style the component.
  className?: ClassValue;
}

const DEFAULT_COORDINATES = {
  longitude: -99.132390928256,
  latitude: 19.43121854346279
};

export default function MapInput({
  defaultCoordinates = DEFAULT_COORDINATES,
  onLocationChange,
  mapStyleURL,
  className
}: Props) {
  const [marker, setMarker] = useState<Coordinates>(defaultCoordinates);
  const [loading, setLoading] = useState(false);
  const [fetchingUserLocation, setDoneFethcingUserLocation] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        //on success, fetching user location
        const { latitude, longitude } = position.coords;

        setMarker({ latitude, longitude });
        const locationData = await getLocationData({
          latitude,
          longitude
        });
        onLocationChange?.(locationData);
        setDoneFethcingUserLocation(false);
      },
      async () => {
        //on error, fetching default coordinates
        const locationData = await getLocationData({
          latitude: defaultCoordinates.latitude,
          longitude: defaultCoordinates.longitude
        });
        onLocationChange?.(locationData);
        setDoneFethcingUserLocation(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCoordinates]);

  async function handleMapClick(event: MapLayerMouseEvent) {
    const { lng, lat } = event.lngLat;
    const newMarker = { longitude: lng, latitude: lat };
    setMarker(newMarker);

    setLoading(true);
    const locationData = await getLocationData(newMarker);
    onLocationChange?.(locationData);
    setLoading(false);
  }

  return (
    <div
      className={cn(
        "w-full h-[400px] rounded-lg overflow-hidden relative border-1 border-gray-300",
        className
      )}
    >
      {!fetchingUserLocation && (
        <Map
          initialViewState={{
            longitude: marker.longitude,
            latitude: marker.latitude,
            zoom: 15
          }}
          mapStyle={
            mapStyleURL ||
            "https://api.maptiler.com/maps/streets-v2/style.json?key=a8to16zNmdlTpc9ywU87"
          }
          onClick={handleMapClick}
        >
          <Marker
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
          >
            <FaMapMarkerAlt className="text-red-500" size={20} />
          </Marker>
        </Map>
      )}

      {/*Loading Overlay */}
      {(loading || fetchingUserLocation) && (
        <div
          className={`absolute top-0 left-0 ${!fetchingUserLocation && "bg-black/30"} z-10 w-full h-full flex items-center justify-center `}
        >
          <CgSpinner className="size-10 animate-spin" />
        </div>
      )}
    </div>
  );
}

async function getLocationData(
  coordinates: Coordinates
): Promise<LocationData> {
  let locationData: LocationData;

  try {
    const locRes = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.latitude}&lon=${coordinates.longitude}`,
      {
        timeout: 3000
      }
    );

    locationData = {
      coordinates: coordinates,
      displayName: locRes.data.display_name || "Dirección no encontrada",
      address: locRes.data.address?.road || "",
      city: locRes.data.address?.city || locRes.data.address?.town || "",
      state: locRes.data.address?.state || "",
      zipCode: locRes.data.address?.postcode || "",
      country: locRes.data.address?.country || ""
    };
  } catch (error) {
    locationData = {
      coordinates: coordinates,
      country: "NA",
      displayName: "NA",
      address: "NA",
      city: "NA",
      state: "NA",
      zipCode: "NA"
    };

    console.error("Error fetching location data:", error);
  }

  console.log("Location data:", locationData);

  return locationData;
}
