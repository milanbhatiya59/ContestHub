import { useState } from "react";
import "./App.css";
import ContestTab from "./components/contests";
import VideoTab from "./components/videos";
import Navbar from "./components/Navbar";

function App() {
  const [activeTab, setActiveTab] = useState("contests");

  return (
    <div className="bg-gray-300 dark:bg-gray-700 min-h-screen transition-colors duration-300">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* Tab Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-5 py-2 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 ${
              activeTab === "contests"
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("contests")}
          >
            Contests
          </button>
          <button
            className={`px-5 py-2 rounded-lg text-lg font-semibold shadow-md transition-all duration-300 ${
              activeTab === "videos"
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Tutorial Videos
          </button>
        </div>

        {/* Content */}
        <div>{activeTab === "contests" ? <ContestTab /> : <VideoTab />}</div>
      </div>
    </div>
  );
}

export default App;
