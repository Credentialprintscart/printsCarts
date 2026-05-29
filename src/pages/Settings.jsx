'use client';
import React from "react";
import "../styles/settings.css"

const Input = ({ label, type = "text", placeholder }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} placeholder={placeholder} />
  </div>
);

export default function Settings() {
  return (
    <>
         
    <div className="page">
      <div className="card">

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="profile">
            <div className="avatar">👤</div>
            <p>Welcome,</p>
            <h3>IyKote</h3>
          </div>

          <nav>
            {[
              "Dashboard",
              "New Translation",
              "My Projects",
              "My Translators",
              "Billing & Payment",
              "Settings",
            ].map((item) => (
              <button key={item}>{item}</button>
            ))}
          </nav>

          <button className="logout">Log Out</button>
        </aside>

        {/* Main */}
        <main className="content">
          <h1>Your personal profile info</h1>

          <div className="columns">
            {/* Profile */}
            <section>
              <h2>Profile</h2>
              <div className="grid">
                <Input label="First name" placeholder="Name" />
                <Input label="Last name" placeholder="Surname" />
                <Input label="Username" placeholder="Username" />
                <Input label="Your e-mail" type="email" placeholder="mail@example.com" />
                <Input label="Personal phone" placeholder="+380 44 123 45 67" />
                <Input label="Work phone" placeholder="+380 44 123 45 67" />
                <Input label="Country, City" placeholder="Ukraine, Kyiv" />
                <Input label="Organization" placeholder="Organization name" />
              </div>
            </section>

            {/* Password */}
            <section>
              <h2>Password</h2>
              <Input label="Old password" type="password" />
              <Input label="New password" type="password" />
              <Input label="Confirm new password" type="password" />
              <button className="save-btn">Save Info</button>
            </section>
          </div>
        </main>
      </div>
    </div>
    
    </>
  );
}


