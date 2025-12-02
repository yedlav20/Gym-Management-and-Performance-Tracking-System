import React, { useState, useMemo } from "react";
import "./App.css";

/* Small helper to get initials */
function initials(name) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* Small date formatter */
function fmtDate(d) {
  if (!d) return "No appointment";
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString();
  } catch {
    return d;
  }
}

export default function App() {
  const [name, setName] = useState("");
  const [appointment, setAppointment] = useState("");
  const [clients, setClients] = useState([
    // small seeded sample to show graphics (you can remove)
    // { id: 1, name: "Priya Sharma", appointment: "2025-12-01" },
    // { id: 2, name: "Arjun Reddy", appointment: "" },
  ]);

  function addClient(e) {
    e.preventDefault();
    const newClient = {
      id: Date.now(),
      name: name.trim() || "Unknown",
      appointment,
    };
    setClients((c) => [newClient, ...c]);
    setName("");
    setAppointment("");
  }

  function deleteClient(id) {
    if (!window.confirm("Delete this client?")) return;
    setClients((c) => c.filter((x) => x.id !== id));
  }

  const upcoming = useMemo(() => {
    return clients
      .filter((c) => c.appointment)
      .map((c) => ({ ...c, ts: new Date(c.appointment).getTime() }))
      .sort((a, b) => a.ts - b.ts)
      .slice(0, 4);
  }, [clients]);

  return (
    <div className="App">
      {/* Animated background doodles */}
      <div className="decor">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="ring r1" />
        <div className="ring r2" />
      </div>

      <header className="hero">
        <svg className="hero-graphic" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0" stopColor="#f8f3ff" />
              <stop offset="1" stopColor="#f0ecff" />
            </linearGradient>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0" stopColor="#b59bff" stopOpacity="0.25"/>
              <stop offset="1" stopColor="#7d4dff" stopOpacity="0.18"/>
            </linearGradient>
            <filter id="noise"><feTurbulence baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
          </defs>
          <path d="M0 120 C200 20 400 220 600 120 C800 20 1000 220 1200 120 L1200 0 L0 0 Z" fill="url(#g1)"/>
          <path d="M0 120 C200 40 400 180 600 120 C800 60 1000 160 1200 120 L1200 200 L0 200 Z" fill="url(#g2)" opacity="0.85"/>
        </svg>

        <div className="hero-text">
          <h1>Receptionist — New Client Registration</h1>
          <p className="lead"></p>
        </div>
      </header>

      <main className="container">
        <section className="left">
          <div className="card form-card">
            <div className="form-header">
              <h2>Add New Client</h2>
              <div className="pill">Reception •</div>
            </div>

            <form className="client-form" onSubmit={addClient} noValidate>
              <label className="field">
                <span className="field-icon" aria-hidden>
                  {/* user icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 12a5 5 0 100-10 5 5 0 000 10z" stroke="#7d4dff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 21c1.7-4.3 6.5-6 9-6s7.3 1.7 9 6" stroke="#7d4dff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Client name"
                  required
                />
              </label>

              <label className="field">
                <span className="field-icon" aria-hidden>
                  {/* calendar icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="#7d4dff" strokeWidth="1.6"/><path d="M16 3v4M8 3v4M3 11h18" stroke="#7d4dff" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </span>
                <input
                  type="date"
                  value={appointment}
                  onChange={(e) => setAppointment(e.target.value)}
                />
              </label>

              <div className="actions">
                <button className="btn add" type="submit">Add Client</button>
                <button
                  type="button"
                  className="btn clear"
                  onClick={() => { setName(""); setAppointment(""); }}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          <div className="card list-card">
            <h3 className="list-title">Clients List <span className="muted">({clients.length})</span></h3>

            {clients.length === 0 ? (
              <div className="empty">No clients yet — add someone to get started.</div>
            ) : (
              <ul className="client-list">
                {clients.map((c) => (
                  <li key={c.id} className="client-row">
                    <div className="avatar" aria-hidden>{initials(c.name)}</div>
                    <div className="cinfo">
                      <div className="cname">{c.name}</div>
                      <div className="cmeta">{fmtDate(c.appointment)}</div>
                    </div>
                    <div className="row-actions">
                      <button className="tiny" onClick={() => alert("Mock edit - not wired")}>Edit</button>
                      <button className="tiny danger" onClick={() => deleteClient(c.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <aside className="right">
          <div className="card stats-card">
            <h4>Overview</h4>
            <div className="stats-grid">
              <div className="stat">
                <div className="sval">{clients.length}</div>
                <div className="slabel">Total clients</div>
              </div>
              <div className="stat">
                <div className="sval">{upcoming[0] ? fmtDate(upcoming[0].appointment) : "—"}</div>
                <div className="slabel">Next appointment</div>
              </div>
            </div>

            <div className="upcoming">
              <h5>Upcoming</h5>
              {upcoming.length === 0 ? (
                <div className="empty small">No upcoming appointments</div>
              ) : (
                upcoming.map((u) => (
                  <div key={u.id} className="up-row">
                    <div className="dot" />
                    <div className="up-info">
                      <div className="up-name">{u.name}</div>
                      <div className="up-meta">{fmtDate(u.appointment)}</div>
                    </div>
                    <button className="tiny">Remind</button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card promo-card">
            <h4>Pro tip</h4>
            <p className="muted">Schedule the appointment ASAP to better your HEALTH.</p>
            <div className="promo-actions">
              <button className="btn small">Learn more</button>
              <button className="btn small ghost">Setup</button>
            </div>
          </div>
        </aside>
      </main>

      <footer className="footer"> *_*</footer>
    </div>
  );
}
