import { useState } from "react";
import PbiA from "./features/pbiA/pbiA";
import UserManagementPage from "./users/UserManagementPage"; // 👈 change this

function App() {
  const [page, setPage] = useState("pbiA");

  return (
    <div>
      <nav style={{ padding: "10px", display: "flex", gap: "10px" }}>
        <button onClick={() => setPage("pbiA")}>PBI A</button>
        <button onClick={() => setPage("users")}>User Management</button>
      </nav>

      {page === "pbiA" && <PbiA />}
      {page === "users" && <UserManagementPage />}
    </div>
  );
}

export default App;
