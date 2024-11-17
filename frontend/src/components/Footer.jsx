import React, { useState, useEffect } from "react";
import { IoArrowUpCircle } from "react-icons/io5";

export default function Footer() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">

        {/* Genre Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-white">Explore by Genre</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-gray-400">
            {[
              "Drama",
              "Crime",
              "Action",
              "Comedy",
              "Horror",
              "Thriller",
              "Adventure",
              "Fantasy",
              "Romance",
              "Sci-Fi",
              "Animation",
            ].map((genre) => (
              <li key={genre} className="cursor-pointer hover:text-yellow-500">
                <a href="/">{genre}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links and Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4 mt-8 space-y-4 md:space-y-0">
          {/* Quick Links */}
          <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
            {[
              { label: "About", link: "/about" },
              { label: "Contact", link: "/contact" },
              { label: "Disclaimer", link: "/disclaimer" },
              { label: "Privacy Policy", link: "/privacy" },
              { label: "DMCA", link: "/dmca" },
              { label: "Terms and Conditions", link: "/terms" },
            ].map(({ label, link }) => (
              <li key={label}>
                <a href={link} className="hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500">
              All rights reserved © 2024 Bollyflix
            </p>
          </div>
        </div>

        {/* Designed By */}
        <p className="w-full text-center text-gray-400 text-sm">
          Designed by{" "}
          <a
            href="https://www.facebook.com/zahidghotia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-yellow-400"
          >
            Ghotia Developers
          </a>
        </p>
      </div>

      {/* Back to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[60px] right-4 sm:right-6 text-red-600 hover:text-red-700 focus:outline-none"
        >
          <IoArrowUpCircle size={50} />
        </button>
      )}
    </footer>
  );
}
