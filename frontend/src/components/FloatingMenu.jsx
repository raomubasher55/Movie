import React, { useState, useEffect } from "react";
import { FaCog, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnMode, setIsOnMode] = useState(false);
  const [link, setLink] = useState(""); // State for storing the link
  const [linkError, setLinkError] = useState(""); // State for storing link error

  useEffect(() => {
    const fetchModeStatus = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/mode/status");
        if (response?.data?.onMode !== undefined) {
          setIsOnMode(response.data.onMode);
          setLink(response.data.link || ""); // Fetch the saved link if it exists
        }
      } catch (error) {
        console.error("Error fetching mode status:", error);
      }
    };

    fetchModeStatus();
  }, []);

  const handleButtonClick = async () => {
    // If mode is off, we need to ensure the link is entered
    if (!isOnMode && !link.trim()) {
      setLinkError("Please enter a valid link.");
      return;
    } else {
      setLinkError("");
    }

    try {
      const response = await axios.post("http://localhost:4000/api/mode/toggle", {
        onMode: !isOnMode, // Toggle the mode status
        link: isOnMode ? "" : link, // Send the link only if turning mode on
      });

      if (response?.data?.onMode !== undefined) {
        setIsOnMode(response.data.onMode);
        if (!isOnMode) {
          setLink(""); 
        }
      }
    } catch (error) {
      console.error("Error toggling mode:", error);
    }
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value); 
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();

    if (!link.trim()) {
      setLinkError("Please enter a valid link.");
      return;
    } else {
      setLinkError("");
    }

    try {
      const response = await axios.post("http://localhost:4000/api/mode/saveLink", { link });
      if (response?.data?.link) {
        console.log("Link saved successfully:", response.data.link);
      }
    } catch (error) {
      console.error("Error saving link:", error);
    }
  };

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-auto">
      <div
        className={`flex items-center justify-end ${
          isOpen ? "w-[290px]" : "w-14"
        } bg-yellow-400 p-2 rounded-l-lg shadow-lg transition-all duration-300`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full focus:outline-none"
        >
          {isOpen ? <FaArrowRight /> : <FaCog />}
        </button>

        {isOpen && (
          <div className="flex flex-col items-start ml-4">
            <Link
              to={"/admin/page"}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md mb-2 text-sm w-full text-center"
            >
              Pages
            </Link>

            {/* Button to toggle mode */}
            <button
              onClick={handleButtonClick}
              className={`px-4 py-2 rounded-md text-sm w-full transition duration-300 text-white ${
                isOnMode ? "bg-green-500 hover:bg-green-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {isOnMode ? "Mode On" : "Mode Off"}
            </button>

            {/* Link input form when mode is off */}
            {!isOnMode && (
              <form onSubmit={handleLinkSubmit} className="mt-4">
                <input
                  type="text"
                  value={link}
                  onChange={handleLinkChange}
                  placeholder="Enter a link"
                  className="px-4 py-2 text-sm rounded-md w-full mb-2"
                />
              </form>
            )}

            {/* Error message if link is empty */}
            {linkError && (
              <div className="text-red-500 text-sm mt-2">
                {linkError}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingMenu;
