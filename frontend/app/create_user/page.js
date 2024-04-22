"use client";

import Button from "../components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

//------------Create new user--------------------//

function Users() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert(
          "User created successfully! You will now be redirected for log in"
        );
        console.log(
          "Submitting form with username:",
          username,
          "and password:",
          password
        );
        router.push("/login");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <main className="min-h-[600px] max-w-[1200px] flex flex-col items-center justify-center px-36">
      <h1 className="md:whitespace-nowrap">
        Choose your username and password
      </h1>
      <div className="mb-10">
        <form onSubmit={handleSubmit} method="post">
          <div>
            <p>Username</p>
            <input
              className="w-[160px] h-[20px] p-2"
              type="text"
              placeholder="New username"
              name={username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <p>Password</p>
            <input
              className="w-[160px] h-[20px] p-2"
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit} type="submit">
            Create user
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Users;
