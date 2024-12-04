"use client";

import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Coordinates = {
  geoPosition: string;
  className?: string;
};

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function GoogleMapMarker({
  geoPosition,
  className,
}: Coordinates) {
  let lat: number | null = null;
  let lng: number | null = null;
  let error: string | null = null;

  try {
    if (!geoPosition || !geoPosition.includes(",")) {
      throw new Error("現在、マップ表示は準備中です。");
    }

    [lat, lng] = geoPosition.split(",").map(Number);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error("現在、マップ表示は準備中です。");
    }
  } catch (err) {
    error =
      err instanceof Error ? err.message : "予期せぬエラーが発生しました。";
  }

  const center = lat !== null && lng !== null ? { lat, lng } : null;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    id: "google-map-script",
  });

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full text-red-500 bg-gray-300">
        {error}
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex items-center justify-center w-full h-full text-red-500 bg-gray-300">
        マップの読み込みに失敗しました。
      </div>
    );
  }

  if (!center) {
    return (
      <div className="flex items-center justify-center w-full h-full text-red-500 bg-gray-300">
        現在、マップ表示は準備中です。
      </div>
    );
  }

  if (!isLoaded) {
    return <Skeleton className={className} />;
  }

  return (
    <GoogleMap
      mapContainerClassName={cn(
        "google-map-container w-full h-full",
        className
      )}
      center={center}
      zoom={15}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
