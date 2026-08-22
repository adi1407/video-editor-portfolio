import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#05070c",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#60a5fa",
          }}
        >
          Video editor
        </div>
        <div style={{ marginTop: 24, fontSize: 72, fontWeight: 600 }}>{siteConfig.name}</div>
        <div style={{ marginTop: 16, fontSize: 28, color: "#b8c4d6", maxWidth: 800 }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    size,
  );
}
