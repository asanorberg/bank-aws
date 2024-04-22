"use client";

import Button from "../components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

//------------Logging in--------------------//

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOTP] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send only username and password
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful. Received OTP:", data.oneTimePassword);
        alert(`Login successful! Your OTP is: ${data.oneTimePassword}`);
        //spara otp i local storage!!! skicka med till nästa steg
        // setOTP(data.oneTimePassword); // Store OTP received from the server
        // Store OTP in local storage
        localStorage.setItem("otp", data.oneTimePassword);

        //redirect to account page
        router.push("/account");
      } else {
        const errorData = await response.json();
        console.error("Error logging in:", errorData.message);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <main className="min-h-[600px] max-w-[1200px] flex flex-col items-center justify-center px-36">
      <h1 className="whitespace-nowrap">Enter your user details</h1>
      <div className="mb-10">
        <form onSubmit={handleSubmit} method="post">
          <div>
            <p>Username</p>
            <input
              className="w-[160px] h-[20px] p-2"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <p>Password</p>
            <input
              className="w-[160px] h-[20px] p-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit} type="submit">
            Log in
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Login;
