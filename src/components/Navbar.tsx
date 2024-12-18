import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import EndClassModal from "./EndClassModal";
import CountdownTimer from "./CountDownTimer";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEndClass = () => {
    setIsTimerRunning(false);
    closeModal();
  };

  return (
    <nav className="bg-white text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 pt-8">
          <div className="flex items-center">
            <span className="relative -top-2 size-16 my-2 py-2 pr-4 border-r border-gray-400">
              <img
                className="object-contain h-full w-full"
                src="https://codingal.s3.amazonaws.com/media/organizations/2021/07/30/Penguin_Big_1h1oAO4.png"
              />
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="/"
                className="px-3 py-2 rounded-md text-lg font-medium text-black"
              >
                Home
              </a>
              <a
                href="/posts"
                className="px-3 py-2 rounded-md text-lg font-medium text-black"
              >
                Posts
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <CountdownTimer isRunning={isTimerRunning} />
            <button
              onClick={openModal}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              End Class
            </button>
          </div>
          <div className="md:hidden flex items-center -mt-4">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <CountdownTimer isRunning={isTimerRunning} />
            <button
              onClick={openModal}
              className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              End Class
            </button>
          </div>
        </div>
      )}
      <EndClassModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onEndClass={handleEndClass}
      />
    </nav>
  );
};

export default Navbar;
