import React from "react";
import type { Caption } from "../types/video";

export const CaptionOverlay = ({
  captions,
  currentFrame,
}: any) => {
  const time = currentFrame / 30;
  const tolerance = 1 / 30; 

  const active = captions.find(
    (c: Caption) =>
      time >= c.start - tolerance && time <= c.end + tolerance
  );

  if (!active) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: 0,
        right: 0,
        width: "100%",
        textAlign: "center",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        color: "white",
        fontSize: 48,
        zIndex: 999,
        fontWeight: "bold",
      }}
    >
      {active.text}
    </div>
  );
};