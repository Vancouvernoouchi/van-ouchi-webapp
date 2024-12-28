"use client";

import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import VanMap from "@/public/vancouver_map.png";
import { MESSAGES } from "@/app/_constants/messages";

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
export default function GoogleMapMarker({
  geoPosition,
  className,
}: Coordinates) {
  let lat: number | null = null;
  let lng: number | null = null;
  let error: string | null = null;

  try {
    if (!geoPosition || !geoPosition.includes(",")) {
      throw new Error(MESSAGES.ERROR_PREPAIRING("この物件のマップ"));
    }

    [lat, lng] = geoPosition.split(",").map(Number);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error(MESSAGES.ERROR_PREPAIRING("この物件のマップ"));
    }
  } catch (err) {
    error = err instanceof Error ? err.message : MESSAGES.ERROR_UNEXPECTED;
  }

  const center = lat !== null && lng !== null ? { lat, lng } : null;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    id: "google-map-script",
  });

  if (error) {
    return <MapError message={error} />;
  }

  if (loadError) {
    return <MapError message={MESSAGES.ERROR_LOADING("マップ")} />;
  }

  if (!center) {
    return <MapError message={MESSAGES.ERROR_PREPAIRING("この物件のマップ")} />;
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

/**
 * 地図表示エラーコンポーネント
 *
 * @param message {string}
 * @param className {string}
 */
const MapError = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* 地図画像 */}
      <Image
        src={VanMap}
        alt="バンクーバーの地図"
        objectFit="cover"
        className={cn("w-full h-[400px] object-cover opacity-70", className)}
      />
      {/* エラーメッセージ */}
      <div className="absolute text-center text-white p-4 bg-black/60 rounded-md text-sm sm:text-base">
        <p>{message}</p>
        <p>詳しい住所はスタッフまでお問い合わせください。</p>
      </div>
    </div>
  );
};
