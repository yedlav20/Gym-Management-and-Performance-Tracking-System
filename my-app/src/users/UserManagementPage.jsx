// my-app/src/users/UserManagementPage.jsx
import React, { useState } from "react";
import "./UserManagement.css";

export default function UserManagementPage() {
  const initialUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Coach" },
    { id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "Member" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ name: "", email: "", role: "Member" });
  const [errors, setErrors] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.role.trim()) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setForm({ name: "", email: "", role: "Member" });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
    };

    setUsers((prev) => [...prev, newUser]);
    handleCancel();
  };

  const handleDelete = (id) => {
    const user = users.find((u) => u.id === id);
    const ok = window.confirm(
      `Are you sure you want to delete "${user?.name || "this user"}"?`
    );
    if (!ok) return;

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="um-page">
      <header className="um-header">
        <div>
          <h1>User Management</h1>
          <p className="um-subtitle">
            View, add, and remove users. Simple and readable layout.
          </p>
        </div>
        <button className="um-button um-button-primary" onClick={handleAddClick}>
          + Add User
        </button>
      </header>

      <section className="um-content">
        <div className="um-card">
          <div className="um-card-header">
            <h2>Registered Users</h2>
            <span className="um-chip">{users.length} users</span>
          </div>

          {users.length === 0 ? (
            <p className="um-empty">No users found.</p>
          ) : (
            <div className="um-table-wrapper">
              <table className="um-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="um-actions-col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td className="um-actions-col">
                        <button
                          className="um-button um-button-danger um-button-small"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isAdding && (
          <div className="um-card um-card-form">
            <div className="um-card-header">
              <h2>Add New User</h2>
            </div>

            <form onSubmit={handleSubmit} className="um-form">
              <div className="um-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
                {errors.name && <p className="um-error">{errors.name}</p>}
              </div>

              <div className="um-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                />
                {errors.email && <p className="um-error">{errors.email}</p>}
              </div>

              <div className="um-field">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="Coach">Coach</option>
                  <option value="Member">Member</option>
                </select>
                {errors.role && <p className="um-error">{errors.role}</p>}
              </div>

              <div className="um-form-actions">
                <button
                  type="button"
                  className="um-button um-button-ghost"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="um-button um-button-primary">
                  Save User
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

