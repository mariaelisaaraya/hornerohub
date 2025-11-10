import { useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("¡HOLA MUNDO DESDE STELLAR!");
  const [projects] = useState([
    { name: "Proyecto Falso 1", votes: 100 },
    { name: "Proyecto Falso 2", votes: 50 },
    { name: "Proyecto Falso 3", votes: 10 },
  ]);

  return (
    <div
      style={{
        fontFamily: "system-ui",
        background: "#f0f8ff",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", color: "#1e40af" }}>Hornero Hub</h1>
        <p style={{ fontSize: "1.5rem", color: "#374151" }}>¡Frontend vivo!</p>

        <div
          style={{
            background: "white",
            padding: 30,
            borderRadius: 20,
            margin: "40px 0",
            boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ color: "#1e40af" }}>Top Proyectos (datos falsos)</h2>
          <ol style={{ marginTop: 20, fontSize: "1.4rem", textAlign: "left" }}>
            {projects.map((p, i) => (
              <li
                key={i}
                style={{
                  padding: 15,
                  margin: "10px 0",
                  background: "#f9f9f9",
                  borderRadius: 12,
                }}
              >
                <strong>{p.name}</strong> — {p.votes} voto
                {p.votes !== 1 ? "s" : ""}
              </li>
            ))}
          </ol>
        </div>

        <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#10b981" }}>
          {msg}
        </p>

        <button
          onClick={() => setMsg("¡Click funcionó!")}
          style={{
            padding: "16px 32px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: 12,
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          Probar Click
        </button>
      </div>
    </div>
  );
}
