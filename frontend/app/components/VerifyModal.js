import { useState, useEffect } from "react";
import "/app/globals.css";

const VerifyModal = ({ isVerified, setIsVerified, onClose }) => {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleVerify = () => {
    // Clear previous errors
    setError("");

    // Get OTP from local storage
    const storedOTP = localStorage.getItem("otp");
    console.log(storedOTP);

    if (!storedOTP) {
      setError("No OTP found in local storage");
      return;
    }

    // Compare entered OTP with stored OTP
    if (otp === storedOTP) {
      // OTP verification successful
      setIsVerified(true);
      setVerificationMessage("OTP verification successful!");
      console.log("verification succeeded");
    } else {
      // OTP verification failed
      setIsVerified(false);
      setVerificationMessage("OTP verification failed. Please try again.");
      setError("Incorrect OTP.");
      console.log("verification failed");
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col justify-center items-center text-center">
          <div className="flex-col flex form-group space-y-2 ">
            <label htmlFor="otp">OTP:</label>
            <input
              className="rounded h-[26px] w-[140px] border-solid border-gray-400 pl-2 focus:outline-blue-400"
              type="password"
              id="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-600 mt-4 text-[14px] text-white border-none rounded-lg py-3 px-8 active:opacity-80"
            onClick={handleVerify}
          >
            Verify
          </button>
          {error && <p className="text-red-600">{error}</p>}
          {isVerified && <p className="text-green-600">OTP verified.</p>}
          <button
            className="border-none mt-4 bg-transparent text-blue-700 cursor-pointer active:opacity-60"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyModal;

//   // Render loading state if we're still checking the login status
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const handleVerify = () => {
//     const user = users.find(
//       (user) => user.username === username && user.otp === otp
//     );
//     if (user) {
//       setIsVerified(true);
//       localStorage.setItem("isVerified", "true"); // Store login state in browser storage
//       onClose(); // Close the modal after successful login
//     } else {
//       setError("Invalid OTP");
//     }
//   };

//   //   const handleLogout = () => {
//   //     setIsLoggedIn(false);
//   //     localStorage.removeItem("isLoggedIn"); // Remove login state from browser storage
//   //     setUsername("");
//   //     setPassword("");
//   //     setError("");
//   //     setShowLogoutModal(false); // Close the logout modal
//   //     onClose(); // Close the modal after logout
//   //     router.push("/"); // Redirect to home page after logout
//   //   };
