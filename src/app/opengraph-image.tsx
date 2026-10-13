import { ImageResponse } from "next/og";

// The preview card shown when the site is shared on social networks and chat apps.
export const alt = "Abdulkhaliq Sediqi — Senior Software Engineer & Team Lead";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tools = ["NestJS", "Laravel", "Node.js", "TypeScript", "PHP", "Python", "Java"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f4f1e8",
          color: "#17150f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#17150f",
              color: "#f4f1e8",
              borderRadius: 18,
              padding: "10px 20px",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            aks
            <div style={{ width: 11, height: 11, marginLeft: 5, marginTop: 14, borderRadius: 11, background: "#55c98f" }} />
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#676357" }}>seddiqi.co</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#1c7350", fontWeight: 600 }}>
            Senior Software Engineer &amp; Team Lead
          </div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            Abdulkhaliq Sediqi
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 32, color: "#676357" }}>
            Software that keeps products running. Web products, APIs, and services.
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tools.map((tool) => (
            <div
              key={tool}
              style={{
                display: "flex",
                border: "2px solid #d9d3c2",
                borderRadius: 999,
                background: "#faf8f1",
                padding: "8px 22px",
                fontSize: 26,
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
