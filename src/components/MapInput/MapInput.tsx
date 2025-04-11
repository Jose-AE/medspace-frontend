"use client";

import Map, { MapLayerMouseEvent, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Props {
  //If true, the map will default to the user's current location.
  defaultToUserLocation?: boolean;
  //The initial coordinates to display on the map if `defaultToUserLocation` is not set or user denied location permisions.
  defaultCoordinates?: Coordinates;
  //Callback function triggered when the location changes, providing the new coordinates.
  onLocationChange?: (coordinates: Coordinates) => void;
  //URL for the custom map style to be applied to the map.
  mapStyleURL?: string;
  //Additional CSS class names to style the component.
  className?: ClassValue;
}

const DEFAULT_COORDINATES = { longitude: -99.132390928256, latitude: 19.43121854346279 };

function MapInput({
  defaultCoordinates = DEFAULT_COORDINATES,
  onLocationChange,
  mapStyleURL,
  className,
  defaultToUserLocation = true,
}: Props) {
  const [marker, setMarker] = useState<Coordinates>(defaultCoordinates);
  const [doneFethcingUserLocation, setDoneFethcingUserLocation] = useState(false);

  useEffect(() => {
    if (!defaultToUserLocation) {
      setDoneFethcingUserLocation(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarker({ latitude: latitude, longitude });
        setDoneFethcingUserLocation(true);
      },
      () => {
        setDoneFethcingUserLocation(true);
      }
    );
  }, [defaultToUserLocation]);

  const handleMapClick = (event: MapLayerMouseEvent) => {
    const { lng, lat } = event.lngLat;
    const newMarker = { longitude: lng, latitude: lat };
    setMarker(newMarker);
    onLocationChange?.(newMarker);
  };

  return (
    <div className={cn("w-full h-[400px] rounded-lg overflow-hidden", className)}>
      {doneFethcingUserLocation && (
        <Map
          initialViewState={{
            longitude: marker.longitude,
            latitude: marker.latitude,
            zoom: 17,
          }}
          mapStyle={mapStyleURL || "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"}
          onClick={handleMapClick}
        >
          <Marker longitude={marker.longitude} latitude={marker.latitude} anchor="bottom">
            <FaMapMarkerAlt className="text-red-500" size={20} />
          </Marker>
        </Map>
      )}
    </div>
  );
}

export default MapInput;
