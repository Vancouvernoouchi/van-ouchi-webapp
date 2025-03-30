"use client";

import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { MapNotFound } from "@/components/common/map";

type Coordinates = {
  geoPosition: string;
  className?: string;
};

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

/**
 * GoogleMapコンポーネント
 *
 * @param geoPosition {string}　- 緯度・経度の座標（例: "34.6873,135.5259"）
 * @param className {string}
 */
function GoogleMapMarker({ geoPosition, className }: Coordinates) {
  let lat: number | null = null;
  let lng: number | null = null;
  let error: string | null = null;

  try {
    if (!geoPosition || !geoPosition.includes(",")) {
      throw new Error("ただいま準備中です。");
    }

    [lat, lng] = geoPosition.split(",").map(Number);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error("ただいま準備中です。");
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
    return <MapNotFound message={error} />;
  }

  if (loadError) {
    return <MapNotFound message="マップの読み込みに失敗しました。" />;
  }

  if (!center) {
    return <MapNotFound message="ただいま準備中です。" />;
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

/** @package */
export { GoogleMapMarker };
