import React from "react";

function OnePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center relative">
      {/* Background SVGs */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-1/2 h-auto opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          fill="none"
        >
          <circle cx="250" cy="250" r="250" fill="rgba(255, 255, 255, 0.3)" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-1/3 h-auto opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          fill="none"
        >
          <rect x="0" y="0" width="500" height="500" fill="rgba(255, 255, 255, 0.1)" />
        </svg>
      </div>

      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold mb-4">Coming Soon</h1>
        <p className="text-xl">We are working hard to launch our new website.</p>
      </div>
    </div>
  );
}

export default OnePage;
