import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 3,
        background: "#1a2744",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial Black, Arial, sans-serif",
        fontWeight: 900,
        lineHeight: 1,
        gap: 0,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 900,
          color: "white",
          letterSpacing: "-0.5px",
          lineHeight: 1,
          marginBottom: 1,
        }}
      >
        fan
      </span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 900,
          color: "#f5c518",
          letterSpacing: "-0.5px",
          lineHeight: 1,
        }}
      >
        SALE
      </span>
    </div>,
    { ...size },
  );
}
